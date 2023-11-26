import { TaskClass } from "./TaskClass";
import { TaskOne } from "./tasks/Task_1";
import { TaskThree } from "./tasks/Task_3";
import { TaskTwo } from "./tasks/Task_2";
import { AskTaskNames, SayTaskNames } from "./utils/PublishTaskName";
import { TaskFour } from "./tasks/Task_4";
import { TaskFive } from "./tasks/Task_5";
import { TaskSix } from "./tasks/Task_6";
import { TaskSeven } from "./tasks/Task_7";
import { REPLICA_COUNT, REPLICA_ID } from "../consts";

export class TaskManagerClass {
  constructor() {
    this.task_list = [];
    this.load_list = [];

    this.task_list.push(new TaskClass("TaskOne", "0/5 * * * * *", TaskOne));
    this.task_list.push(new TaskClass("TaskTwo", "0/5 * * * * *", TaskTwo));
    this.task_list.push(new TaskClass("TaskThree", "0/5 * * * * *", TaskThree));
    this.task_list.push(new TaskClass("TaskFour", "0/5 * * * * *", TaskFour));
    this.task_list.push(new TaskClass("TaskFive", "0/5 * * * * *", TaskFive));
    this.task_list.push(new TaskClass("TaskSix", "0/5 * * * * *", TaskSix));
    this.task_list.push(new TaskClass("TaskSeven", "0/5 * * * * *", TaskSeven));
  }
  task_list: TaskClass[];
  load_list: TaskClass[];
  async init() {
    const tasks = await AskTaskNames();
    await SayTaskNames(this.get_tasks_names.bind(this));
    console.log("Start", tasks);
    const load_count = Math.ceil(this.task_list.length / REPLICA_COUNT);
    const load_list = this.task_list
      .filter((el) => tasks.indexOf(el.name) == -1)
      .splice(0, load_count);
    this.load_list.push(...load_list);

    console.log("--Task list", this.load_list);

    for (const task of this.load_list) {
      await task.start();
    }
  }

  get_status() {
    return {
      task_list: this.load_list.map((el) => ({
        name: el.name,
        time_elapsed: Date.now() - (el.started_at ?? 0),
      })),
      replica_id: REPLICA_ID,
    };
  }
  get_tasks_names() {
    return this.load_list.map((e) => e.name);
  }
}
