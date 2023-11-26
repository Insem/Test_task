import { TaskOne } from "./tasks/Task_1";
type CronFN = (cronStr: string, task_name: string) => Promise<void>;
export class TaskClass {
  constructor(TaskName: string, cronStr: string, task_fn: CronFN) {
    this.task_fn = task_fn;
    this.name = TaskName;
    this.cron_str = cronStr;
  }
  name: string;
  cron_str: string;
  task_fn: CronFN;
  started_at: number | undefined;
  async start() {
    this.started_at = Date.now();
    await this.task_fn(this.cron_str, this.name);
  }
}
