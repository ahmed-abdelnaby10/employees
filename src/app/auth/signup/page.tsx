import { SignupForm } from '@/components/auth/SignupForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Register"
}

export default function page() {
    return (
        <main className='w-full h-screen flex items-center justify-center px-5 sm:-ml-7'>
            <SignupForm />
        </main>
    )
}
