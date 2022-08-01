
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../recipes.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.less']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeModel
  id: number;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipes(this.id)
      console.log(this.recipe)
    })
  }

  onAddToShoppingList() {
    this.recipeService.OnAddIngredientToShoppingList(this.recipe.ingredients)
    console.log(this.recipe.ingredients)
  }

  onEditRecipes() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
