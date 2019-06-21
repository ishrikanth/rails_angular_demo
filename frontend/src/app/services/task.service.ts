import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_BASE_URL: string = "http://localhost:3002";
  constructor(private  http: HttpClient) { }

  createTask(task: Task){
    task.status = "backlog"
    return this.http.post(this.API_BASE_URL+ "/tasks",{task: task});
  }

  getTasks(){
    return this.http.get(this.API_BASE_URL+ "/tasks.json");
  }

  updateTask(task: Task){
    return this.http.put(this.API_BASE_URL+ "tasks"+task.id+".json", {task: task})
  }
}
