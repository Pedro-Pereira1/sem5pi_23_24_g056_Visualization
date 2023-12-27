import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskRequestApprovalComponent } from './task-request-approval/task-request-approval.component';
import { TaskListNotApprovedComponent } from './task-list-not-approved/task-list-not-approved.component';
import { TaskListRequestsComponent } from './task-list-requests/task-list-requests.component';
import { TaskListApprovedComponent } from './task-list-approved/task-list-approved.component';

const routes: Routes = [
  {
    path: 'requestApproval',
    component: TaskRequestApprovalComponent
  },
  {
    path: 'list/notApproved',
    component: TaskListNotApprovedComponent
  },
  {
    path: 'list/requests',
    component: TaskListRequestsComponent
  },
  {
    path: 'list/approved',
    component: TaskListApprovedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskBackofficeRoutingModule { }
