import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

 
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
  let authObs: Observable<AuthResponseData>
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true
    if (this.isLoginMode) {
    authObs=this.authService.login(email,password)
    }
    else {
    authObs= this.authService.singUp(email, password)
    }

    authObs.subscribe((resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipes'])

    }), errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })

    form.reset()
  }

}