import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  AlertMsg: boolean = false;
  AlertMsgText: string;
  user: any[];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private userService: UserService,) { }

  ngOnInit() {
    sessionStorage.removeItem('currentUser');
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      password: ['', Validators.required],
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.AlertMsg = false;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.getUserList().subscribe(data => {
      this.user = data;
      if (data.username == this.f.username.value.trim() && data.password == this.f.password.value.trim()) {
        if (data.isactive == 1) {
          sessionStorage.setItem('currentUser', JSON.stringify(data.firstName));
          this.router.navigate(['/employees']);
        }
      }
      else {
        this.AlertMsg = true;
        this.AlertMsgText = "You have entered an invalid user id or password.";
        this.submitted = false;
        this.loginForm.reset();
      }
    });
  }


}
