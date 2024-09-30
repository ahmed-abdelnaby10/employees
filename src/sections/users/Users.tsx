'use client'

import NotAllowed from "@/components/resource stats/NotAllowed"
import { useSelector } from "@/lib/rtk";

export default function Users() {
	const { name, role } = useSelector(state => state.user);

	if (role === "admin") {
		return (
			<NotAllowed />
		)
	}else {
		return (
			<div className="h-full flex-1 flex-col space-y-8 p-8 flex">
				Hi {name.slice(0, name.indexOf(" "))},&nbsp;Users data coming soon!
			</div>
		)
	}
}