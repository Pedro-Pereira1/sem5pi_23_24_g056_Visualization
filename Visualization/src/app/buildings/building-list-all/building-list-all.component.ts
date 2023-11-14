import { Component } from '@angular/core';
import { Building } from 'src/app/domain/building/Building';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-building-list-all',
  templateUrl: './building-list-all.component.html',
  styleUrls: ['./building-list-all.component.css'],
  providers: [BuildingService]
})
export class BuildingListAllComponent {

  buildings: Building[] = []

  constructor(
    private buildingService: BuildingService,
  ) { }

  ngOnInit() {
    this.buildingService.listAll()
      .subscribe(
        (data: Building[]) => {
          this.buildings = data;
        }
      )
  }

}
