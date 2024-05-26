"use client"
import getCowStats from '@/app/services/getCowStats';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import StatsGraph from '@/components/farmer/statsGraph';
function page() {
  const {cowId}=useParams();
  const [temp,setTemp]=useState([])
  const [steps,setSteps]=useState([])
  


  useEffect(()=>{
   async function getStats(){
    const id = cowId as string;
    const result:any = await getCowStats(id);
    if(result){
      setTemp(result.temperature)
      setSteps(result.steps)
    }

   }   
   getStats() ;
  

  },[])


  

  
  return (
    <div className='flex flex-col gap-y-5'>
     <h1 className='text-xl font-bold'>Cow ID  : <span className='text-primary'>{cowId}</span></h1>

      <h1 className='text-xl font-bold text-primary'>Temperature statisctics :</h1>
  <div className="flex flex-col p-3 w-[90%] h-1/4 bg-white rounded-2 flex justify-center items-start rounded-[10px]">
        <StatsGraph temp={temp} text={"Cows's temperature"} type={"temp"}/>
  </div>
  <h1 className='text-xl font-bold text-primary'>Footsteps statisctics :</h1>

  <div className="flex flex-col p-3 w-[90%] h-1/4 bg-white rounded-2 flex justify-center items-start rounded-[10px]">
        <StatsGraph temp={steps} text={"Cows's foot steps"} type={"steps"}/>
  </div>
    </div>
    
  )
}

export default page