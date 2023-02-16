import * as React from "react";
import Chart from "react-apexcharts";

export const My3Lines = ({dataFilter, dataMin, dataMax}) => {   
  const series = [ //data on the y-axis
    {
      name: 'Donnée filtrée',
      data: dataFilter
    },
    {
      name: 'Donnée min',
      data: dataMin
    },
    {
      name: 'Donnée max',
      data: dataMax
    },
  ];

  const options = { //data on the x-axis
    chart: { id: 'line-chart'},
    xaxis: {
      categories: []
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="700"
      />
    </div>
  )
}

export const MyLines = ({dataNorm}) => {   
    const series = [ //data on the y-axis
      {
        name: 'Donnée normalisée',
        data: dataNorm
      },
    ];

    const options = { //data on the x-axis
      chart: { id: 'line-chart'},
      xaxis: {
        categories: []
      }
    };
  
    return (
      <div>
        <Chart
          options={options}
          series={series}
          type="line"
          width="700"
        />
      </div>
    )
  }
