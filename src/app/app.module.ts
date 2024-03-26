import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { MaterialAllModule } from './shared-modules/material-all.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ThemeSwitcherComponent } from './home/theme-switcher/theme-switcher.component';
import { ThemeService } from './shared-services/theme.service';
import { ToDoTaskComponent } from './home/to-do-task/to-do-task.component';
import { ViewTaskComponent } from './home/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ThemeSwitcherComponent,
    ToDoTaskComponent,
    ViewTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialAllModule,
  ],
  providers: [DatePipe,ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
