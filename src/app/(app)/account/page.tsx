import { AccountForm } from "@/sections/account/AccountForm";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Account",
}

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred image and
          name.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}