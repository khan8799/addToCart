import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private snackBar: SnackbarService,
    public userService: UserService,
    private authService: AuthService
  ) {}

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.authService.emailSignup(this.userService.signUpForm.value).then(res => {
      this.onClose();
      this.userService.updateUser(this.userService.signUpForm.value, res.user);
      this.snackBar.openSnackBar('account created successfully', 'accent-bg', 5000);
    }).catch(error => {
      this.handleError(error.message);
    });
  }

  onClear() {
    this.userService.signUpForm.reset();
  }

  handleError(message: string) {
    this.snackBar.openSnackBar(message, 'accent-bg', 5000);
  }
}
