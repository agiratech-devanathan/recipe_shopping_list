import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "src/app/recipes/recipe.service";
import { RecipeModel } from "src/app/recipes/recipes.model";
import { map, tap } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })

export class DataStorgeService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,

    ) { }

    storeData() {
        const recipes = this.recipeService.getRecipe();
        //console.log(recipes)
        this.http.put('https://recipe-and-shopping-list-cb578-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe((response) => {
                console.log(response)
            })
    }

    fetchData() {
            return this.http.get<RecipeModel[]>('https://recipe-and-shopping-list-cb578-default-rtdb.firebaseio.com/recipes.json')
            .pipe( map(recipes => {
            return recipes.map(recipe => {
                console.log(recipe)
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), tap((recipe) => {
            this.recipeService.setRecipes(recipe)
        }))

    }
}