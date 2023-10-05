import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {


  @Input() title:string = 'Sin Titulo'

  @Input('labels') doughnutChartLabels: string[] = [
    'Label1',
    'Label2',
    'Label3',
  ];
  @Input() data:number[]= [350, 450, 100]

  public doughnutChartData!: ChartData<'doughnut'>

  public doughnutChartType: ChartType = 'doughnut';


  ngOnInit(): void {

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data:this.data,
          backgroundColor:[
            '#6857e6',
            '#009fee',
            '#f02059'
          ]
        },

      ],
    };


  }



}
