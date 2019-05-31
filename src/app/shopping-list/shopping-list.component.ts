import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingredientChanged.subscribe(
      (ingre: Ingredient[]) => {
        this.ingredients = ingre
      }
    );
  }

  onEditItem(index:number){
    this.shoppingService.editedItem.next(index)
  }

}
