import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBackofficeUserDto } from '../domain/user/CreateBackofficeUserDto';
import { UserDto } from '../domain/user/UserDto';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  constructor(
    private authService: AuthServiceService
  ) { }

  roleTypes: string[] = ["Admin", "Campus Manager", "Fleet Manager", "Task Manager"];

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
      role: this.processRole(this.createForm.value.role!)
    }

    this.authService.createBackofficeUser(user).subscribe(
      (user: UserDto) => {
        window.alert('User created successfully');
        this.createForm.reset();
      }
    );
  }

  processRole(role: string): number {
    switch (role) {
      case "Admin":
        return 0;
      case "Campus Manager":
        return 1;
      case "Fleet Manager":
        return 2;
      case "Task Manager":
        return 3;
      default:
        return -1;
    }
  }
}
