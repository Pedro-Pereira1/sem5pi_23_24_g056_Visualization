import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RoomService} from "../services/room.service";
import {Room} from "../domain/room/Room";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService]
})
export class RoomsComponent {
  constructor(private roomService: RoomService) { }
  categories: string[] = ["Office","Amphitheater", "Laboratory", "Other"];

  createForm = new FormGroup({
    roomName: new FormControl(''),
    roomDescription: new FormControl(''),
    roomCategory: new FormControl(''),
    floorId: new FormControl(0),
  })

  onCreate(){
    const room = {
      roomName: this.createForm.value.roomName!,
      roomDescription: this.createForm.value.roomDescription!,
      roomCategory: this.createForm.value.roomCategory!,
      floorId: this.createForm.value.floorId!,
    }

    this.roomService.createRoom(room).subscribe((r: Room) => {
      window.alert("Room " + r.roomName + " created successfully");
    })

    this.createForm.reset();
  }
}
