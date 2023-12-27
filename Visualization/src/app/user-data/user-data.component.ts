import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBackofficeUserDto } from '../domain/user/CreateBackofficeUserDto';
import { UserDto } from '../domain/user/UserDto';
import { AuthServiceService } from '../services/auth-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }


  roleTypes: string[] = ["Admin", "Campus Manager", "Fleet Manager", "Task Manager"];
  passwordVisibility = false;

  userForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    password: new FormControl(""),
    taxPayerNumber: new FormControl(""),
    role: new FormControl("")
  });

  ngOnInit(): void {
    this.userForm.disable();
    const userEmail = this.authService.getEmailByToken(this.authService.getToken())
    this.authService.getUserInfo(userEmail).subscribe(userInfo => {
      this.userForm.controls['name'].setValue(userInfo.name)
      this.userForm.controls['email'].setValue(userEmail)
      this.userForm.controls['phoneNumber'].setValue(String(userInfo.phoneNumber))
      this.userForm.controls['taxPayerNumber'].setValue(String(userInfo.taxPayerNumber))
    });
  }

  wantsToDeleteProfile = false;
  confirmEdit = false;

  editProfile(){
    if(this.confirmEdit){
      this.confirmEdit = false;
      this.userForm.disable();
    } else{
      this.confirmEdit = true;
      this.userForm.enable();
    }
  }

  confirmUpdate(){
    const user: UserDto = {
      name: this.userForm.controls['name'].value ? this.userForm.controls['name'].value : "",
      email: this.userForm.controls['email'].value ? this.userForm.controls['email'].value : "",
      phoneNumber: Number(this.userForm.controls['phoneNumber'].value),
      taxPayerNumber: Number(this.userForm.controls['taxPayerNumber'].value),
      role: this.userForm.controls['role'].value ? this.userForm.controls['role'].value : ""
    }
    this.authService.updateUser(user).subscribe((user: UserDto) => {
      window.alert("Profile updated");
      this.userForm.disable();
      this.confirmEdit = false;
    });
  }

  deleteProfile(){
    this.wantsToDeleteProfile = true;
  }

  cancelDeleteProfile(){
    this.wantsToDeleteProfile = false;
  }

  confirmDeleteProfile(){
    const userEmail = this.authService.getEmailByToken(this.authService.getToken())
    this.authService.removeUser(userEmail).subscribe((b:boolean) =>{
      window.alert("This account has been deleted");
      this.authService.logout();
      this.router.navigate(["/home"]);
    });

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
