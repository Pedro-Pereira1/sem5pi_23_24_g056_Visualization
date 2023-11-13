import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-building-list-max-min',
  templateUrl: './building-list-max-min.component.html',
  styleUrls: ['./building-list-max-min.component.css'],
  providers: [BuildingService]
})


export class BuildingListMaxMinComponent implements OnInit {

  buildings: any[] = [];

  ngOnInit(): void {
    
  }

  constructor(private buildingService: BuildingService) { }
  max: number = 0;
  min: number = 0;

  listBuildingMaxMinFloors(){
    this.buildingService.listBuildingMaxMinFloors(this.max, this.min).subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.buildings = [];
      }
    );
  }

}
