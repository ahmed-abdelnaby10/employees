import Users from "@/components/users/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Users"
}
export default function Page() {
	return (
		<Users />
	)
}