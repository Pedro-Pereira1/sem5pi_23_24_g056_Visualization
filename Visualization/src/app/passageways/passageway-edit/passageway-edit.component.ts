import { Component } from '@angular/core';
import {PassagewayService} from "../../services/passageway.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Passageway} from "../../domain/passageway/Passageway";

@Component({
  selector: 'app-passageway-edit',
  templateUrl: './passageway-edit.component.html',
  styleUrls: ['./passageway-edit.component.css']
})
export class PassagewayEditComponent {

  constructor(private passagewayService: PassagewayService) { }

  createForm = new FormGroup({
    passagewayId: new FormControl(0),
    floor1Id: new FormControl(0),
    floor2Id: new FormControl(0),
  })

  onEdit(){
    const passageway = {
      passagewayId: this.createForm.value.passagewayId!,
      floor1Id: this.createForm.value.floor1Id!,
      floor2Id: this.createForm.value.floor2Id!,
    }

    this.passagewayService.editPassageways(passageway).subscribe((p:Passageway) => {
      window.alert("Passageway " + p.passagewayId + " edited successfully");
    })

    this.createForm.reset();
  }

}
