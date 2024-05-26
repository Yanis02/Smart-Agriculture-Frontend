"use client"
import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
function StatsGraph(props:any) {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [],
      });
      
      const [tempData, setTempData] = useState<{ label: number, value: number }[]>([]);
      useEffect(()=>{
        const tempSamples = Array.from({ length: 100 }, (_, i) => ({
          label: i + 1,
          value: 0,
        }));
      if (props.type==="temp") {
        props.temp.forEach((data: { temperature: number; timestamp: string },index:number) => {
      
            tempSamples[index].value = data.temperature;
        });
      
        setTempData(tempSamples);
        
      }else {
        props.temp.forEach((data: { steps: number; timestamp: string },index:number) => {
      
            tempSamples[index].value = data.steps;
        });
      
        setTempData(tempSamples);
      }
        
      
      },[props.temp])
      interface ChartData {
        labels: number[];
        datasets: {
          label: string;
          data: number[];
          backgroundColor: string[];
          borderColor: string;
          borderWidth: number;
        }[];
      }
      useEffect(() => {
        const newChartData = {
          labels: tempData.map((data) => data.label),
          datasets: [
            {
              label: props.text,
              data: tempData.map((data) => data.value),
              backgroundColor: ["#11B67B"],
              borderColor: "#11B67B",
              borderWidth: 1,
            },
          ],
        };
        setChartData(newChartData);
      }, [tempData]);
      Chart.register(CategoryScale);
    
  return (
    <Line
    data={chartData}
    options={{
      plugins: {
        title: {
          display: true,
          text: `${props.text} in the last 8h (mesured by the last 100 received data samples)`,
        },
      },
    }}
  />
  )
}

export default StatsGraph