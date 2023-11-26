import { Component } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { Building } from '../domain/building/Building';
import { FormGroup, FormControl } from '@angular/forms';
import { Floor } from '../domain/floor/Floor';

@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.css'],
  providers: [BuildingService, FloorService]
})
export class ShortestPathComponent {

  constructor(
    private buildingService: BuildingService,
    private floorService: FloorService
  ) { }

  buildings: Building[] = []
  building1Code: string = ""
  building2Code: string = ""

  floors1: Floor[] = []
  floors2: Floor[] = []
  floor1Id: number = 0
  floor2Id: number = 0

  floor1 = new FormGroup({
    x1: new FormControl(0),
    y1: new FormControl(0),
  })

  floor2 = new FormGroup({
    x2: new FormControl(0),
    y2: new FormControl(0),
  })

  path: string = ''

  listFloors1() {
    this.floorService.listAllFloors(this.building1Code).subscribe((floors: Floor[]) => {
      this.floors1 = floors
    })
  }

  listFloors2() {
    this.floorService.listAllFloors(this.building2Code).subscribe((floors: Floor[]) => {
      this.floors2 = floors
    })
  }

  ngOnInit() {
    this.buildingService.listAll().subscribe((buildings: Building[]) => {
      this.buildings = buildings
    })
  }





}
