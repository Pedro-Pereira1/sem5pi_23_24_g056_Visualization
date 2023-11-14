import { Component } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BuildingCreate } from 'src/app/domain/building/BuildingCreate';
import { Building } from 'src/app/domain/building/Building';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css'],
  providers: [BuildingService]
})
export class BuildingCreateComponent {

  constructor(
    private buildingService: BuildingService,
  ) { }

  createForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    length: new FormControl(0),
    width: new FormControl(0),
  })

  onSubmint() {
    const buildign: BuildingCreate = {
      buildingCode: this.createForm.value.code!,
      buildingName: this.createForm.value.name!,
      buildingDescription: this.createForm.value.description!,
      buildingLength: this.createForm.value.length!,
      buildingWidth: this.createForm.value.width!
    }

    this.buildingService.createBuilding(buildign).subscribe((b: Building) => {
      window.alert("Building " + b.buildingCode + " created successfully");
    })

    this.createForm.reset();
  }
}
