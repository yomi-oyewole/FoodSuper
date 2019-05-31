import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>()
  private ingredients: Ingredient[] =[
    new Ingredient('Apples', 5),
    new Ingredient('Bananna', 10)
];

editedItem = new Subject<number>();
index:number
  constructor() { }

  addIngredient(ingredient: Ingredient){

    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice());  // or u can remove slice from etIngredient
  }

  getIngredient(){
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]){
    /* for(let ingredient of ingredients){
      this.addIngredient(ingredient)
    } */

    this.ingredients.push(...ingredients)
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngred(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index]= ingredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
  this.ingredients.splice(index, 1);
  this.ingredientChanged.next(this.ingredients.slice())
  }
  
}
