import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "src/app/recipes/recipe.service";
import { RecipeModel } from "src/app/recipes/recipes.model";
import { exhaustMap, map, tap, take } from 'rxjs/operators'
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })

export class DataStorgeService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
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
        return this.authService.user.pipe(take(1), exhaustMap(user => {

          console.log(user)

            return this.http.get<RecipeModel[]>('https://recipe-and-shopping-list-cb578-default-rtdb.firebaseio.com/recipes.json',
                {
                    params: new HttpParams().set('auth', 'kYusnEpM6XeNXu5RnlY5H2Gw2Oi1')
                }
            )
        }), map(recipes => {
            return recipes.map(recipe => {
                console.log(recipe)
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), tap((recipe) => {
            this.recipeService.setRecipes(recipe)
        }))

    }
}