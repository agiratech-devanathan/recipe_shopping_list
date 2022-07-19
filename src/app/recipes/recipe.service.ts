import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeModel } from './recipes.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<RecipeModel[]>();


  // private recipes: RecipeModel[] = [
  //   new RecipeModel('Mutton Pepper Fry',
  //     'Prepared by mutton boneless flesh wuth pepper ',
  //     'https://static.toiimg.com/photo/84667091.cms', [
  //     new IngredientModel(' Goat Meat', 3),
  //     new IngredientModel('Pepper', 2)
  //   ]),

  //   new RecipeModel('KFC prawn',
  //     'Prepared by prawn and KFC masalas',
  //     'https://static.toiimg.com/thumb/66635052.cms?imgsize=583896&width=800&height=800',
  //     [
  //       new IngredientModel('KFC masala', 4),
  //       new IngredientModel('Raw Prawn', 5)
  //     ]),
  // ];

  private recipes: RecipeModel[] = [];
  constructor(private shplService: ShoppingListService) { }

  setRecipes(recipe:RecipeModel[]){
    this.recipes=recipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipes(index: number) {
    return this.recipes[index]
  }

  OnAddIngredientToShoppingList(ingredients: IngredientModel[]) {
    this.shplService.onAddIngredients(ingredients)
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())

  }

  deleteRecipe(index:number){
this.recipes.splice(index,1)
this.recipeChanged.next(this.recipes.slice())
  }
}
