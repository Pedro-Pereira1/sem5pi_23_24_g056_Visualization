import { Component } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css'],
  providers: [BuildingService, FormBuilder]
})
export class BuildingCreateComponent {

  constructor(
    private buildingService: BuildingService,
    private formBuilder: FormBuilder,
  ) { 

  }

  createForm = this.formBuilder.group({
    code: '',
    name: '',
    description: '',
    length: 0,
    width: 0,
  })


  onSubmint() {

  }
}
