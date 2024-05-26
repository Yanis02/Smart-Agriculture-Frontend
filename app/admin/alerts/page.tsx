import getCows from '@/app/services/getMyCows'
import { Cow } from '@/app/typings/myfarm';
import AdminCowsDataTable from '@/components/farmer/data-table';
import React from 'react'

async function page() {
    const result =await getCows() ;
    const cows=result as Cow[];
    console.log(cows);
    const criticalCows = cows.filter(cow => cow.health_status === "Critical");
  return (
    <div className='flex flex-col justify-center items-start gap-5'>
      <h1 className='text-xl font-bold'> Cows in <span className='text-[#FF0033]'>Critical</span> health status will appear here</h1>
        <AdminCowsDataTable data={criticalCows}/>
    </div>
  )
}

export default page