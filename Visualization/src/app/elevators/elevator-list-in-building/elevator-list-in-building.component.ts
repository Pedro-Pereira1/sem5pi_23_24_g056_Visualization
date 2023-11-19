import { Component } from '@angular/core';
import ElevatorList from 'src/app/domain/elevator/ElevatorList';
import { Floor } from 'src/app/domain/floor/Floor';
import { BuildingService } from 'src/app/services/building.service';
import { ElevatorService } from 'src/app/services/elevator.service';

@Component({
  selector: 'app-elevator-list-in-building',
  templateUrl: './elevator-list-in-building.component.html',
  styleUrls: ['./elevator-list-in-building.component.css'],
  providers: [ElevatorService, BuildingService]
})
export class ElevatorListInBuildingComponent {



  constructor(private elevatorService: ElevatorService, private buildingService: BuildingService) { }
  buildingCode: string = "";
  elevators: ElevatorList[] = [];
  buildings: any[] = [];

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

  listElevatorsInBuilding() {
    this.elevators = [];
    this.elevatorService.listElevatorsInBuilding(this.buildingCode).subscribe(
      (data: any) => {
        this.elevators = data;
      },
      (error: any) => {
        if (error.status === 400) {
          window.alert('No elevators found.');
          this.elevators = [];
        }
      }
    );
  }
}
