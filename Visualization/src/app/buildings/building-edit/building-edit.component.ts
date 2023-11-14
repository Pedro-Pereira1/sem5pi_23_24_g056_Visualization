import { Component } from '@angular/core';
import { Building } from 'src/app/domain/building/Building';
import { BuildingService } from 'src/app/services/building.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgModel } from '@angular/forms';

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
    floors: new FormControl(0),
  })

  code = ''
  name = ''
  description = ''
  length = 0
  width = 0

  constructor(
    private buildingService: BuildingService) { }

  togleExpansion(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  ngOnInit() {
    this.buildingService.listAll()
      .subscribe(
        (data: Building[]) => {
          this.buildings = data;
        }
      )
  }

  save(building: Building) {
    this.buildingService.editBuilding(building)
    window.alert(building.buildingName)
  }

}
