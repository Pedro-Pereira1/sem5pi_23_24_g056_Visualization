import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ShortestPath from 'src/app/domain/path/ShortestPath';
import ITaskDTO from 'src/app/domain/task/TaskDTO';
import { ShortestPathService } from 'src/app/services/shortest-path.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list-approved',
  templateUrl: './task-list-approved.component.html',
  styleUrl: './task-list-approved.component.css'
})
export class TaskListApprovedComponent {

  constructor(
    private taskService: TaskService,
    private shortestPath: ShortestPathService,
    private router: Router
  ) { }

  tasks: ITaskDTO[] = [];

  ngOnInit() {
    this.taskService.listAccepted()
      .subscribe(
        (data: ITaskDTO[]) => {
          this.tasks = data;
        }
      )
  }

  private processPath(path: ShortestPath) {
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

  private convertPathStringToArray(path: ShortestPath): number[][][] {
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

  previewPath(pathId: string) {
    const task = this.tasks.find(task => task.id === pathId)
    this.shortestPath.getShortestPath(task?.taskPickupRoom!, task?.taskDeliveryRoom!).subscribe(
      (data: ShortestPath) => {
        const pathArray = this.convertPathStringToArray(data);
        const floorIds = data.floorIds;
        console.log("hello")

        localStorage.removeItem('building')
        localStorage.removeItem('pathArray');
        localStorage.removeItem('floorIds');
        localStorage.removeItem('autoPilot');

        localStorage.setItem('building', task?.taskBuilding!);
        localStorage.setItem('pathArray', JSON.stringify(pathArray));
        localStorage.setItem('floorIds', JSON.stringify(floorIds));
        localStorage.setItem('autoPilot', "true")

        this.router.navigate(['/view3d']);
      }
    )
  }
}
