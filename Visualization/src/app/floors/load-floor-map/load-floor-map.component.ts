import { Component } from '@angular/core';
import { Floor } from 'src/app/domain/floor/Floor';
import { LoadFloorMap } from 'src/app/domain/floor/LoadFLoorMap';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-load-floor-map',
  templateUrl: './load-floor-map.component.html',
  styleUrls: ['./load-floor-map.component.css'],
  providers: [FloorService, BuildingService]
})
export class LoadFloorMapComponent {

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingService
  ) { }

  id: string = ""
  floors: any[] = []
  buildings: any[] = []

  index: number = 0
  expanded: boolean[] = [false]

  fileName = ""

  ngOnInit(): void {
    this.buildingService.listAll().subscribe(
      (data: any) => {
        this.buildings = data
      }
    );
  }

  listAllFloors() {
    this.floorService.listAllFloors(this.id).subscribe(
      (data: any) => {
        this.floors = data
      }
    );
  }

  toggleExpansion(index: number, floor: Floor) {
    this.expanded[index] = !this.expanded[index];
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name

      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const fileContent: string = fileReader.result!.toString()
        const dto = JSON.parse(fileContent) as LoadFloorMap
        this.floorService.loadFloorMap(dto).subscribe(
          (data: Floor) => {
            console.log(data)
          }
        );
      }

      fileReader.readAsText(file)
    }

  }

}
