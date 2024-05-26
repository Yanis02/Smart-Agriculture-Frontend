import { User } from '@/app/typings/authForms';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cookies } from 'next/headers';
import React from 'react'

function page() {
    const parsedUser=cookies().get("user_data")?.value as string;
    const user:User=JSON.parse(parsedUser);

  return (
    <div className='flex flex-col p-5 gap-5 items-start'>
        <img className="w-64 h-64 rounded-[50%]" src={
            `https://ui-avatars.com/api/?name=${user.fullname}`
        }></img>
        <div className='flex justify-between items-center w-2/3'>
        <div className='flex flex-col gap-5 w-80'>
        <Label className='font-bold'>Full name</Label>
        <Textarea>{user.fullname}</Textarea>
        </div>
        <div className='flex flex-col gap-5 w-80'>
        <Label className='font-bold'>Email</Label>
        <Textarea>{user.email}</Textarea>
        </div>
        </div>
     <div className='flex justify-between items-center w-2/3'>
     <div className='flex flex-col gap-5 w-80'>
        <Label className='font-bold'>Farm name</Label>
        <Textarea>{user.farm_name}</Textarea>
        </div>
        <div className='flex flex-col gap-5 w-80'>
        <Label className='font-bold'>Address</Label>
        <Textarea>{user.address}</Textarea>
        </div>
     </div>
      
        
    </div>
  )
}

export default page