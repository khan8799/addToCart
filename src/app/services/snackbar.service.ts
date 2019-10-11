import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, cssClass: string, time: number) {
    return this.snackBar.open(msg, '', {
      duration: time,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      politeness: 'polite',
      panelClass: cssClass
    });
  }
}
