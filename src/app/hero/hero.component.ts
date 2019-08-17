import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeroForm } from '../hero-form';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {

  incomeInput = new HeroForm (null, "Salaris", "income", "Uw bruto maandsalaris", false, 5);
  ageInput = new HeroForm (null, "Leeftijd", "age", "Uw leeftijd", false, 2);
  inputs = [this.incomeInput, this.ageInput];

  @Output() formSubmitted  = new EventEmitter<Event>();

  submit(event: Event){
    let inputData = this.totalTax(this.incomeInput.value * 12, this.ageInput.value);
    this.dataService.setData(inputData);
    this.formSubmitted.emit(event);
  }

  // tax input
  tarieven = {
    vanaf:    [0,       20834,  34817, 65507],
    werkend:  [0.3665, 0.3810, 0.3810, 0.5175],
    pensioen: [0.1875, 0.2020, 0.3810, 0.5175]
  }
  pensioenleeftijd = 67;
  mNota = [];

  // tax functions
  totalTax (income:number, age:number){
    let schijven = this.tarieven.vanaf.map( x => 0);
    let tarief = this.tarieven.werkend;
    if(age>=this.pensioenleeftijd) tarief = this.tarieven.pensioen;

    for(let i = 0;i<this.tarieven.vanaf.length-1;i++){
        if (income >= this.tarieven.vanaf[i] && income < this.tarieven.vanaf[i+1]) {
          schijven[i] = tarief[i] * (income - this.tarieven.vanaf[i]) / 12;
          return schijven;
        } else {
          schijven[i] = tarief[i] * (this.tarieven.vanaf[i+1] - this.tarieven.vanaf[i]) / 12;
        }
    }

  // laatste schijf
    const last = this.tarieven.vanaf.length - 1;
    schijven[last] = tarief[last] * (income - this.tarieven.vanaf[last]) / 12;

    let schijvenTotal = schijven.reduce((total, num) => total + num);
    return schijvenTotal;
  }

  constructor(private dataService:DataService) { }

  ngOnInit() {  }

}
