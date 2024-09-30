import { LoginForm } from '@/components/auth/LoginForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Login"
}

export default function page() {
    return (
        <main className='w-full h-screen flex items-center justify-center px-5 sm:-ml-7'>
            <LoginForm />
        </main>
    )
}
