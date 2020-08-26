import "./styles.css";
import Chart from "chart.js";
import budgetData from '../budget-data';
import pattern from 'patternomaly';

const labels = [];
const totalIncomingsData = [];
const totalOutgoingsData = [];
const netSpendData = [];
const revenueData = [];
budgetData.forEach(rec => {
  labels.push(rec.season);
  totalIncomingsData.push(rec.total_incomings);
  totalOutgoingsData.push(rec.total_outgoings);
  netSpendData.push(rec.net_spend);
  revenueData.push(rec.revenue);
});



var patternList = [
  'plus',
  'cross',
  'dash',
  'cross-dash',
  'dot',
  'dot-dash',
  'disc',
  'ring',
  'line',
  'weave',
  'zigzag',
  'zigzag-vertical'
];

var colorList = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600'
];

var ctx = document.getElementById("budgetChart");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels,
    datasets: [
      {
        label: "Total spent on Incomings per Season",
        data: totalIncomingsData,
        backgroundColor: pattern.draw(patternList[0], colorList[0]),
        borderWidth: 1
      },
      {
        label: "Total generated from Outgoings per Season",
        data: totalOutgoingsData,
        backgroundColor: pattern.draw(patternList[1], colorList[1]),
        borderWidth: 1
      },
      {
        label: "Net Spent per Season",
        backgroundColor: pattern.draw(patternList[2], colorList[2]),
        data: netSpendData,
        borderWidth: 1
      },
      {
        label: "Total revenue generated per Season",
        data: revenueData,
        backgroundColor: pattern.draw(patternList[3], colorList[3]),
        borderWidth: 1
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Budget comparision over years"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ],
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      mode: 'x',
      callbacks: {
        label: function(tooltipItems, data) {
          return `${data.datasets[tooltipItems.datasetIndex].label}: £${tooltipItems.value}m`;
        },
        afterLabel: function(tooltipItems, data) {
          var text = '';
          if(tooltipItems.datasetIndex < 2) {
            text += '\n';
            // incomings
            if(tooltipItems.datasetIndex < 1) {
              text += displayDetails(budgetData[tooltipItems.index].incomings);
            } else {
              text += displayDetails(budgetData[tooltipItems.index].outgoings);
            }
          }

          return text;
        },
      },
      footerFontStyle: 'normal'
    },
  }
});

function displayDetails(players) {
  var text = '';
  players.forEach(player => {
    text += `${player.name}: £${player.price}m \n`;
  });
  return text;
}
