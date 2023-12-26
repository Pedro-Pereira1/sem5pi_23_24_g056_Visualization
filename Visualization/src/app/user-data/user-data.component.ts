import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBackofficeUserDto } from '../domain/user/CreateBackofficeUserDto';
import { UserDto } from '../domain/user/UserDto';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit {
  constructor(
    private authService: AuthServiceService
  ) { }


  roleTypes: string[] = ["Admin", "Campus Manager", "Fleet Manager", "Task Manager"];
  passwordVisibility = false;

  userForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl("")
  });

  ngOnInit(): void {
    this.userForm.disable();
    const userEmail = this.authService.getEmailByToken(this.authService.getToken())
    this.authService.getUserInfo(userEmail).subscribe(userInfo => {
      this.userForm.controls['name'].setValue(userInfo.name)
      this.userForm.controls['email'].setValue(userEmail)
      this.userForm.controls['phoneNumber'].setValue(String(userInfo.phoneNumber))
    });
  }


  editProfile(){
    this.userForm.enable();
    this.passwordVisibility = true;

  }

  deleteProfile(){
  }

  dowloadData(){
    let user: UserDto = {
      name: "",
      email: "",
      phoneNumber: 0,
      taxPayerNumber: 0,
      role: "",
    }

    const userEmail = this.authService.getEmailByToken(this.authService.getToken())
    this.authService.getUserInfo(userEmail).subscribe(userInfo => {
      user.name = userInfo.name;
      user.email = userEmail;
      user.phoneNumber = userInfo.phoneNumber;
      user.taxPayerNumber = userInfo.taxPayerNumber;
      user.role = userInfo.role;
      const fileContent = JSON.stringify(user);

      const blob = new Blob([fileContent], { type: 'text/plain' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      const dateTime = new Date().toLocaleString();
      const date = dateTime.split(',')[0].replaceAll('/', '');
      const time = dateTime.split(',')[1].replaceAll(':', '');
      
      link.download = 'MyData_' + date +'T'+ time + '.json';
      
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
    });

  }
}
