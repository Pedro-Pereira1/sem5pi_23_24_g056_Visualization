import { Component } from '@angular/core';
import {PassagewayService} from "../services/passageway.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Passageway} from "../domain/passageway/Passageway";

@Component({
  selector: 'app-passageways',
  templateUrl: './passageways.component.html',
  styleUrls: ['./passageways.component.css'],
  providers: [PassagewayService]
})
export class PassagewaysComponent {

  constructor(private passagewayService: PassagewayService) { }

  createForm = new FormGroup({
    passagewayId: new FormControl(0),
    building1Id: new FormControl(''),
    floor1Id: new FormControl(0),
    building2Id: new FormControl(''),
    floor2Id: new FormControl(0),
  })

  onCreate(){
    const passageway = {
      passagewayId: this.createForm.value.passagewayId!,
      building1Id: this.createForm.value.building1Id!,
      floor1Id: this.createForm.value.floor1Id!,
      building2Id: this.createForm.value.building2Id!,
      floor2Id: this.createForm.value.floor2Id!,
    }

    this.passagewayService.createPassageways(passageway).subscribe((p: Passageway) => {
      window.alert("Passageway " + p.passagewayId + " created successfully");
    })

    this.createForm.reset();

  }

}
