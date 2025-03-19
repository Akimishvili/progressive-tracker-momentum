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
    firstName: string;
    lastName: string;
    department_id: number;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: Status;
    priority: Priority;
    department: Department;
    employee: Employee;
}

export interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: () => void;
}
