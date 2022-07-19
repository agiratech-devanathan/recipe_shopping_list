import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorgeService } from "../shared/apiService/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit,OnDestroy {
   private userSubcription:Subscription;
   isAuthenticated=false;
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService:DataStorgeService ,private authService:AuthService){}

  ngOnInit(): void {
   this.userSubcription= this.authService.user.subscribe( user=>{
    this.isAuthenticated=!!user;

   })
  }
    onSaveData(){
this.dataStorageService.storeData();
    }


    onFetchData(){
      this.dataStorageService.fetchData().subscribe();
    }


    ngOnDestroy(): void {
      this.userSubcription.unsubscribe();
    }
}