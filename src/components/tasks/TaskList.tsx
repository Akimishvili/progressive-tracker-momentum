import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { apiToken, baseURL, taskStatuses } from "../../services/config.ts";
import TaskCard from "./TaskCard.tsx";
import { Task } from "../../types/types.ts";

type TaskListProps = {
    selectedDepartments: string[];
    selectedPriorities: string[];
    selectedEmployee: string | null;
};

const TaskList = ({ selectedDepartments, selectedPriorities, selectedEmployee }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${baseURL}/tasks`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiToken}`,
                    },
                });

                const data: Task[] = await response.json();
                setTasks(data);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            }
        };

        fetchTasks();
    }, []);

    const filterTasks = (task: Task) => {
        const departmentMatch =
            selectedDepartments.length === 0 || selectedDepartments.includes(task.department?.name);
        const priorityMatch =
            selectedPriorities.length === 0 || selectedPriorities.includes(task.priority?.name);
        const employeeMatch =
            !selectedEmployee ||
            `${task.employee?.name} ${task.employee?.surname}` === selectedEmployee;

        return departmentMatch && priorityMatch && employeeMatch;
    };

    const filteredTasks = tasks.filter(filterTasks);

    return (
        <>
            {taskStatuses.map((status) => {
                // Filter tasks by current status
                const tasksByStatus = filteredTasks.filter(
                    (task) => task.status.id === status.id
                );

                return (
                    <Col key={status.id} className="px-0">
                        <Button
                            className="mb-3 pe-none"
                            style={{
                                backgroundColor: status.color,
                                borderColor: status.color,
                                width: "100%",
                                color: "#ffffff",
                                fontWeight: "bold",
                            }}
                        >
                            {status.name}
                        </Button>

                        {/* Check if there are tasks for this status */}
                        {tasksByStatus.length === 0 ? (
                            <p className="text-center">ამ სტატუსში დავალებები არ არის</p>
                        ) : (
                            tasksByStatus.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </Col>
                );
            })}
        </>
    );
};

export default TaskList;
