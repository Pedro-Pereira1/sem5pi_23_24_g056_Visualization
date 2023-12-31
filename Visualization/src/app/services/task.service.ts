import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ITaskDTO from '../domain/task/TaskDTO';
import ICreateTaskDTO from '../domain/task/CreateTaskDTO';
import { Observable, catchError, throwError } from 'rxjs';

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
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      window.alert('An error occurred: ' + error.error.message);
    } else {
      window.alert('Backend returned code ' + error.status + ', body was: ' + error.error.message);
    }
    return throwError(() => new Error(error.error.message));
  }

  listAllPending(): Observable<ITaskDTO[]> {
    const url = this.tasksUrl + "/" + "listPendingTasks";
    return this.http.get<ITaskDTO[]>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

}
