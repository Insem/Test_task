import { TaskClass } from "./TaskClass";
import { TaskOne } from "./tasks/TaskOne";
import { TaskThree } from "./tasks/TaskThree";
import { TaskTwo } from "./tasks/TaskTwo";
import { AskTaskNames, SayTaskNames } from "./utils/PublishTaskName";

export class TaskManagerClass {
  constructor() {
    this.tasks = [];
    this.tasks.push(new TaskClass("TaskOne", "0/5 * * * * *", TaskOne));
    this.tasks.push(new TaskClass("TaskTwo", "0/5 * * * * *", TaskTwo));
    this.tasks.push(new TaskClass("TaskThree", "0/5 * * * * *", TaskThree));

    this.test_tasks = ["TaskOne", "TaskTwo"];
  }
  tasks: TaskClass[];
  test_tasks: string[];
  async init() {
    const tasks = await AskTaskNames();
    await SayTaskNames(this.get_tasks_names.bind(this));
    console.log("Start", tasks);
  }
  get_tasks_names() {
    return this.test_tasks;
  }
}
