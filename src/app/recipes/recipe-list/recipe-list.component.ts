import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: Recipe[]
  subscription:Subscription

  constructor(private recipeService: RecipeService, private route: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeSelected.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onClick(){
    this.route.navigate(['new'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }






}
