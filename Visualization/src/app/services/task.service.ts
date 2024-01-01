import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ITaskDTO from '../domain/task/TaskDTO';
import ICreateTaskDTO from '../domain/task/CreateTaskDTO';
import { Observable, catchError, throwError } from 'rxjs';
import ITaskSearchDTO from '../domain/task/TaskSearchDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = "http://localhost:4001/api/tasks"
  constructor(private http: HttpClient) { }

  createTask(taskCreate: ICreateTaskDTO): Observable<ITaskDTO> {
    const url = this.tasksUrl + "/" + "createTask";
    console.log(taskCreate);
    return this.http.post<ITaskDTO>(url, taskCreate)

  }

  listAllTasks(): Observable<ITaskDTO[]> {
    const url = this.tasksUrl + "/" + "listAllTasks";
    return this.http.get<ITaskDTO[]>(url)

  }

  searchTask(taskForm: ITaskSearchDTO ): Observable<ITaskDTO[]> {
    const url = this.tasksUrl + "/" + "searchTask" + "/" + taskForm.robotTypeID + "/" + taskForm.taskState + "/" + taskForm.user + "/" + taskForm.initialDate + "/" + taskForm.finalDate;
    return this.http.get<ITaskDTO[]>(url)
  }

  listAllPending(): Observable<ITaskDTO[]> {
    const url = this.tasksUrl + "/" + "listPendingTasks";
    return this.http.get<ITaskDTO[]>(url)
  }

}
