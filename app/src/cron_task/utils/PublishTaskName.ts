import { rabbit_conn } from "../../rabbit/connect";

export async function AskTaskNames() {
  const queue = `TaskName ${Date.now()}`;
  const exchange = "amq.fanout";
  const key = "task_name";

  const ch = await rabbit_conn.createChannel();
  await ch.assertQueue(queue);
  await ch.bindQueue(queue, exchange, key);
  ch.publish(
    exchange,
    key,
    Buffer.from('say_your_task_name')
  );
  ch.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
      ch.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
  setInterval(
    async () =>
      (await rabbit_conn.createChannel())
    2000
  );
}
