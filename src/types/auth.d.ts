interface RegisterValues {
    name: string;
    email: string;
    password: string;
    c_password: string;
}
interface LoginValues {
    email: string;
    password: string;
}

interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    created_at: string,
    updated_at: string,
    media: Media | null
}