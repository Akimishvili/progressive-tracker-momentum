import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {apiToken, baseURL, taskStatuses} from "../../services/config.ts";
import TaskCard from "./TaskCard.tsx";
import { Task } from "../../types/types.ts";


const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${baseURL}/tasks`, {
                    method: "GET",
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

    return (
        <Row>
            <>
                {taskStatuses.map((status) => {
                    const filteredTasks = tasks.filter(
                        (task) => task.status.id === status.id
                    );

                    return (
                        <Col key={status.id}>
                            <Button
                                className="mb-3"
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

                            {filteredTasks.length === 0 ? (
                                <p>ამ სტატუსში ამოცანები არ არის</p>
                            ) : (
                                filteredTasks.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))
                            )}
                        </Col>
                    );
                })}
            </>
        </Row>
    );


};

export default TaskList;
