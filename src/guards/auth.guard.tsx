"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ACCESS_TOKEN } from '@/utils/constants';
import Cookies from 'js-cookie';
import LoadingComponent from '@/components/resource stats/LoadingComponent';
import React from 'react';

export const getAccessToken = (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN);
};

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const accessToken = getAccessToken();

    useEffect(() => {
        if ((accessToken === undefined || !accessToken) && !pathname.includes("auth")) {
            router.push('/auth/login');
        } else {
            setIsAuthenticated(true)
        }
        
    }, [accessToken, pathname, router]);

    if (!isAuthenticated) {
        return <LoadingComponent />;
    }

    return <>{children}</>;
};

export default AuthGuard;