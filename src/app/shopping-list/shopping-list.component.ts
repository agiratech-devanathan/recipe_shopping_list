import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private ingSubcription=new Subscription;
  ingredients: IngredientModel[]
  constructor(private shplSercive: ShoppingListService ,private loggingService:LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shplSercive.getIngrident();
   this.ingSubcription= this.shplSercive.ingridientChanged.subscribe((ingredient: IngredientModel[]) => {
      this.ingredients = ingredient;
    });
    this.loggingService.printLog('i m from shoppingList component')
  }

  onEditItem(index:number){
    this.shplSercive.startEditing.next(index)
  }
  
  ngOnDestroy(): void {
    this.ingSubcription.unsubscribe();
  }

}
