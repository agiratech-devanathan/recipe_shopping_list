import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.less']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editItemIndex: number;
  editSubcription: Subscription;
  editedItem: IngredientModel;
  @ViewChild('f') slForm: NgForm
  constructor(private shplService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubcription = this.shplService.startEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shplService.getIngredients(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredients = new IngredientModel(value.name, value.amount);
    if(this.editMode){
      this.shplService.updateIngredient(this.editItemIndex,newIngredients)
    }else{
      this.shplService.addIngredient(newIngredients)
    }
    this.editMode=false;
    form.reset();
   
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.shplService.deleteIngredient(this.editItemIndex)
    this.onClear()
    
  }

  ngOnDestroy(): void {
    this.editSubcription.unsubscribe()
  }
}
