import { Component } from '@angular/core';
import { Robot } from 'src/app/domain/robot/Robot';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-task-request-approval',
  templateUrl: './task-request-approval.component.html',
  styleUrl: './task-request-approval.component.css'
})
export class TaskRequestApprovalComponent {

  constructor(
    private robotService: RobotService,
  ) { }

  robots: Robot[] = [];

  ngOnInit(): void {
  
    this.listAllRobots();
  }


  listAllRobots() {
    this.robotService.listAllRobots().subscribe(
      (data: any) => {
        this.robots = data;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    )
  }

}
