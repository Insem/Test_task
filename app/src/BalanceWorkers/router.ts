import { RPC_QUEUE_BALANCE } from "../consts";
import { TaskManagerClass } from "../cron_task/TaskManagerClass";
import { psql_add_balance } from "../postgres/AddBalance";
import { psql_subtract_balance } from "../postgres/SubtractBalance";
import { rabbit_conn } from "../rabbit/connect";
import { TBalanceEvent } from "../types";

export async function router_balance(): Promise<void> {
  const ch = await rabbit_conn.createChannel();

  await ch.assertQueue(RPC_QUEUE_BALANCE, {
    durable: false,
  });

  ch.consume(RPC_QUEUE_BALANCE, async function reply(msg) {
    if (!msg) {
      console.log("Error: message is none");
      return;
    }
    const event = JSON.parse(msg.content.toString()) as TBalanceEvent;
    switch (event.operation) {
      case "subtract": {
        const result = await psql_subtract_balance(event.balance);
        ch.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(result)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        break;
      }
      case "add": {
        const result = await psql_add_balance(event.balance);
        ch.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(result)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        break;
      }
      default: {
        ch.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(
            JSON.stringify({ isErr: true, reply: "Wrong operation" })
          ),
          {
            correlationId: msg.properties.correlationId,
          }
        );
      }
    }

    ch.ack(msg);
  });
}

export async function router_status(manager: TaskManagerClass): Promise<void> {
  const ch = await rabbit_conn.createChannel();

  const { queue } = await ch.assertQueue("", {
    durable: false,
  });

  ch.bindQueue(queue, "amq.direct", "get_tasks");
  ch.consume(queue, async function reply(msg) {
    if (!msg) {
      console.log("Error: message is none");
      return;
    }
    const event = JSON.parse(msg.content.toString()) as TBalanceEvent;
    switch (event.operation) {
      case "status": {
        ch.publish(
          "amq.direct",
          "answer_tasks",
          Buffer.from(JSON.stringify(manager.get_status()))
        );

        break;
      }
      default: {
        ch.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(
            JSON.stringify({ isErr: true, reply: "Wrong operation" })
          ),
          {
            correlationId: msg.properties.correlationId,
          }
        );
      }
    }

    ch.ack(msg);
  });
}
