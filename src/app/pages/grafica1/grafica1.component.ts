import { Component } from '@angular/core';
// import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

public labels1:string[] = [
  'Pan',
  'Refresco',
  'Tacos',
];

public data1 = [10,15,150]



// public data1: ChartData<'doughnut'> = {
//   labels: this.labels1,
//   datasets: [
//     { data: [350, 450, 100],
//       backgroundColor:[
//         '#6857e6',
//         '#009fee',
//         '#f02059'
//       ]
//     },

//   ],
// };

// public type1: ChartType = 'doughnut';


}
