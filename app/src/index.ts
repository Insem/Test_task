import { TaskManagerClass } from "./cron_task/TaskManagerClass";

async function start() {
  const manager = new TaskManagerClass();
  await manager.init();
}

start().then();
