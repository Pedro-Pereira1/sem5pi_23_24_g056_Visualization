import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthServiceService]
})
export class LoginComponent {

  constructor(private authService: AuthServiceService,
    private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  onSubmit() {
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((user) => {
      this.router.navigate(["/home"]);
    })
  }
  


}
