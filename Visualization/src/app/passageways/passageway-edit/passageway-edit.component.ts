import { Component } from '@angular/core';
import {PassagewayService} from "../../services/passageway.service";

@Component({
  selector: 'app-passageway-edit',
  templateUrl: './passageway-edit.component.html',
  styleUrls: ['./passageway-edit.component.css']
})
export class PassagewayEditComponent {

  constructor(private passagewayService: PassagewayService) { }

  editPassageway(){

  }

}
