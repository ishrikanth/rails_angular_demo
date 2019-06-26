import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {first} from "rxjs/operators";
import {TaskService} from "../services/task.service";
import {AlertService} from "../services";
import { Router } from '@angular/router';
import {Task} from "../models/task";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  display='none';
  taskForm: FormGroup;
  loading = false;
  submitted = false;
  public backlogTasks: Array<Task> = [];
  public inProgressTasks: Array<Task> = [];
  public testingTasks: Array<Task> = [];
  public doneTasks: Array<Task> = [];

  openModal(){
    this.display="block";
  }

  onCloseHandled(){
    this.display='none';
  }


  constructor(public formBuilder: FormBuilder,
              private taskService: TaskService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.getAllTasks();
  }

  getAllTasks(){
    this.taskService.getTasks().subscribe((data: Task[])=>{
      data.forEach((task) =>{
        if(task.status == "backlog"){
          this.backlogTasks.push(task);
        } else if(task.status == "inprogress"){
          this.inProgressTasks.push(task);
        } else if(task.status == "testing") {
          this.testingTasks.push(task);
        } else if(task.status ==" done") {
          this.doneTasks.push(task);
        }
      });
    });
  }

  get f() { return this.taskForm.controls; }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.id);
      console.log(event.container.id);
      console.log(event.currentIndex);
      console.log(event.item.element);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onSubmit(){
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskService.createTask(this.taskForm.value).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Task Created successfully', true);
          this.onCloseHandled();
          this.getAllTasks();
          this.router.navigate(['/todo']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
