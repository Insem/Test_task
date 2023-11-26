import { CronJob } from "cron";
import { sleep } from "../../sleep";
import { task_history } from "../utils/TaskHistory";

export async function TaskOne(
  cron_str: string,
  task_name: string
): Promise<void> {
  let count = 0;
  let update = 1;
  CronJob.from({
    cronTime: cron_str,
    onTick: async function () {
      await sleep(2000);
      let log = `${task_name} ${(count += update)}`;
      await task_history(log, task_name);
    },
    start: true,
  });
}
