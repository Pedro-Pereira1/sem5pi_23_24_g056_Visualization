import { Component, OnInit } from '@angular/core';
import { RobotTypeService } from '../services/robot-type.service';
import { RobotTypeCreate } from '../domain/robotType/RobotTypeCreate';
import { RobotType } from '../domain/robotType/RobotType';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-robot-types',
  templateUrl: './robot-types.component.html',
  styleUrls: ['./robot-types.component.css'],
  providers: [RobotTypeService]
})
export class RobotTypesComponent implements OnInit{

  constructor(private robotTypeService: RobotTypeService) { }
    createForm = new FormGroup({
      robotTypeID: new FormControl(''),
      robotBrand: new FormControl(''),
      robotModel: new FormControl(''),
      availableTasks: new FormControl<string[]>([])
    })

  ngOnInit(): void {
    
  }

  onSubmint() {
    const robotType: RobotTypeCreate = {
      robotTypeID: this.createForm.value.robotTypeID!,
      robotBrand: this.createForm.value.robotBrand!,
      robotModel: this.createForm.value.robotModel!,
      availableTasks: this.createForm.value.availableTasks!,
    }

    this.robotTypeService.createRobotType(robotType).subscribe(
      (data: RobotType) => {
        window.alert("Robot Type " + this.createForm.value.robotTypeID + " created successfully");
        this.createForm.reset();
      },
      (error: RobotType) => {
        console.error('Error:', error);
      }
    );
  }
  
  updateTasks(task: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.createForm.value.availableTasks!.push(task);
    } else {
      const index = this.createForm.value.availableTasks!.indexOf(task);
      if (index > -1) {
        this.createForm.value.availableTasks!.splice(index, 1);
      }
    }
  }

}