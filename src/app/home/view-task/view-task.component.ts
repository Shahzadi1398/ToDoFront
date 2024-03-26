import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/shared-services/sign-up.service';
import { TaskService } from 'src/app/shared-services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  signUpData1:any;
  email: any;
  taskList =[];
  filteredTaskList = [];
  taskAdded: boolean = false; 
  taskDeleted: boolean = false;
  taskComplete: boolean = false;

  constructor(public taskService:TaskService,
    public signUpService:SignUpService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTaskData();
  }

  getTaskData() {
    this.signUpService.getSignUpDataOn().subscribe(data => {
      this.signUpData1 = data; 
      this.email = this.signUpData1[0].email; 
        this.taskService.getTaskData1(this.email).subscribe(
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

  addEntry(task){
    let dueDate = new Date(task.taskDate);
    if (task.repeatAfter === 'Monthly') {
      dueDate.setMonth(dueDate.getMonth() + 1);
    } else if (task.repeatAfter === 'Weekly') {
      dueDate.setDate(dueDate.getDate() + 7);
    } else if (task.repeatAfter === 'Daily') {
      dueDate.setDate(dueDate.getDate() + 1);
    }
    const formattedDueDate = this.formatDate(dueDate);
    const taskData = {
      taskName: task.taskName,
      taskDate: formattedDueDate,
      priorityLevels: task.priorityLevels,
      categories: task.categories,
      isEnabling: task.isEnabling,
      repeatAfter: task.repeatAfter,
      signUp: {
        uuidId: this.signUpData1[0].uuidId
      }
    };
     this.taskService.addTaskData(taskData).subscribe(res =>{
      this.getTaskData();
      this.taskAdded = true;
      setTimeout(() => {
        this.taskAdded = false;
        this.taskService.deleteTaskDataById(task.uuidId).subscribe(res =>{
          this.getTaskData();
          this.taskDeleted = true;
          setTimeout(() => {
            this.taskDeleted = false;
          }, 2000);
         })
      }, 2000);
    
     },(err)=>{
      console.log(err)
     })
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); 
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }
  
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  isDueDatePast(dueDate: string): boolean {   
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    return dueDate < todayDateString;
  }

  isDueDateToday(dueDate: string): boolean {
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate.toDateString() === today.toDateString();
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

  filterpriority(priority){
    this.filteredTaskList = this.taskList.filter(task => task.priorityLevels === priority);
  }

  filtercategory(category){
    this.filteredTaskList = this.taskList.filter(task => task.categories === category);
  }

  filterrepeat(repeatAfter){
    this.filteredTaskList = this.taskList.filter(task => task.repeatAfter === repeatAfter);
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
  this.router.navigate(['/todo']);
 }
}
