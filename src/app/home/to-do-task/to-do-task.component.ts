import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/shared-services/sign-up.service';
import { TaskService } from 'src/app/shared-services/task.service';

@Component({
  selector: 'app-to-do-task',
  templateUrl: './to-do-task.component.html',
  styleUrls: ['./to-do-task.component.css']
})
export class ToDoTaskComponent implements OnInit {

  priorityLevels: string = 'Select Any';
  categories: string = 'Select Any';
  taskName: any;
  taskDate: any;
  repeatAfter: string = 'Select Any';
  isEnabling: any;
  repeatEnabled: boolean = false;
  signUpData1:any;
  email: any;
  taskList =[];
  taskAdded: boolean = false; 
  taskDeleted: boolean = false;
  taskComplete: boolean = false;
  filteredTaskList = [];
  constructor(public taskService:TaskService,
    public signUpService:SignUpService,
    private router: Router) {
     
     }


  ngOnInit(): void {
    this.getTaskData();
  }

  toggleRepeatDropdown(enabled: boolean) {
    this.repeatEnabled = enabled;
}

getTaskData() {
  this.signUpService.getSignUpDataOn().subscribe(data => {
    this.signUpData1 = data; 
    this.email = this.signUpData1[0].email; 
      this.taskService.getTaskData(this.email).subscribe(
        (list) => {
          this.taskList = list;
          this.filteredTaskList = this.taskList;
        },
        (err) => {
          console.log(err);
        }
      );
  });
}

filterTodos(status: string): void {
  if (status === 'all') {
    this.filteredTaskList = this.taskList;
  } else {
    this.filteredTaskList = this.taskList.filter(task => {
      if (status === 'pending') {
        return !task.isCompleted;
      } else if (status === 'completed') {
        return task.isCompleted;
      }
    });
  }
}

  saveTask(){
    const priority = this.priorityLevels === 'Select Any' ? null : this.priorityLevels;
    const categories = this.categories === 'Select Any' ? null : this.categories;
    const repeatAfter = this.repeatAfter === 'Select Any' ? null : this.repeatAfter;
    const taskData = {
      taskName: this.taskName,
      taskDate: this.taskDate,
      priorityLevels:priority,
      categories: categories,
      isEnabling: this.repeatEnabled,
      repeatAfter:repeatAfter,
      signUp: {
        uuidId: this.signUpData1[0].uuidId
      }
  };
  console.log(taskData)
   this.taskService.addTaskData(taskData).subscribe(res =>{
    this.getTaskData();
    this.taskName= '',
    this.taskDate ='',
    this.priorityLevels= 'Select Any',
    this.categories= 'Select Any',
    this.isEnabling= false,
    this.repeatEnabled = false;
    this.repeatAfter='Select Any',
    this.taskAdded = true;
    setTimeout(() => {
      this.taskAdded = false;
    }, 2000);
  
   },(err)=>{
    console.log(err)
   })
  }

  deleteAllTasks() {
    this.taskList.forEach(task => {
      this.deleteTask(task.uuidId);
    });
  }

  deleteTask(uuidId){
     this.taskService.deleteTaskDataById(uuidId).subscribe(res =>{
      this.getTaskData();
      this.taskDeleted = true;
      setTimeout(() => {
        this.taskDeleted = false;
      }, 2000);
     })
  }

  editTask(uuidId){
    this.taskService.updateTaskDataById(uuidId,null).subscribe(res =>{
     this.getTaskData();
     this.taskComplete = true;
     setTimeout(() => {
       this.taskComplete = false;
     }, 2000);
    })
 }


 navigateToTask(){
  this.router.navigate(['/viewTask']);
 }
}
