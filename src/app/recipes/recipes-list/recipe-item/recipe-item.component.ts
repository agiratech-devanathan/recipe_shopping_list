import { Component, Input, OnInit,  } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { RecipeModel } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: RecipeModel;
@Input() index:number;

  
  ngOnInit(): void {
  }
  
}
