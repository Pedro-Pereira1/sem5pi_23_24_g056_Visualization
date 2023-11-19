import { Component, OnInit } from '@angular/core';
import { RobotTypeService } from '../services/robot-type.service';
import { RobotService } from '../services/robot.service';
import { RobotCreate } from '../domain/robot/RobotCreate';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css'],
  providers: [RobotTypeService,RobotService]
})
export class RobotsComponent implements OnInit{

  constructor(private robotTypeService: RobotTypeService, private robotService:RobotService) { }

  robotTypes: any[] = [];

  createForm = new FormGroup({
    code: new FormControl(''),
    nickname: new FormControl(''),
    robotTypeID: new FormControl(''),
    serialNumber: new FormControl(''),
    description: new FormControl(''),
  })

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

  onSubmint() {
    const robot: RobotCreate = {
      code: this.createForm.value.code!,
      nickname: this.createForm.value.nickname!,
      type: this.createForm.value.robotTypeID!,
      serialNumber: this.createForm.value.serialNumber!,
      description: this.createForm.value.description!,
    }

    this.robotService.createRobot(robot).subscribe(
      (data: any) => {
        window.alert("Robot " + this.createForm.value.code! + " created successfully");
        this.createForm.reset();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  
  }


}
