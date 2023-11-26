import { TaskClass } from "./cron_task/TaskClass";
import { TaskOne } from "./cron_task/tasks/TaskOne";
import { PublishTaskName } from "./cron_task/utils/PublishTaskName";

async function start() {
  // let task_one = new TaskClass("TaskOne", "0/5 * * * * *", TaskOne);
  // await task_one.start();
  await PublishTaskName();
}

start().then();
