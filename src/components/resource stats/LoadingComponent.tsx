import { Loader } from "lucide-react";

export default function LoadingComponent() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loader className="animate-spin h-28 max-sm:h-16 max-md:h-20 w-28 max-sm:w-16 max-md:w-20 text-black dark:text-white" />
        </div>
    )
}