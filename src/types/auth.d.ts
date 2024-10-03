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

interface UserInterface {
    _id: string,
    name: string,
    email: string,
    role: string,
    gender: string,
    phone: string,
    created_at: string,
    updated_at: string,
    media: Media | null
}

interface UsersQueryParams {
    email?: string;
    name?: string;
    id?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
}

interface UsersData {
    users: UserInterface[],
    limit: number
    page: number
    total_users: number
    total_pages: number
}

interface UserValidationErrors {
    name?: string;
    phone?: string;
    gender?: string;
    media?: string;
};  
