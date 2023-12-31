import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Building } from '../domain/building/Building';
import { Floor } from '../domain/floor/Floor';
import { Room } from '../domain/room/Room';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { TaskService } from '../services/task.service';
import ITaskDTO from '../domain/task/TaskDTO';
import ICreateTaskDTO from '../domain/task/CreateTaskDTO';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tasks-users',
  templateUrl: './tasks-users.component.html',
  styleUrl: './tasks-users.component.css'
})
export class TasksUsersComponent {
  objectTransportForm: FormGroup;
  floorSurveillanceForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private buildingService: BuildingService,
		private floorService: FloorService,
    private roomService: RoomService,
    private fb: FormBuilder, 
  ){
    this.objectTransportForm = this.fb.group({
      Description: new FormControl(''),
      PickupRoom: new FormControl(''),
      DeliveryRoom: new FormControl(''),
      PickupContact: new FormControl(''),
      DeliveryContact: new FormControl(''),
      PickupCode: new FormControl(''),
      
    });

    this.floorSurveillanceForm = this.fb.group({
      Description: new FormControl(''),
      PickupRoom: new FormControl(''),
      DeliveryRoom: new FormControl(''),
      buildingCode: new FormControl(''),
      floorId: new FormControl(''),
      Contact: new FormControl(''),
    });
  }

  buildings: Building[] = [];
	buildingCode: string = "";
	floors: Floor[] = []
	floorId: number = 0;

  floorsRoom: string[] = [];

  rooms: Room[] = [];

  taskType: string = '';

 

  ngOnInit(): void {
		this.listBuildings();
    this.listRooms();
	}

  onSubmit() {
    if (this.taskType === 'Object transport') {
      const taskCreate: ICreateTaskDTO = {
        taskType: this.taskType,
        taskDescription: this.objectTransportForm.value.Description,
        taskPickupRoom: this.objectTransportForm.value.PickupRoom,
        taskDeliveryRoom: this.objectTransportForm.value.DeliveryRoom,
        taskPickupContact: this.objectTransportForm.value.PickupContact,
        taskDeliveryContact: this.objectTransportForm.value.DeliveryContact,
        taskPickupCode: this.objectTransportForm.value.PickupCode,
      }
      this.taskService.createTask(taskCreate).subscribe(
        (task: ITaskDTO) => {
          window.alert("Task " + task.id + " created successfully");
          this.objectTransportForm.reset();
        },
        (error: ITaskDTO) => {
          console.error('Error:', error);
          this.objectTransportForm.reset();
        }
      );
      
    } else if (this.taskType === 'Floor surveillance') {
      const taskCreate: ICreateTaskDTO = {
        taskType: this.taskType,
        taskDescription: this.floorSurveillanceForm.value.Description,
        taskPickupRoom: this.floorSurveillanceForm.value.PickupRoom,
        taskDeliveryRoom: this.floorSurveillanceForm.value.DeliveryRoom,
        taskBuilding: this.floorSurveillanceForm.value.buildingCode,
        taskFloor: Number(this.floorSurveillanceForm.value.floorId),
        taskContact: this.floorSurveillanceForm.value.Contact.toString(),
      }
      this.taskService.createTask(taskCreate).subscribe(
        (task: ITaskDTO) => {
          window.alert("Task " + task.id + " created successfully");
          this.floorSurveillanceForm.reset();
        },
        (error: ITaskDTO) => {
          console.error('Error:', error);
          this.floorSurveillanceForm.reset();
        }
      );
      
    }
  }


  listBuildings() {
		this.buildingService.listAll().subscribe((buildings: Building[]) => {
			this.buildings = buildings
		})
	}

  listRooms() {
    this.roomService.listAllRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    })
  }

	listFloors() {
		this.floorService.listAllFloors( this.floorSurveillanceForm.value.buildingCode).subscribe((floors: Floor[]) => {
			this.floors = floors;
		})
	}

  listRoomsByFloor(){
      const floor = this.floors.find(floor => floor.floorId === Number(this.floorSurveillanceForm.value.floorId));
      this.floorsRoom = floor?.floorMap.rooms || [];
  }

  
}
