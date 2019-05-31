import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/Forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {


  constructor(private shoppingService: ShoppingListService) { }
  editMode = false; 
  index:number;
  subscription: Subscription;
  itemEdited: Ingredient;
  @ViewChild('f') slForm: NgForm;

  ngOnInit() {
   this.subscription =  this.shoppingService.editedItem.subscribe(
      (index:number)=>{
        this.index = index;
        this.editMode = true; 
        this.itemEdited  = this.shoppingService.getIngred(index)
        this.slForm.setValue({
          name: this.itemEdited.name,
          amount: this.itemEdited.amount
        })
      }
    )
  }

  onSubmit(data: NgForm){
   
    const newIngredient = new Ingredient(data.value.name, data.value.amount)
    if(this.editMode){
      this.shoppingService.updateIngredient(this.index, newIngredient)
    }
    else{
      this.shoppingService.addIngredient(newIngredient)
    }
    this.editMode = false
    data.reset()
    
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false
  }
  onDelete(){
    this.shoppingService.deleteIngredient(this.index);
    this.slForm.reset()
    this.editMode = false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
