import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../user/signup/signup.component';
import { SnackbarService } from '../services/snackbar.service';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements AfterViewInit {
  user: any = {};
  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private snackBar: SnackbarService
  ) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  ngAfterViewInit () {
    (window as any).initialize();
  }

  emailLogin() {
    this.auth.emailLogin({email: this.email, password: this.password}).catch(error => {
      this.handleError(error.message);
    });
  }

  socialLogin(loginMethod: string) {
    this.auth.socialLogin(loginMethod).catch(error => {
      this.handleError(error.message);
    });
  }

  handleError(message: string) {
    this.snackBar.openSnackBar(message, 'accent-bg', 5000);
  }

}
