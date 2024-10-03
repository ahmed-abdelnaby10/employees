import NotFound from '@/components/resource stats/NotFound'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Not Found 404"
}

export default function page() {
    return (
        <NotFound />
    )
}
