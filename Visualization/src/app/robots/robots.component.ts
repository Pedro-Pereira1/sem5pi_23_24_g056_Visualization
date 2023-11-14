import { Component, OnInit } from '@angular/core';
import { RobotTypeService } from '../services/robot-type.service';
import { RobotService } from '../services/robot.service';
import { RobotCreate } from '../domain/robot/RobotCreate';

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css'],
  providers: [RobotTypeService,RobotService]
})
export class RobotsComponent implements OnInit{

  constructor(private robotTypeService: RobotTypeService, private robotService:RobotService) { }

  robotTypes: any[] = [];
  code: string = '';
  nickname: string = '';
  robotTypeID: string = '';
  serialNumber: string = '';
  description: string = '';

  ngOnInit(): void {
    this.robotTypeService.listAll().subscribe(
      (data: any) => {
        this.robotTypes = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.robotTypes = [];
      }
    );
  }

  createRobot() {
    const robot: RobotCreate = {
      code: this.code,
      nickname: this.nickname,
      type: this.robotTypeID,
      serialNumber: this.serialNumber,
      description: this.description
    }

    this.robotService.createRobot(robot).subscribe(
      (data: any) => {
        window.alert("Robot " + this.code + " created successfully");
        this.code = "";
        this.nickname = "";
        this.robotTypeID = "";
        this.serialNumber = "";
        this.description = "";
      },
      (error: any) => {
        console.error('Error:', error);
        window.alert("Error creating robot " + this.code);
      }
    );
  
  }


}
