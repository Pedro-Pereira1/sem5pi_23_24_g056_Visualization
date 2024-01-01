import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import ITaskDTO from "../../domain/task/TaskDTO";
import { AcceptDenyTaskDTO } from "../../domain/task/AcceptDenyTaskDto";

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

  acceptTask(taskID: string) {
    const dto: AcceptDenyTaskDTO = { 
      taskID: taskID,
      accept: true
    }
    this.taskService.acceptTask(dto).subscribe(
      (data: boolean) => {
        if (data) {
          window.alert("Task accepted successfully");
          this.ngOnInit();
        } else {
          window.alert("Task could not be accepted");
        }
      }
    )
  }

  denyTask(taskID: string) {
    const dto: AcceptDenyTaskDTO = { 
      taskID: taskID,
      accept: false
    }
    this.taskService.denyTask(dto).subscribe(
      (data: boolean) => {
        if (data) {
          window.alert("Task denied successfully");
          this.ngOnInit();
        } else {
          window.alert("Task could not be denied");
        }
      }
    )
  }
}
