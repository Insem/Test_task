import { RPC_QUEUE_TASKS } from "../consts";
import { rabbit_conn } from "../rabbit/connect";
import { sleep } from "../sleep";
import { Operation, TBalance } from "../types";

export async function get_tasks(operation: Operation): Promise<unknown> {
  const correlationId = Date.now().toString();
  return new Promise(async (resolve, reject) => {
    const result: unknown[] = [];
    const ch = await rabbit_conn.createChannel();

    await ch.assertQueue(RPC_QUEUE_TASKS, {
      exclusive: true,
    });
    ch.bindQueue(RPC_QUEUE_TASKS, "amq.direct", "answer_tasks");
    ch.consume(
      RPC_QUEUE_TASKS,
      function (msg) {
        if (!msg) {
          console.log("Error: message is none");
          return;
        }
        console.log(" [.] Got %s", msg.content.toString());

        result.push(JSON.parse(msg.content.toString()));
      },
      {
        noAck: true,
      }
    );

    ch.publish(
      "amq.direct",
      "get_tasks",
      Buffer.from(JSON.stringify({ operation }))
    );
    await sleep(1000);

    ch.deleteQueue(RPC_QUEUE_TASKS);
    resolve(result);
  });
}
