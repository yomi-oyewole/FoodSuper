import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe[]>();
  editedItem = new Subject<number>();
  private recipes: Recipe[]=[
    new Recipe('test', 'A test recipe', 
    './flower.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('flower', 3)
    ]),
    new Recipe('test-2', 'A test2 recipe', 
    'https://www.maxpixel.net/static/photo/1x/Recipe-Soup-Noodle-Curried-Spicy-Chicken-Khaosoi-2344152.jpg', [
      
    new Ingredient('Vegetables', 1),
      new Ingredient('Fish', 3)
    ]),
    
  ];
  constructor(private shoppingService: ShoppingListService){}


  getRecipes(){
    return this.recipes.slice();
  }

  addToShoppingList(ingredient: Ingredient[]){

    this.shoppingService.addIngredients(ingredient)
  }

  getRecipe(id: number){
/*     const recipe =  this.recipes.find(
      (d) => {
        return d.id === id;
      }
    );
    return recipe */
    return this.recipes[id];
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index]= recipe;
    this.recipeSelected.next(this.recipes.slice())
  }

  addIngredient(recipe: Recipe){

    this.recipes.push(recipe)
    this.recipeSelected.next(this.recipes.slice());  // or u can remove slice from etIngredient
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1)
    this.recipeSelected.next(this.recipes.slice());
  }

}
