export interface Status {
    id: number;
    name: string;
}

export interface Priority {
    id: number;
    name: string;
    icon: string; // Adjust type if icon is more complex
}

export interface Department {
    id: number;
    name: string;
}

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string; // Could be URL or base64 string
    department_id: number;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string; // ISO date string, or use Date if you prefer parsing it
    status: Status;
    priority: Priority;
    department: Department;
    employee: Employee;
}
