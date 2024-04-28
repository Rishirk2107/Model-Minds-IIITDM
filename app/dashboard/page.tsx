import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

const dashboard = async () => {
    const {userId}=auth();
    console.log(userId);
    const user=await currentUser();
    console.log(user);

    if(!userId || !user){
        return <div>Not logged in</div>
    }
  return (
    
    <div className='mt-10 text-start max-w-xl mx-auto bg-neutrat-200 p-5 rounded'>
      <h1 className='text-4xl font-bold'>Welcome</h1>
      <ul className='list-none mt-10'>
        <li>
        <span className='font-semi-bold'>First Name:</span>{user.firstName}
        </li>
        <li>
        <span className='font-semi-bold'>Last Name:</span>{user.lastName}
        </li>
        <li>
        <span className='font-semi-bold'>First Name:</span>{' '}
        {user.emailAddresses[0].emailAddress}
        </li>
      </ul>
    </div>
  )
}

export default dashboard