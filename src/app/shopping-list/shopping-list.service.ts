import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startEditing = new Subject<number>();
  ingridientChanged = new Subject<IngredientModel[]>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apple', 5),
    new IngredientModel('Mango', 10)
  ];
  constructor() { }

  getIngrident() {
    return this.ingredients.slice();
  }

  getIngredients(index: number) {
    return this.ingredients[index]
  }
  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingridientChanged.next(this.ingredients.slice());
  }
  onAddIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingridientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredients: IngredientModel) {
    this.ingredients[index] = newIngredients;
    this.ingridientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingridientChanged.next(this.ingredients.slice())

  }
}
