import { Component } from '@angular/core';
import { options } from 'src/app/options';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  options = [...options]

  sayHi() {
    window.alert('HI')
  }
}
