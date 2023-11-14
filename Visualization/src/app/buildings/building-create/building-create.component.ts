import { Component } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css'],
  providers: [BuildingService]
})
export class BuildingCreateComponent {

  constructor(
    private buildingService: BuildingService,
  ) { 

  }

  createForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    length: new FormControl(0),
    width: new FormControl(0),
  })


  onSubmint() {
    const buildign = {
      code: this.createForm.value.code,
      name: this.createForm.value.name,
      description: this.createForm.value.description,
      length: this.createForm.value.length,
      width: this.createForm.value.width
    }

    this.createForm.reset();
  }
}
