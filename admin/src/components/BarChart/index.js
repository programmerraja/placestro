import React from "react";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
    maintainAspectRatio:true,
    responsive:true,
    aspectRatio:1,
    plugins: {
      legend: {
        position: 'top' 
      },
      title: {
        display: true,
        text: 'Student Analaytics',
      },
    },
  };


function BarChart({data,title}){
    if(title){
      options.plugins.title.text=title;
    }
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div style={{width:"600px"}}>
                <Line options={options} data={data} />
            </div>
       </div>
        )
}

export default BarChart;