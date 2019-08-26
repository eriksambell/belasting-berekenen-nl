import { Injectable } from '@angular/core';

// not used anymore!
// data service was used in previous version

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
  constructor() { }
}
