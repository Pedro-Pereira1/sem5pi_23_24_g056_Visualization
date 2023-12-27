import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BuildingService } from '../services/building.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TaskRequestApprovalComponent } from './task-request-approval/task-request-approval.component';
import { TaskService } from '../services/task.service';
import { TaskBackofficeRoutingModule } from './tasks-backoffice-routing.module';
import { TaskListNotApprovedComponent } from './task-list-not-approved/task-list-not-approved.component';
import { TaskListRequestsComponent } from './task-list-requests/task-list-requests.component';
import { TaskListApprovedComponent } from './task-list-approved/task-list-approved.component';



@NgModule({
  declarations: [
    TaskRequestApprovalComponent,
    TaskListNotApprovedComponent,
    TaskListRequestsComponent,
    TaskListApprovedComponent
  ],
  imports: [
    CommonModule,
    TaskBackofficeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TaskService]
})
export class TasksBackofficeModule { }
