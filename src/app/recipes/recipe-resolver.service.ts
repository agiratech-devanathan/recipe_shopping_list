import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, RoutesRecognized } from "@angular/router";
import { DataStorgeService } from "../shared/apiService/data-storage.service";
import { RecipeService } from "./recipe.service";
import { RecipeModel } from "./recipes.model";
@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<RecipeModel[]>{
    constructor(
        private dataSorageService: DataStorgeService,
        private recipeService:RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes=this.recipeService.getRecipe()
        if(recipes.length===0){
            return  this.dataSorageService.fetchData();
        }
        else{
            return recipes
        }
      
    }
}