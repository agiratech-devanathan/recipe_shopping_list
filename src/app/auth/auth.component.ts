import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit ,OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  public closeSub=new Subscription;
  @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;

 
  constructor(
    private authService: AuthService,
    private router:Router,
    private componentFactoryResolver:ComponentFactoryResolver) { }

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
      this.showErrorAlert(errorMessage)
      this.isLoading = false;
    })

    form.reset()
  }

  onHandlerError(){
    this.error=null;
  }
  private showErrorAlert(message:string){
const alertCmpFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
const hostViewContainerRef=this.alertHost.viewContainerRef;
hostViewContainerRef.clear();
const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
componentRef.instance.message=message;
this.closeSub=componentRef.instance.close.subscribe(()=>{
  this.closeSub.unsubscribe();
  hostViewContainerRef.clear();
})

  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
