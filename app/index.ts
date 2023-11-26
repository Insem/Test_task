import { TaskClass } from "./cron_task/TaskClass";
import { TaskOne } from "./cron_task/tasks/TaskOne";

async function start() {
  let task_one = new TaskClass("TaskOne", "0/5 * * * * *", TaskOne);
  await task_one.start();
}

start().then();
