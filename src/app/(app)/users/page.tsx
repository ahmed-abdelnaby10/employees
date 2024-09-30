import Users from "@/sections/users/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Users"
}
export default function Page() {
	return (
		<Users />
	)
}