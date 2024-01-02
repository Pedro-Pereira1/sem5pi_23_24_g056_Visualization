import { Component } from '@angular/core';
import { TaskService } from "../../services/task.service";
import ITaskDTO from "../../domain/task/TaskDTO";
import { AcceptDenyTaskDTO } from "../../domain/task/AcceptDenyTaskDto";
import { ShortestPathService } from 'src/app/services/shortest-path.service';
import ShortestPath from 'src/app/domain/path/ShortestPath';

@Component({
  selector: 'app-task-list-not-approved',
  templateUrl: './task-list-not-approved.component.html',
  styleUrl: './task-list-not-approved.component.css'
})
export class TaskListNotApprovedComponent {

  tasks: ITaskDTO[] = [];

  constructor(
    private taskService: TaskService,
    private shortestPath: ShortestPathService
  ) { }

  ngOnInit() {
    this.taskService.listAllPending()
      .subscribe(
        (data: ITaskDTO[]) => {
          this.tasks = data;
        }
      )
  }

  processPath(path: ShortestPath) {
    let pathToShow = ""
    var index = 0;
    for (let i = 0; i < path.cells.length; i++) {
      if (path.floorIds.length != 0) {
        if (path.floorIds.at(index) !== undefined) {
          pathToShow += "FLOOR " + path.floorIds.at(index)! + " : ";
        }
      }
      pathToShow += "[";
      for (let j = 0; j < path.cells.at(i)!.length; j++) {
        pathToShow += "[" + path.cells[i][j]!.toString() + "]";
        if (j !== path.cells.at(i)!.length - 1) {
          pathToShow += ", ";
        }
      }
      pathToShow += "]";
      if (path.accPoints.length != 0) {
        if (path.accPoints.at(index) !== undefined) {
          pathToShow += "  --> [" + path.accPoints.at(index)! + "] --> ";
          index++;
        }
      }
    }
    return pathToShow;
  }

  convertPathStringToArray(path: ShortestPath): number[][][] {
    let processedPath: string = this.processPath(path);
    processedPath = processedPath.slice(1, -1);
    let coords: string[] = processedPath.split("], [");
    coords.forEach((coord, index) => {
      coords[index] = coord.replace("[", "").replace("]", "");
    })

    let pathArray: number[][][] = [];

    for (const coord of coords) {
      let coordArray: number[][] = [];
      let coordArrayString: string[] = coord.split(", ");
      for (const coordString of coordArrayString) {
        let coordStringArray: string[] = coordString.split(",");
        let coordArrayNumber: number[] = coordStringArray.map((coordString) => {
          return Number(coordString);
        })
        coordArray.push(coordArrayNumber);
      }
      pathArray.push(coordArray);
    }

    return pathArray;
  }

  acceptTask(taskID: string) {
    const task = this.tasks.find(t => t.id === taskID);
    let taskPath: number[][][] = []

    this.shortestPath.getShortestPath(task?.taskPickupRoom!, task?.taskDeliveryRoom!).subscribe(
      (path: ShortestPath) => {
        taskPath = this.convertPathStringToArray(path);
        const dto: AcceptDenyTaskDTO = {
          taskID: task?.id!,
          accept: true,
          path: taskPath
        }

        console.log(dto);

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
