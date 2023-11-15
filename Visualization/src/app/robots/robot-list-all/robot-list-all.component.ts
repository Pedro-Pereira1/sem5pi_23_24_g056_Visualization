import { Component, OnInit } from '@angular/core';
import { Robot } from 'src/app/domain/robot/Robot';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot-list-all',
  templateUrl: './robot-list-all.component.html',
  styleUrls: ['./robot-list-all.component.css'],
  providers: [RobotService]
})
export class RobotListAllComponent implements OnInit{
  robots: Robot[] = [];

  listAllRobots() {
    this.robotService.listAllRobots().subscribe(
      (data: Robot[]) => {
        this.robots = data;
      },
      (error: any) => {
        if (error.status === 400) {
          window.alert('No robots found.');
        }
      }
    );
  }

  constructor(private robotService: RobotService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
