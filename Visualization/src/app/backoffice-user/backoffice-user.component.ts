import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBackofficeUserDto } from '../domain/user/CreateBackofficeUserDto';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDto } from '../domain/user/UserDto';

@Component({
  selector: 'app-backoffice-user',
  templateUrl: './backoffice-user.component.html',
  styleUrl: './backoffice-user.component.css',
  providers: [AuthServiceService]
})
export class BackofficeUserComponent {
  constructor(
    private authService: AuthServiceService
  ) { }

  roleTypes: string[] = ["Admin", "CampusManager", "FleetManager", "TaskManager"];

  createForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl("")
  });

  onSubmit() {
    console.log(this.createForm.value);
    
    const user: CreateBackofficeUserDto = {
      name: this.createForm.value.name!,
      email: this.createForm.value.email!,
      phoneNumber: Number(this.createForm.value.phoneNumber!),
      password: this.createForm.value.password!,
      role: this.createForm.value.role!
    }

    this.authService.createBackofficeUser(user).subscribe(
      (user: UserDto) => {
        window.alert('User created successfully');
        this.createForm.reset();
      },
      (error: any) => {
        window.alert(error);
        console.error(error);
      }
    );
  }


}
