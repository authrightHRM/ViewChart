import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDate().subscribe(
      res => {
        let label: string[] = [];
        let densities: number[] = [];
        let totalVolumL: number[] = [];
        let totalCellCount: number[] = [];
        for(let index in res){
          // console.log(res[index]);
          let data = res[index];

          label.push(data['Description']);

          let density = data['Density million/ml'];
          if(density == "")
            densities.push(null);
          else
            densities.push(density);

          let volumeL = data['Total Volume L'];
          if(volumeL == "")
            totalVolumL.push(null);
          else
            totalVolumL.push(volumeL);
          
          let cellCount = data['Total Cell Count'];
          if(cellCount == "")
            totalCellCount.push(null);
          else
            totalCellCount.push(cellCount);
        }
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: label,
            datasets:[
              {
                data: densities,
                label: "Density million/ml",
                borderColor: '#3cba9f',
                fill: false,
                lineTension: 0
              },
              {
                data: totalVolumL,
                label: "Total Volume L",
                borderColor: '#ffcc00',
                fill: false,
                lineTension: 0
              },
              {
                data: totalCellCount,
                label: "Total Cell Count",
                borderColor: '#00ffcc',
                fill: false,
                lineTension: 0
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Data demo'
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
        console.log(densities, totalVolumL);
      },
      error => {
        console.log("error when init app component: " + error);
      }
    )
  }
}
