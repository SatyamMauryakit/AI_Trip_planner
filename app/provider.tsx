'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const Createuser = useMutation(api.user.CreateNewUser)
  const {user}=useUser();

  const [userDetails, setUserDetails] =useState<any>();

  useEffect(() => {
    user&&CreateNewUser();
  }, [user]);
  
  const CreateNewUser= async()=>{
    //  save new user if not exist
    if(user){

  
    const result = await Createuser({
      name:user?.fullName ?? '',
      email:user?.primaryEmailAddress?.emailAddress ?? '',
      imageUrl:user?.imageUrl,});

    setUserDetails(result);
  }
}

  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <div>
    
        <Header/>
        {children}
      
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider


export const useUserDetail =()=>{
  return useContext(UserDetailContext);
}
