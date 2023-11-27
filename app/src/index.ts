import { router_status, router_balance } from "./BalanceWorkers/router";
import { TaskManagerClass } from "./cron_task/TaskManagerClass";
import { sleep } from "./sleep";

async function start() {
  const manager = new TaskManagerClass();
  await manager.init();
  await router_balance();
  await router_status(manager);
}
//@ts-ignore
await start();
