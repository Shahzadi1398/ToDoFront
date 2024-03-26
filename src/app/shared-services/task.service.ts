import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UriService } from './uri.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private SAVE_TASK_URL = this.uri.BASE_URL + "task/save";
  private GET_TASK_URL = this.uri.BASE_URL + "task/getData/";
  private GET_TASK1_URL = this.uri.BASE_URL + "task/getData1/";
  private DELETE_TASKBYID_URL = this.uri.BASE_URL + "task/delete/";
  private UPDATE_TASKBYID_URL = this.uri.BASE_URL + "task/update/";

  constructor(private http: HttpClient,
    private uri: UriService) { }

  addTaskData(data): Observable<any>{
    return this.http.post(this.SAVE_TASK_URL, data);
  }  
  
  getTaskData(email): Observable<any>{
    return this.http.get(this.GET_TASK_URL +email);
  }  
  
    
  getTaskData1(email): Observable<any>{
    return this.http.get(this.GET_TASK1_URL +email);
  } 

  deleteTaskDataById(uuidId): Observable<any>{
    return this.http.delete(this.DELETE_TASKBYID_URL +uuidId);
  }   

  updateTaskDataById(uuidId,data): Observable<any>{
    return this.http.put(this.UPDATE_TASKBYID_URL +uuidId,null);
  }   
}
