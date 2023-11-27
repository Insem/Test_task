import { REPLICA_ID } from "../../consts";
import { rabbit_conn } from "../../rabbit/connect";
import { sleep } from "../../sleep";

const say_exchange = "amq.direct";
const ask_exchange = "amq.fanout";

const ask_task_key = "ask_task_name";
const ask_task_queue = `ask_task_name__${REPLICA_ID}`;

const say_task_key = "say_task_name";
const say_task_queue = "say_task_name";

type TaskNameType = {
  id: number;
  task_names: string[];
};

export async function AskTaskNames(): Promise<string[]> {
  const tasks: string[] = [];
  const ch = await rabbit_conn.createChannel();
  ch.publish(
    ask_exchange,
    ask_task_key,
    Buffer.from(JSON.stringify({ id: REPLICA_ID }))
  );
  await ch.assertQueue(say_task_queue, {
    messageTtl: 30000,
  });
  await ch.bindQueue(say_task_queue, say_exchange, say_task_key);

  const consume = await ch.consume(say_task_queue, (msg) => {
    console.log("--Ask consime");
    if (!msg) {
      console.log("Error: message is none");
      return;
    }

    const parsed_msg: TaskNameType = JSON.parse(msg.content.toString());
    console.log("--Tasks raw", parsed_msg);
    if (!parsed_msg.id || !parsed_msg.task_names) {
      console.log("Error: say broken message", parsed_msg);
      return;
    }

    if (parsed_msg.id != REPLICA_ID) {
      //ignore message
      return;
    }

    tasks.push(...parsed_msg.task_names);
    ch.ack(msg);
  });

  await sleep(5000);
  await ch.close();
  return tasks;
}

export async function SayTaskNames(tasks_cb: () => string[]) {
  const ch = await rabbit_conn.createChannel();

  await ch.assertQueue(ask_task_queue);
  await ch.bindQueue(ask_task_queue, ask_exchange, ask_task_key);
  ch.consume(ask_task_queue, async (msg) => {
    console.log("--Say consume");
    if (!msg) {
      console.log("Error: message is none");
      return;
    }

    const parsed_msg = JSON.parse(msg.content.toString());

    if (!parsed_msg.id) {
      console.log("Error: ask broken message");
      return;
    }
    const task_names = tasks_cb();
    console.log("--Task names answer", task_names);
    const tasks: TaskNameType = {
      id: parsed_msg.id,
      task_names,
    };
    console.log("--Send", tasks);
    ch.publish(say_exchange, say_task_key, Buffer.from(JSON.stringify(tasks)));
    ch.ack(msg);
  });
}

process.once("SIGINT", async () => {
  (await rabbit_conn.createChannel()).deleteQueue(ask_task_queue);
  (await rabbit_conn.createChannel()).deleteQueue(say_task_queue);
});
