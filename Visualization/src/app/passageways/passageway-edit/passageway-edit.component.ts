import { Component } from '@angular/core';
import {PassagewayService} from "../../services/passageway.service";
import { FormGroup, FormControl } from '@angular/forms';
import {Passageway} from "../../domain/passageway/Passageway";
import {BuildingService} from "../../services/building.service";
import {PassagewayEdit} from "../../domain/passageway/PassagewayEdit";

@Component({
  selector: 'app-passageway-edit',
  templateUrl: './passageway-edit.component.html',
  styleUrls: ['./passageway-edit.component.css'],
  providers: [PassagewayService, BuildingService]
})
export class PassagewayEditComponent {

  constructor(private passagewayService: PassagewayService) { }

  passageways: PassagewayEdit[]= [];
  index:number = 0;
  expanded: boolean[] = [false];

  createForm = new FormGroup({
    id: new FormControl(0),
    floor1Id: new FormControl(0),
    floor2Id: new FormControl(0),
  })

  toggleExpansion(index: number, passageway: PassagewayEdit) {
    this.expanded[index] = !this.expanded[index];
    if (this.expanded[index]) {
      this.createForm.patchValue({
        id: passageway.passagewayId,
        floor1Id: passageway.floor1Id,
        floor2Id: passageway.floor2Id,
      })
    }
  }

  ngOnInit() {
    this.passagewayService.listAllPassageways()
      .subscribe(
        (data: PassagewayEdit[]) => {
          this.passageways = data;
        }
      )
  }

  update(){
    this.passageways=[]
    this.passagewayService.listAllPassageways()
      .subscribe(
        (data: PassagewayEdit[]) => {
          this.passageways = data;
        }
      )
  }

  onEdit(){

    const passageway: PassagewayEdit ={
      passagewayId: this.createForm.value.id!,
      floor1Id: this.createForm.value.floor1Id!,
      floor2Id: this.createForm.value.floor2Id!,
    }

    this.passagewayService.editPassageways(passageway).subscribe((p:Passageway) => {
      window.alert("Passageway " + p.passagewayId + " edited successfully");
      this.update();
    })

    this.createForm.reset();
  }

}
