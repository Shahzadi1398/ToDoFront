import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { ToDoTaskComponent } from './home/to-do-task/to-do-task.component';
import { ViewTaskComponent } from './home/view-task/view-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  { path: 'todo', component: ToDoTaskComponent},
  { path: 'viewTask', component: ViewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
