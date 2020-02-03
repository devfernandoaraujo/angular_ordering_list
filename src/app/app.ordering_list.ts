import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.ordering_list.html',
  styleUrls: ['./app.ordering_list.css']
})
export class AppOrderingList {
  title = 'My Orders';
  fruits = [
            {fruit: 'Apples', unitPrice: 1.23}, 
            {fruit:'Peaches', unitPrice: 1.39}, 
            {fruit:'Pears', unitPrice: 2.00}, 
            {fruit: 'Plums', unitPrice: 1.55}
          ];

  selectedFruit: number;
  firstName: string;
  lastName: string;
  address: string;
  addressMessage: string;
  fruitsMessage: string;
  showAddress: boolean;
  quantity: number;
  items:Array<any>;
  subTotal: number;
  taxes: number;
  total:number;

  constructor(){
    this.selectedFruit = -1;
    this.addressMessage = "";
    this.showAddress = false;
    this.items = [];
    this.subTotal = 0;
    this.taxes = 0;
    this.total = 0;
  }

  addItem(){
    let fruit = this.fruits[this.selectedFruit];

      this.subTotal = 0;
      this.taxes = 0;
      this.total  = 0;

    /*Validation */
    if(fruit == null || this.quantity == null || this.quantity <= 0 )
    {
      return;
    }

    let elementFound = false;

    this.items.forEach((elm)=>{
      if(elm.id == this.selectedFruit){
        elementFound = true;
        elm.quantity += Number(this.quantity);
        elm.subTotal = Number(fruit.unitPrice * elm.quantity);
        elm.taxes=  Number(fruit.unitPrice * elm.quantity * 0.07);
        elm.total = elm.subTotal + elm.taxes;
      }
    });

    
    if(!elementFound){
      let newFruit = {'fruit': fruit.fruit, 'value': fruit.unitPrice, 'quantity': Number(this.quantity), 'id': this.selectedFruit, 'amount': (this.quantity * fruit.unitPrice),
                      'subTotal': Number(fruit.unitPrice * this.quantity), 'taxes' :  Number(fruit.unitPrice * this.quantity * 0.07),
                      'total' : (Number(fruit.unitPrice * this.quantity)) +  Number(fruit.unitPrice * this.quantity * 0.07) };
      this.items.push(newFruit);
    }

    this.items.forEach((elm) =>{
      this.subTotal += Number(elm.subTotal); 
      this.taxes +=Number( elm.taxes);
      this.total +=  Number(elm.total);
    });

   

  }

  removeItem(item){
      for(let i = 0 ; i < this.items.length; i++)
      {
        if(this.items[i].id == item.id){
          this.items.splice(i,1);

          this.subTotal -= Number(item.quantity * item.value);
          this.taxes = Number(this.subTotal * 0.07);
          this.total = Number(this.subTotal + this.taxes);

        }
      }
  }

  onsubmitAddress(form: NgForm){
    if(form.invalid){
      this.addressMessage = `Please fill out first name, last name, and address`;
        return;
      }
      else{
        this.addressMessage = "";
        this.showAddress = true;
      }
  }
}
