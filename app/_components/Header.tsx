'use client'
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const {user} = useUser();
    const menuItems = [
        {
            name: "Home",
            path: "/",},
        {
            
            name: "Pricing",
            path: "/pricing",
        },
        {
            name: "Contact-us",
            path: "/contact-us",
        },
    ];
  return (
    <div className='flex justify-between items-center p-4'>
        {/* logo */}
        <div className='flex gap-5 items-center'>
        <Image src="/logo.svg" alt="logo" width={30} height={30}/>
        <h2 className='font-bold text-2xl'>AI Trip Planner</h2>

        </div>

        {/* Menu Sections */}

        <div className='flex gap-6 items-center'>
            {menuItems.map((item, index) => (
                <div key={index}>
                    <Link href={item.path}>
                    <h2 className='cursor-pointer text-lg hover:scale-110 transition-all duration-300 hover:text-primary'>{item.name}</h2></Link>
                </div>
            ))}
        </div>


         {/* Get Started */}
        {!user ? <SignInButton mode="modal">
         <Button>Get Started</Button></SignInButton> :
         <Link href="/create-new-trip"><Button className='cursor-pointer'>Create New Trip</Button></Link>
        }
    </div>
  )
}

export default Header
