import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  accepted: boolean;
  dateOfBirth: Date;

  constructor(private router: Router, private Userservice: UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.accepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    //inject

  }

  onPhoneNumberChange() {
    console.log(`Phone type: ${this.phoneNumber}`);
  }

  register() {
    const message = `Phone: ${this.phoneNumber} +
                    Password: ${this.password} +
                    Full name: ${this.fullName} +
                    Address: ${this.address} + 
                    Date of birth: ${this.dateOfBirth}`;
    // console.log(message);
    // console.log('Register');
    
    const registerDTO:RegisterDTO = {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    this.Userservice.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        if (response && (response.status === 200 || response.status === 201)) {
          alert('Register successfully');
          this.router.navigate(['/login']);
        } else {
          // alert('Register failed');
        }
      },
      complete: () => {
        debugger
        alert('Register completed');
      },
      error: (error: any) => {
        debugger
        // console.error(error);
        alert(`Register failed, error: ${error.error}`);
      }
      
    });
  }

  checkPasswordMatch() {
    const retypePasswordControl = this.registerForm.form.get('retypePassword');
    if (!retypePasswordControl) return;

    if (this.password !== this.retypePassword) {
      retypePasswordControl.setErrors({ 'passwordMisMatch': true });
    } else {
      retypePasswordControl.setErrors(null);
    }
  }

  checkAge() {
    const dateOfBirthControl = this.registerForm.form.get('dateOfBirth');
    if (!dateOfBirthControl) return;

    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        dateOfBirthControl.setErrors({ 'invalidAge': true });
      } else {
        dateOfBirthControl.setErrors(null);
      }
    }
  }
}
