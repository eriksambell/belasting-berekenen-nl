import { Component, OnInit, Input } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  constructor(private dataService:DataService) { }

  private _event: Event;

  @Input()
 
  get event(): Event {
    return this._event;
  }
  
  set event(event: Event) {
    this.calculate(event);
    this._event = event;
  }

  budgetTotal:number;
  totalTax:number;
  positions = [];
  levels = [];

  budget = [
    {long:"Sociale Zekerheid", short:"Sociale Zekerheid", amount:81.8},
    {long:"Zorg", short:"Zorg", amount:79.7},
    {long:"Onderwijs, Cultuur en Wetenschap", short:"Onderwijs & Cultuur", amount:38.5},
    {long:"Gemeentefonds, Provinciefonds en Btw-compensatiefonds", short:"Gemeente & Provinciefonds", amount:32.5},
    {long:"Buitenlandse Zaken / Internationale Samenwerking", short:"Buitenlandse zaken", amount:13.2},
    {long:"Justitie en Veiligheid", short:"Justitie & Veiligheid", amount:11.1},
    {long:"Defensie", short:"Defensie", amount:10.0},
    {long:"Infrastructuur en Waterstaat", short:"Infrastructuur", amount:9.5},
    {long:"Rentelasten", short:"Rentelasten", amount:5.5},
    {long:"Buitenlandse Zaken en Koninkrijksrelaties", short:"Buitenlandse zaken", amount:4.9},
    {long:"Economische Zaken en Klimaat", short:"Economische zaken", amount:4.0},
    {long:"Overig", short:"Overig", amount:1.8},
    {long:"Financiën", short:"Financiën", amount:1.7},
    {long:"Landbouw, Natuur en Voedselkwaliteit", short:"Landbouw & natuur", amount:0.8}
  ]

  calculate(event: Event){
    if(event !== undefined){     
      // get data from dataService
      this.totalTax = this.dataService.getData();

      // calculate total budget
      let amounts = this.budget.map( x => x.amount);
      this.budgetTotal = amounts.reduce((total, num) => total + num);

      // determine positions of boxes
      this.setPositions();
    }
  }

  setPositions(){
    
    // set first level (no boxes placed yet)
    this.levels = [{
      width: 100,
      height: 0,
      fromleft: 0
    }];

    for(let i = 0; i<this.budget.length; i++){
      let boxSize = this.setWidth(this.budget[i].amount);     // set width for each box
      let usedLevel = this.levels.findIndex(function(e) {     // find level where box fits
        return (e.width > boxSize);
      });
        
      // set positions for box and push to array
      this.positions.push({
        left: this.levels[usedLevel].fromleft, 
        bottom: this.levels[usedLevel].height
      });

      // push new level
      let boxFromLeft = 0;
      if ((usedLevel + 1 ) !== this.levels.length) boxFromLeft = this.levels[usedLevel].fromleft;
      
      this.levels.push({
          width:    boxSize,
          height:   this.levels[usedLevel].height + boxSize,
          fromleft: boxFromLeft,
      });

      // update level on which box is placed
      this.levels[usedLevel].width -= boxSize;
      this.levels[usedLevel].fromleft += boxSize;

      // sort levels array on height to enable searching lowest level
      this.levels.sort((a, b) => (a.height > b.height) ? 1 : -1);
    }
  }

  setWidth(y:number){
    let biggest = Math.sqrt(this.budget[0].amount / (0.25 * Math.PI));
    let current = Math.sqrt(y / (0.25 * Math.PI));
    let width = current / biggest * 0.41 * 100;
    return width;
  }
  
  onResize(event) {
    event.target.innerWidth;
  }

  correctHover(container, results){
    let hoverWidth = 200;
    let containerWidth = container.clientWidth;
    let containerPos = container.getBoundingClientRect();
    let viewportWidth = results.clientWidth;
    let correctLeft = 1;
    let padding = parseInt(results.style.paddingRight);

    if((containerPos.left + 0.5 * containerWidth) < 0.5 * hoverWidth) {
      // infoBox goes off screen on left side
      correctLeft = 0.5 * hoverWidth - 0.5 * containerWidth;
    } else if((containerPos.left + 0.5 * containerWidth + 0.5 * hoverWidth) > viewportWidth) {
      // infoBox goes off screen on right side
      correctLeft = - 1 * (containerPos.left + 0.5 * containerWidth + 0.5 * hoverWidth - viewportWidth + padding);
    }

    // return correction of left value
    return correctLeft;
  }

  ngOnInit() {
  } 

}
