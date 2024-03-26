import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/shared-services/sign-up.service';
import { ThemeService } from 'src/app/shared-services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginButton') loginButton!: ElementRef;
  
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  loading: boolean = false;
  signUpList: any;
  signUpData: any;
  gradientString:any;

  constructor(private router: Router,
    public signUpService: SignUpService,
    private snackBar: MatSnackBar,    
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.signUpService.getSignUpData().subscribe((res)=>{
      this.signUpList=res;
    });
    this.themeService.themeChanged.subscribe(() => {
      setTimeout(() => {
        this.updateButtonColor();
      }, 100); 
    });
  }

  ngAfterViewInit(): void {
    this.updateButtonColor();
  }

  updateButtonColor() {
    const buttonBgColor = window.getComputedStyle(this.loginButton.nativeElement).getPropertyValue('background-color');
    this.gradientString = `linear-gradient(45deg, ${buttonBgColor}, ${buttonBgColor})`;
    this.updateWaveColors();
  }

  private updateWaveColors() {
    const waveElements = ['wave0', 'wave1', 'wave2', 'wave3', 'wave4', 'wave5', 'wave6', 'wave7', 'wave8', 'wave9'];
    waveElements.forEach(waveId => {
      const wave = document.getElementById(waveId) as HTMLElement;
      if (wave) {
        wave.style.background = this.gradientString;
      }
    });
  }


showLoadingAndOpenSignup() {
  this.loading = true;
  setTimeout(() => {
    this.updateWaveColors();
      setTimeout(() => {
          this.router.navigate(['/signup']);
      }, 2000); 
  }, 0);
}

 login(email,password){
    this.signUpService.getSignUpData().subscribe((res) => {
        const signUpList = res;
        const emailExists = signUpList.some((item) => item.email === email);
        if (emailExists) {
            this.signUpService.getSignUpDataByEmailAndPassword(email, password).subscribe(
                (response) => {  
                  this.signUpData= response;
                  this.signUpService.setSignUpData(this.signUpData);              
                  this.loading = true;            
                  this.snackBar.open('Login successful!', 'Ok', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });   
                  setTimeout(() => {
                    this.router.navigate(["/todo"]);                    
                  }, 2000)              
                },
                (error) => {
                  this.snackBar.open('Password is wrong', 'Ok', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });  
                }
            );
        } else {
            this.snackBar.open('Email does not exist', 'Ok', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        }
    });
}  


}
