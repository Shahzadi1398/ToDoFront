import { Component } from '@angular/core';
import { ThemeService } from './shared-services/theme.service';
import { SignUpService } from './shared-services/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signUpData: any;
  password: any;
  email: any;
  isLoggedIn: any;
  constructor(private themeService: ThemeService,
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  changeTheme(themeName: string) {
    this.themeService.setTheme(themeName);
  }

  shouldShowLogoutButton(): boolean {
    const currentRoute = this.router.url;
    return !['/login', '/signup'].includes(currentRoute);
  }

  logout() {
    this.signUpService.getSignUpDataOn().subscribe(data => {
      this.signUpData = data; 
      this.email = this.signUpData[0].email;
      this.password = this.signUpData[0].password; 
      this.isLoggedIn = this.signUpData[0].isLoggedIn;   
      this.signUpService.updateSignUpDataByEmailAndPassword(this.email, this.password, null).subscribe(data => {
        this.snackBar.open('Logged out successfully', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/login']);       
      });
    });    
  }

  title = 'ToDoFront';
}
