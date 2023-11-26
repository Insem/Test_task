import { TaskClass } from "./TaskClass";
import { TaskOne } from "./tasks/TaskOne";
import { TaskThree } from "./tasks/TaskThree";
import { TaskTwo } from "./tasks/TaskTwo";

export class TaskManagerClass {
  constructor() {
    this.tasks = [];
    this.tasks.push(new TaskClass("TaskOne", "0/5 * * * * *", TaskOne));
    this.tasks.push(new TaskClass("TaskTwo", "0/5 * * * * *", TaskTwo));
    this.tasks.push(new TaskClass("TaskThree", "0/5 * * * * *", TaskThree));
  }
  tasks: TaskClass[];
  async init() {
    for (let task of this.tasks) {
    }
  }
}
