import { Component } from '@angular/core';
import { Building } from 'src/app/domain/building/Building';
import { BuildingService } from 'src/app/services/building.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { BuildingCreate } from 'src/app/domain/building/BuildingCreate';

@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css'],
  providers: [BuildingService]
})
export class BuildingEditComponent {

  buildings: Building[] = []
  index: number = 0;
  expanded: boolean[] = [false];

  editForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    length: new FormControl(0),
    width: new FormControl(0),
    floors: new FormArray([new FormControl(0)]),
  })

  constructor(
    private buildingService: BuildingService
  ) { }

  toggleExpansion(index: number, building: Building) {
    this.expanded[index] = !this.expanded[index];
    if (this.expanded[index]) {
      this.editForm.patchValue({
        code: building.buildingCode,
        name: building.buildingName,
        description: building.buildingDescription,
        length: building.buildingLength,
        width: building.buildingWidth,
        floors: building.buildingFloors,
      })
    }
  }

  ngOnInit() {
    this.buildingService.listAll()
      .subscribe(
        (data: Building[]) => {
          this.buildings = data;
        }
      )
  }

  update() {
    this.buildings = []
    this.buildingService.listAll()
      .subscribe(
        (data: Building[]) => {
          this.buildings = data;
        }
      )
  }

  save() {
    let aux: number[] = []
    for (const f of this.editForm.value.floors!) {
      aux.push(f!)
    }

    const building: BuildingCreate = {
      buildingCode: this.editForm.value.code!,
      buildingName: this.editForm.value.name!,
      buildingDescription: this.editForm.value.description!,
      buildingLength: this.editForm.value.length!,
      buildingWidth: this.editForm.value.width!,
    }

    this.buildingService.editBuilding(building).subscribe((b: Building) => {
      window.alert("Building " + b.buildingCode + " edited successfully!")
      this.update()
    })
  }

}
