interface EmployeeQueryParams {
    gender?: string;
    position?: string;
    minSalary?: number;
    maxSalary?: number;
    email?: string;
    phone?: string;
    name?: string;
    id?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
}

interface Contact {
    first_name: string,
    second_name: string,
    third_name: string,
    address: string,
    phone: string,
    email: string
}

interface Media {
    original_url: string,
    preview_url: string,
    destination: string,
    file_type: string,
    file_name: string,
    file_extension: string,
    file_size: number,
    mime_type: string,
    created_at: string,
    updated_at: string
}

interface Employee {
    contact: Contact,
    _id: string,
    gender: string,
    birth_date?: string,
    position: string,
    fixed_salary: number,
    rewards: number,
    deductions: number,
    final_salary: number
    media: Media,
    created_at: string,
    updated_at: string,
}

interface EmployeesData {
    employees: Employee[],
    limit: number
    page: number
    total_employees: number
    total_pages: number
}

interface EmployeeValidationErrors {
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    phone?: string;
    address?: string;
    email?: string;
    salary?: string;
    gender?: string;
    position?: string;
    image?: string;
};  

interface UpdateEmployeeValues {
    firstName: string,
    secondName: string,
    thirdName: string,
    phone: string,
    address: string,
    email: string,
    salary: number,
    gender: string,
    position: string,
    rewards?: number,
    deductions?: number,
    birthDate?: any,
    media: any,
}