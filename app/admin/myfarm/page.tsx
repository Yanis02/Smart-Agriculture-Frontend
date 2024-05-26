import getCows from '@/app/services/getMyCows'
import { User } from '@/app/typings/authForms';
import { Cow } from '@/app/typings/myfarm';
import AdminCowsDataTable from '@/components/farmer/data-table';
import { cookies } from 'next/headers';
import React from 'react'

async function page() {
    const result =await getCows() ;
    const cows=result as Cow[];
    console.log(cows);
    const parsedUser=cookies().get("user_data")?.value as string;
    const user:User=JSON.parse(parsedUser);
  return (
    <div className='p-5 flex flex-col gap-x justify-center items-start'>
      <h1 className='p-3 text-2xl'>
        Hello 
       <span className='text-primary font-bold'> {user.fullname}</span>
       , welcome to <span className='text-primary font-bold'>{user.farm_name}</span>
      </h1>
        <AdminCowsDataTable data={cows}/>
    </div>
  )
}

export default page