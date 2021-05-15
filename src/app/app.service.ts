import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private snackBar: MatSnackBar ) { }

  presentToast(message: string, isSuccess: boolean) {
    const snackBarClass = (isSuccess) ? 'success' : 'danger';
    this.snackBar.open(message, '', { duration: 3000, direction: 'rtl', verticalPosition: 'bottom', panelClass: [snackBarClass] });
  }

}
