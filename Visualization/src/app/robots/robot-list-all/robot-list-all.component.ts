import { Component, OnInit } from '@angular/core';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot-list-all',
  templateUrl: './robot-list-all.component.html',
  styleUrls: ['./robot-list-all.component.css'],
  providers: [RobotService]
})
export class RobotListAllComponent implements OnInit{
  robots: any[] = [];

  ngOnInit(): void {
    
  }

  constructor(private robotService: RobotService) { }

  listAllRobots() {
    this.robotService.listAllRobots().subscribe(
      (data: any) => {
        this.robots = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.robots = [];
      }
    );

    if (this.robots.length == 0) {
      window.alert('No robots found!');
    }
  }
}
