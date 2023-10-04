import {React, useState} from 'react';
import { Bar } from '@ant-design/plots';


function BarGraph({data}) {

  //const data = [{religion: 'Catholic', count: 120}, {religion: 'INC', count: 50}]

    const config = {data, xField: 'count', yField: 'attribute', seriesField: 'attribute',
      legend: {
        position: 'top-left',
      },
    };

    return (
      <Bar {...config} /> 
    );
}

export default BarGraph;