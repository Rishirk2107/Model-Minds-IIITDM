import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const Header = () => {

  const {userId}=auth();

  return (
    
    <div className="bg-gray-600 text-neutral-100">
      <div className="container mx-auto flex items-start justify-start ml-0 py-4 px-2">
        <div className='px-2 hover:underline underline-offset-4'>
        <Link href="/"  >
          Home
        </Link>
        </div >
        <div className='px-2 hover:underline underline-offset-4'>
        <Link href="/chat">
          Chat
        </Link>
        </div>
        <div className="flex gap-4 items-right ml-auto">
      {userId ?(
        <div><UserButton afterSignOutUrl='/'/></div>
      ):(
        <div className='flex gap-4 items-right mr-0'>
            <Link href={"/sign-up"}>Sign Up</Link>
            <Link href={"/sign-in"}>Sign In</Link>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Header;
