import { Component, OnInit } from '@angular/core';
import { RobotTypeService } from '../services/robot-type.service';
import { RobotTypeCreate } from '../domain/robotType/RobotTypeCreate';
import { RobotType } from '../domain/robotType/RobotType';

@Component({
  selector: 'app-robot-types',
  templateUrl: './robot-types.component.html',
  styleUrls: ['./robot-types.component.css'],
  providers: [RobotTypeService]
})
export class RobotTypesComponent implements OnInit{

  constructor(private robotTypeService: RobotTypeService) { }
  
    robotTypeID: string = "";
    robotBrand: string = "";
    robotModel: string = "";
    availableTasks: string[] = [];

  ngOnInit(): void {
    
  }

  createRobotType() {
    const robotType: RobotTypeCreate = {
      robotTypeID: this.robotTypeID,
      robotBrand: this.robotBrand,
      robotModel: this.robotModel,
      availableTasks: this.availableTasks
    }

    this.robotTypeService.createRobotType(robotType).subscribe(
      (data: RobotType) => {
        window.alert("Robot Type " + this.robotTypeID + " created successfully");
        this.robotTypeID = "";
        this.robotBrand = "";
        this.robotModel = "";
        this.availableTasks = [];
      },
      (error: RobotType) => {
        console.error('Error:', error);
      }
    );
  }

  updateTasks(task: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.availableTasks.push(task);
    } else {
      const index = this.availableTasks.indexOf(task);
      if (index > -1) {
        this.availableTasks.splice(index, 1);
      }
    }
  }

}