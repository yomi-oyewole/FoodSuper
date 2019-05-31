import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  itemEdited
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    );
    
    
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      this.itemEdited = this.recipeService.getRecipe(this.id)
            recipeName = this.itemEdited.name;
      recipeImagePath = this.itemEdited.imagePath;
      recipeDescription = this.itemEdited.description;
      if(this.itemEdited['ingredients']){
        for(let ingredient of this.itemEdited.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name , Validators.required),
              'amount': new FormControl(ingredient.amount , [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
           }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    //const recipe = new Recipe(this.itemEdited.name, this.itemEdited.description, this.itemEdited.imagePath, this.itemEdited.ingredients)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else{
      this.recipeService.addIngredient(this.recipeForm.value)
    }    
    this.recipeForm.reset();
    this.onCancel();
  }

  addIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );

  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.route.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
