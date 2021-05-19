import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading = false;
  userAvatar = 'http://aviadbenhayun.com:3000/images/user-default-image.png';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
    public appService: AppService
    ) { }

  ngOnInit(): void {
  }


  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigateByUrl('video');
      },
      errRes => {
        const code = errRes.error.error;
        let message = 'ההתחברות נכשלה! נסה שנית.';
        if (code === 'EMAIL_NOT_FOUND') {
          message = 'כתובת המייל אינה קיימת!';
        } else if (code === 'INVALID_PASSWORD') {
          message = 'הסיסמה איתה תואמת לכתובת המייל!';
        }
        this.snackBar.open(message, '', { duration: 3000, direction: 'rtl', verticalPosition: 'bottom', panelClass: ['danger'] });
      }
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();
  }

  onCancel() {
    this.appService.presentToast('הפעולה בוטלה', true);
    this.location.back();
  }

}
