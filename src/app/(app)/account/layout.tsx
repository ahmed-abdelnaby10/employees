import { SidebarNav } from "@/components/account/SidebarNav"
import { Separator } from "@/components/ui/separator"
import React from "react"

const sidebarNavItems = [
    {
        title: "Account",
        href: "/account",
    },
    {
        title: "Change Password",
        href: "/account/change-password",
    },
    {
        title: "Appearance",
        href: "/account/appearance",
    },
]

interface AccountPageProps {
    children: React.ReactNode
}

export default function Page({ children }: AccountPageProps) {
    return (
		<div className="space-y-6 px-5 sm:px-8 py-8">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside>
					<SidebarNav items={sidebarNavItems} />
				</aside>
				<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</div>
    )
}