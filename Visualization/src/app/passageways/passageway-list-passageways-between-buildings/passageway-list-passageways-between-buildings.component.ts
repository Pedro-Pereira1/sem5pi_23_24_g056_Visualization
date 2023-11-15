import { Component } from '@angular/core';
import {BuildingService} from "../../services/building.service";
import {PassagewayService} from "../../services/passageway.service";
import {PassagewayList} from "../../domain/passageway/PassagewayList";
import {Building} from "../../domain/building/Building";

@Component({
  selector: 'app-passageway-list-passageways-between-buildings',
  templateUrl: './passageway-list-passageways-between-buildings.component.html',
  styleUrls: ['./passageway-list-passageways-between-buildings.component.css'],
  providers: [PassagewayService, BuildingService]
})
export class PassagewayListPassagewaysBetweenBuildingsComponent {
  constructor(private passagewayService: PassagewayService, private buildingService:BuildingService) { }
  passageways: PassagewayList[] = [];
  buildings: Building[] = [];
  building1: string = "";
  building2: string = "";

  ngOnInit(): void {
    this.buildingService.listAll().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.buildings = [];
      }
    );
  }

  listPassagewaysBuildings(){
    if(this.building1 == "" || this.building2 == ""){
      alert("Please select both buildings");
      return;
    }else if(this.building1 == this.building2){
      alert("Please select two different buildings");
      return;
    }
    this.passagewayService.listPassagewaysBuildings(this.building1,this.building2).subscribe(
      (data: any) => {
        this.passageways = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.passageways = [];
      }
    );
  }
}
