import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string;
  password: string;
  constructor(private router: Router, private Userservice: UserService) {
    this.phoneNumber = '0901847726';
    this.password = '123';
  }

  onPhoneNumberChange() {
    console.log(`Phone type: ${this.phoneNumber}`);
  }

  login() {
    const message = `Phone: ${this.phoneNumber} +
                      Password: ${this.password} `;
    // console.log(message);
    // console.log('Register');

    debugger

    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password,
    }
    this.Userservice.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger
        if (response && (response.status === 200 || response.status === 201)) {
          this.router.navigate(['/login']);
        } else {
          // alert('Register failed');
        }
      },
      complete: () => {
        debugger
        alert('Login completed');
      },
      error: (error: any) => {
        debugger
        // console.error(error);
        alert(`Login failed, error: ${error.error}`);
      }

    });
  }

}
