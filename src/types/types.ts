import {ReactNode} from "react";

export interface Status {
    id: number;
    name: string;
}

export interface Priority {
    id: number;
    name: string;
    icon: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
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
    total_comments: number
}

export interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: () => void;
}

export type TaskListProps = {
    selectedDepartments: string[];
    selectedPriorities: string[];
    selectedEmployee: string | null;
};

export interface CheckboxGroupProps {
    options: { name: string; surname: string; avatar: string }[] | string[];
    selected: string[];
    onChange: (option: string) => void;
}


export interface FilterButtonProps {
    label: string;
    onClick: () => void;
}

export interface FilterDropdownProps {
    label: string;
    options?: string[];
    selected?: string | null;
    onSelect?: (option: string) => void;
    onApplyFilter?: () => void;
    children?: ReactNode;
}

export type FilterWrapperProps = {
    selectedDepartments: string[];
    setSelectedDepartments: (departments: string[]) => void;
    selectedPriorities: string[];
    setSelectedPriorities: (priorities: string[]) => void;
    selectedEmployee: string | null;
    setSelectedEmployee: (employee: string | null) => void;
};

export interface TaskCommentReply {
    author: string;
    avatar: string;
    text: string;
}

export interface TaskComment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    reply?: TaskCommentReply;
}


export interface CommentSectionProps {
    comments: TaskComment[];
    taskId: string;
}

export interface TaskCommentAPIResponse {
    id: number;
    text: string;
    author_nickname: string;
    author_avatar: string;
    sub_comments?: {
        author_nickname: string;
        author_avatar: string;
        text: string;
    }[];
}