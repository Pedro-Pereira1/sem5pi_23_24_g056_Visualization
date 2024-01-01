import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RobotType } from 'src/app/domain/robotType/RobotType';
import ITaskDTO from 'src/app/domain/task/TaskDTO';
import { UserDto } from 'src/app/domain/user/UserDto';
import { RobotTypeService } from 'src/app/services/robot-type.service';
import { TaskService } from 'src/app/services/task.service';
import { AuthServiceService } from '../../services/auth-service.service';
import ITaskSearchDTO from 'src/app/domain/task/TaskSearchDTO';
import { Console } from 'console';

@Component({
  selector: 'app-task-list-requests',
  templateUrl: './task-list-requests.component.html',
  styleUrl: './task-list-requests.component.css'
})
export class TaskListRequestsComponent {
  form: FormGroup;

  floorSurvellianceTasks: ITaskDTO[] = [];
  floorPickupDeliveryTasks: ITaskDTO[] = [];
  robotTypes: RobotType[] = [];
  users: UserDto[] = [];

  constructor(
    private taskService: TaskService,
    private robotTypeService: RobotTypeService,
    private authService: AuthServiceService,
    private fb: FormBuilder, 
  ) { 
    this.form = this.fb.group({
      robotTypeID: [{value: '', disabled: true}, Validators.required],
      taskState: new FormControl(''),
      user: new FormControl(''),
      initialDate: new FormControl(''),
      finalDate: new FormControl(''),     
    });
  }


  ngOnInit(): void {
		this.listAllTasks();
    this.listAllRobotTypes();
    this.listAllUsers();
	}

  listAllTasks() {
		this.taskService.listAllTasks().subscribe((tasks: ITaskDTO[]) => {
			this.floorSurvellianceTasks = tasks.filter((task) => task.taskType === "Floor surveillance");
      this.floorPickupDeliveryTasks = tasks.filter((task) => task.taskType === "Object transport");
		})
	}

  listAllRobotTypes() {
    this.robotTypeService.listAll().subscribe(
      (data: any) => {
        this.robotTypes = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.robotTypes = [];
      }
    );
  }

  listAllUsers() {
    this.authService.listAllUtentes().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.users = [];
      }
    );
  }

  onSubmit() {
    if(this.form.value.robotTypeID === "" || this.form.value.robotTypeID === undefined) {
      this.form.value.robotTypeID = null;
    }
    if(this.form.value.taskState === "") {
      this.form.value.taskState = null;
    }
    if(this.form.value.user === "") {
      this.form.value.user = null;
    }
    if(this.form.value.initialDate === "") {
      this.form.value.initialDate = null;
    }
    if(this.form.value.finalDate === "") {
      this.form.value.finalDate = null;
    }
      
    const form: ITaskSearchDTO = {
      robotTypeID: this.form.value.robotTypeID!,
      taskState: this.form.value.taskState!,
      user: this.form.value.user!,
      initialDate: this.form.value.initialDate!,
      finalDate: this.form.value.finalDate!,
    }

    this.taskService.searchTask(form).subscribe(
      (tasks: ITaskDTO[]) => {
        this.floorSurvellianceTasks = tasks.filter((task) => task.taskType === "Floor surveillance");
        this.floorPickupDeliveryTasks = tasks.filter((task) => task.taskType === "Object transport");
        window.alert("Tasks found: " + tasks.length);
    },
      (error: any) => {
        console.error('Error:', error);
       window.alert("Error: " + error.error);
      }
    );
  }

  onchange(event: any) {
    const selectedOption = event.target.value;  
    this.form.get('taskState')?.setValue(event.target.value);
    if (selectedOption === 'Done') {
      this.form.get('robotTypeID')?.enable();
    } else {
      this.form.get('robotTypeID')?.setValue('');
      this.form.get('robotTypeID')?.disable();
    }
  }

}
