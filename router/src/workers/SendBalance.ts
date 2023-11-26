import { RPC_QUEUE_BALANCE } from "../consts";
import { rabbit_conn } from "../rabbit/connect";
import { Operation, TBalance } from "../types";
//@ts-ignore
const ch = await rabbit_conn.createChannel();
export async function send_balance(
  balance: TBalance,
  operation: Operation
): Promise<string> {
  const correlationId = Date.now().toString();
  return new Promise(async (resolve, reject) => {
    const { queue } = await ch.assertQueue("", {
      exclusive: true,
    });

    ch.consume(
      queue,
      function (msg) {
        if (!msg) {
          console.log("Error: message is none");
          return;
        }
        if (msg.properties.correlationId == correlationId) {
          console.log(" [.] Got %s", msg.content.toString());
          resolve(msg.content.toString());
        }
      },
      {
        noAck: true,
      }
    );

    ch.sendToQueue(
      RPC_QUEUE_BALANCE,
      Buffer.from(JSON.stringify({ operation, balance })),
      {
        correlationId: correlationId,
        replyTo: queue,
      }
    );

    //ch.deleteQueue(queue);
  });
}
