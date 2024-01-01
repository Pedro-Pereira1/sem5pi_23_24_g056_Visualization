import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import ITaskDTO from "../../domain/task/TaskDTO";

@Component({
  selector: 'app-task-list-not-approved',
  templateUrl: './task-list-not-approved.component.html',
  styleUrl: './task-list-not-approved.component.css'
})
export class TaskListNotApprovedComponent {

  tasks: ITaskDTO[] = [];

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.taskService.listAllPending()
      .subscribe(
        (data: ITaskDTO[]) => {
          this.tasks = data;
        }
      )
  }

}
