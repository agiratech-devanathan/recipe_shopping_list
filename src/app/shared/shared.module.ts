import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';



@NgModule({
  declarations: [
AlertComponent,
LoadingSpinnerComponent,
DropdownDirective,
PlaceHolderDirective
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceHolderDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
