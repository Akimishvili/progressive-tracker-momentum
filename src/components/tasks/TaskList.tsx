import { useMemo, useCallback } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import TaskCard from "./TaskCard.tsx";

import { taskStatuses } from "../../services/config.ts";
import {Task, TaskListProps} from "../../types/types.ts";
import useTasks from "../../hooks/useTask";

const TaskList = ({ selectedDepartments, selectedPriorities, selectedEmployee }: TaskListProps) => {
    // Use the custom hook to fetch tasks
    const { tasks, loading, error } = useTasks();

    // Memoized filter logic
    const filterTasks = useCallback(
        (task: Task) => {
            const departmentMatch =
                selectedDepartments.length === 0 || selectedDepartments.includes(task.department?.name);
            const priorityMatch =
                selectedPriorities.length === 0 || selectedPriorities.includes(task.priority?.name);
            const employeeMatch =
                !selectedEmployee ||
                `${task.employee?.name} ${task.employee?.surname}` === selectedEmployee;

            return departmentMatch && priorityMatch && employeeMatch;
        },
        [selectedDepartments, selectedPriorities, selectedEmployee]
    );

    // Memoize filtered tasks
    const filteredTasks = useMemo(() => tasks.filter(filterTasks), [tasks, filterTasks]);

    // Handle loading and error states
    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

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
                            tasksByStatus.map((task: Task) => (
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
