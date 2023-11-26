import { CronJob } from "cron";
import { sleep } from "../../sleep";

export async function TaskTwo(
  cron_str: string,
  task_name: string
): Promise<void> {
  let count = 0;
  let update = 2;
  CronJob.from({
    cronTime: cron_str,
    onTick: async function () {
      await sleep(2000);
      let log = `${task_name} ${(count += update)}`;
      console.log(log);
    },
    start: true,
  });
}
