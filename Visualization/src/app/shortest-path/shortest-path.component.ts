import { Component } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { Building } from '../domain/building/Building';
import { FormGroup, FormControl } from '@angular/forms';
import { Floor } from '../domain/floor/Floor';
import { ShortestPathService } from '../services/shortest-path.service';

@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.css'],
  providers: [BuildingService, FloorService, ShortestPathService]
})
export class ShortestPathComponent {

  constructor(
    private buildingService: BuildingService,
    private floorService: FloorService,
    private shortest_path: ShortestPathService
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
    y1: new FormControl(0)
  })

  floor2 = new FormGroup({
    x2: new FormControl(0),
    y2: new FormControl(0)
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


  ngOnSubmit() {
    this.shortest_path.getShortestPath(Number(this.floor1.value.x1), Number(this.floor1.value.y1), this.floor1Id, Number(this.floor2.value.x2), Number(this.floor2.value.y2), this.floor2Id).subscribe((path: string) => {
      this.path = path
    })
  }


}
