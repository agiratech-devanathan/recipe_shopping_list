import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.less']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  recipes: RecipeModel[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   this.subscription= this.recipeService.recipeChanged.subscribe((newRecipes: RecipeModel[]) => {
   this.recipes=newRecipes;
    })
    this.recipes = this.recipeService.getRecipe();

  }
  onNewRecipe() {
    this.router.navigate(['new-recipe'], { relativeTo: this.activatedRoute })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
