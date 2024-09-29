"use client"

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Home, Package2, PanelLeft, User, Users2 } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { usePathname } from 'next/navigation'
import { useSelector } from '@/lib/rtk'

export default function NavBar() {
  const pathname = usePathname()
  const user = useSelector(state => state.user);
  if (!pathname.includes("auth")) {
    return (
      <>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Employees Dashboard</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Employees Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Employees Dashboard</TooltipContent>
            </Tooltip>
            {
              user.role === "manager" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/users"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <Users2 className="h-5 w-5" />
                      <span className="sr-only">Users Dashboard</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Users Dashboard</TooltipContent>
                </Tooltip>
              )
            }
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Employees Dashboard</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground whitespace-nowrap"
                >
                  <Home className="h-5 w-5" />
                  Employees Dashboard
                </Link>
                {
                  user.role === "manager" && (
                    <Link
                      href="/users"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground whitespace-nowrap"
                    >
                      <Users2 className="h-5 w-5" />
                      Users Dashboard
                    </Link>
                  )
                }
                <Link
                  href="/account"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground whitespace-nowrap"
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </>
    )
  }
}
