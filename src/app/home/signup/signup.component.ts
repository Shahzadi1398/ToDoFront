import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/shared-services/sign-up.service';
import { ThemeService } from 'src/app/shared-services/theme.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('loginButton') loginButton!: ElementRef;
  
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  isSubmitting: boolean = false;
  loading: boolean = false;
  signUpList: any;
  gradientString:any;

  constructor(
    public signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private themeService: ThemeService,
  ) { }

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
            this.router.navigate(['/login']);
        }, 2000); 
    }, 0);
  }

  signup(signupForm: NgForm) {
    if (signupForm.valid && !this.isSubmitting) {
        const emailExists = this.signUpList.some(item => item.email === this.email);
        
        if (emailExists) {
            this.snackBar.open('Email is already registered', 'ok', {
                duration: 3000,
                verticalPosition: 'top'
            });
            signupForm.resetForm();
            return; 
        }

        this.isSubmitting = true;

        const formData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        };

        this.signUpService.addSignUpData(formData)
            .subscribe(response => {
                signupForm.resetForm();
                this.isSubmitting = false;
                this.snackBar.open('Your ID has been registered', 'ok', {
                    duration: 3000, 
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            }, error => {
                console.error('Error saving form data:', error);
                this.isSubmitting = false;
            });
    }
}


}
