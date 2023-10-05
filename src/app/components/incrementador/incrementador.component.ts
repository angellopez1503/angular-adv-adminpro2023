import { Component } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {

  progreso:number=20

  get getPorcentaje(){
    return `${this.progreso}%`
  }

  cambiarValor(valor:number){

    if(this.progreso >=100 && valor >=0){
      return this.progreso = 100
    }

    if(this.progreso <=0 && valor <0){
      return this.progreso = 0
    }

    this.progreso = this.progreso+valor
    return this.progreso

  }

}
