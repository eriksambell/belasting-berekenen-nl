import { Injectable } from '@angular/core';
import { HeroComponent } from './hero/hero.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data:any = undefined;

  setData(data:any){
    this.data = data;
  }

  getData():any {
    return this.data;
  }
  // constructor() { }
}
