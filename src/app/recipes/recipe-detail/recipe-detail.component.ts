import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id:number;
  recipe: Recipe;
  
  constructor(private recipeService: RecipeService, private activateRoute:ActivatedRoute, private route: Router) { }

  ngOnInit() {

    this.recipe = this.recipeService.getRecipe(this.id)
    this.activateRoute.params.subscribe(
      (param:Params) =>{
        this.id = +param['id']
        this.recipe = this.recipeService.getRecipe(this.id)
        
      }
    );

     
  }

  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe.ingredients)
  }

  onEdit(){
    this.recipeService.editedItem.next(this.id)
    this.route.navigate(['edit'], {relativeTo: this.activateRoute})
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.route.navigate(['/recipes'])
  }

}
