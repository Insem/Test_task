import { router_status, router_balance } from "./BalanceWorkers/router";
import { TaskManagerClass } from "./cron_task/TaskManagerClass";
import { sleep } from "./sleep";
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(1, 6);
async function start() {
  const manager = new TaskManagerClass();
  await sleep(randomIntFromInterval(100, 20000));
  await manager.init();
  await router_balance();
  await router_status(manager);
}

start().then();
