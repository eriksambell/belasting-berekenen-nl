import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CalculateTax } from 'src/app/shared/calculateTax';
import { HeroForm } from '../../shared/hero-form';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {

  @Output() 
  totalTax = new EventEmitter<number>();

  inputs: HeroForm[];
  incomeInput: HeroForm;
  ageInput: HeroForm;

  ngOnInit(): void {
    this.setInputs();
  }

  public submit(): void {
    const tax = new CalculateTax(this.inputs[0].value, this.inputs[1].value);
    const total = tax.brackets.reduce((sum, current) => sum + current);
    this.totalTax.emit(total);
  }

  private setInputs(): void {
    this.incomeInput = new HeroForm(null, "Salaris", "income", "Uw bruto maandsalaris", false, 5);
    this.ageInput = new HeroForm(null, "Leeftijd", "age", "Uw leeftijd", false, 2);
    this.inputs = [this.incomeInput, this.ageInput];
  }
}

