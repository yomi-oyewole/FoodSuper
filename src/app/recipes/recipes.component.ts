import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {

recipeSelect: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
/*  this.recipeService.recipeSelected
    .subscribe(
      (recipe:Recipe) => {this.recipeSelect = recipe}
      );  */
  }
/*   selectedItem(item: Recipe){ 
    this.recipeSelect = item;
  } */

}
