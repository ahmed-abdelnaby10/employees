import { Loader } from "lucide-react";

export default function ResourceState({ message, isLoading }: {message: string, isLoading: boolean}) {
    return (
        <div className="w-full h-full text-center flex items-center justify-center text-xl font-medium m-0">
            {message}
            {
                isLoading ? 
                <Loader className="animate-spin h-5 w-5 ml-2" />
                :""
            }
        </div>
    )
}
