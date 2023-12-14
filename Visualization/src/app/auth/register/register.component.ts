import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/domain/user/RegisterUserDto';
import { UserDto } from 'src/app/domain/user/UserDto';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthServiceService]
})
export class RegisterComponent {

  constructor(private authService: AuthServiceService,
    private router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    taxPayerNumber: new FormControl(""),
    password: new FormControl("")
  })

  onSubmit() {
    const user: RegisterUserDto = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      phoneNumber: Number(this.registerForm.value.phoneNumber!),
      taxPayerNumber: Number(this.registerForm.value.taxPayerNumber!),
      password: this.registerForm.value.password!
    }
    this.authService.register(user).subscribe((user: UserDto) => {
      window.alert("User " + user.name + " created successfully");
    })
  }

}
