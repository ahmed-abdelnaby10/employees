import { PasswordForm } from "@/components/account/PasswordForm";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Change Password",
}

export default function ChangePassword() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                    Change your password for more security.
                </p>
            </div>
            <Separator />
            <PasswordForm />
        </div>
    )
}
