import { core } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ShortestPath from 'src/app/domain/path/ShortestPath';
import ITaskDTO from 'src/app/domain/task/TaskDTO';
import { RoomService } from 'src/app/services/room.service';
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
      for (let j = 0; j < path.cells.at(i)!.length; j++) {
        pathToShow += "[" + path.cells[i][j]!.toString() + "]";
        if (j !== path.cells.at(i)!.length - 1) {
          pathToShow += ", ";
        }
      }
      pathToShow += ";";
    }
    return pathToShow;
  }

  private convertPathStringToArray(path: ShortestPath): number[][][] {
    let processedPath: string = this.processPath(path);
    processedPath = processedPath.slice(0, -2);
    let paths: string[] = []

    if (processedPath.includes('];[')) {
      paths = processedPath.split('];');
    } else {
      paths.push(processedPath);
    }

    let coordString: string[][] = [];
    for (const coords of paths) {
      let pathString = coords.slice(1);
      coordString.push(pathString.split('], ['))
    }

    let pathArray: number[][][] = [];
    let i = 0
    for (const coord of coordString) {
      pathArray[i] = [];
      for (const aux of coord) {
        const numbers: string[] = aux.split(',');
        const x = parseInt(numbers[0]);
        const y = parseInt(numbers[1]);
        pathArray[i].push([x, y])
      }
      i++
    }
    return pathArray
  }

  previewPath(pathId: string) {
    localStorage.removeItem('floorOfBuilding')
    localStorage.removeItem('initialFloor')
    localStorage.removeItem('pathArray');
    localStorage.removeItem('floorIds');
    localStorage.removeItem('initialFloor');
    localStorage.removeItem('autoPilot');
    localStorage.removeItem('initialRoom')
    localStorage.removeItem('finalRoom')

    const task: ITaskDTO = this.tasks.find(task => task.id === pathId)!

    this.shortestPath.getShortestPath(task?.taskPickupRoom!, task?.taskDeliveryRoom!).subscribe(
      (data: ShortestPath) => {
        const pathArray = this.convertPathStringToArray(data);
        const floorIds = data.floorIds;

        if (floorIds.length > 0) {
          localStorage.setItem('floorIds', JSON.stringify(floorIds));
          localStorage.setItem('floorOfBuilding', floorIds[0].toString());
        }

        localStorage.setItem('initialRoom', task?.taskPickupRoom!);
        localStorage.setItem('finalRoom', task?.taskDeliveryRoom!);
        localStorage.setItem('pathArray', JSON.stringify(pathArray));
        localStorage.setItem('autoPilot', "true")

        this.router.navigate(['/view3d']);
      }
    )
  }
}
