import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
    apiToken,
    baseURL,
    departmentColors,
    departmentShortNames,
    priorityColors,
} from "../services/config.ts";
import {Status, Task} from "../types/types.ts";
import Image from "react-bootstrap/Image";
import CommentsSection from "../components/comments/CommentsSection.tsx";
import Dropdown from "react-bootstrap/Dropdown";


interface TaskCommentReply {
    author: string;
    avatar: string;
    text: string;
}

interface TaskComment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    reply?: TaskCommentReply;
}

const TaskDetail = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
    const [comments, setComments] = useState<TaskComment[]>([]);


    useEffect(() => {
        if (taskId) {
            fetchTaskById(Number(taskId));
            fetchStatuses();
            fetchCommentsByTaskId(Number(taskId));
        }
    }, [taskId]);

    const fetchCommentsByTaskId = async (taskId: number) => {
        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}/comments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }

            const commentsData: TaskComment[] = await response.json();
            setComments(commentsData);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
        }
    };


    const fetchStatuses = async () => {
        try {
            const response = await fetch(`${baseURL}/statuses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch statuses");
            }

            const data = await response.json();
            console.log("Fetched statuses:", data);
            setStatuses(data);
        } catch (err) {
            console.error("Failed to fetch statuses:", err);
        }
    };


    const fetchTaskById = async (id: number) => {
        try {
            const response = await fetch(`${baseURL}/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken}`,
                },
            });


            if (!response.ok) {
                throw new Error(`Failed to fetch task with ID ${id}`);
            }

            const fetchedTask: Task = await response.json();
            console.log("Fetched single task:", fetchedTask);
            setTask(fetchedTask);
            setSelectedStatusId(fetchedTask.status.id);
        } catch (err) {
            console.error("Failed to fetch task by ID:", err);
        }
    };

    const handleDropdownChange = async (newStatusId: number) => {
        setSelectedStatusId(newStatusId);

        try {
            const response = await fetch(`${baseURL}/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({ status_id: newStatusId }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task status");
            }

            const updatedTask = await response.json();
            console.log("Updated task:", updatedTask);
            setTask(updatedTask);
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };



    useEffect(() => {
        if (taskId) {
            fetchTaskById(Number(taskId));
            fetchStatuses();
        }
    }, [taskId]);


    if (!task) {
        return (
            <Container>
                <p>Loading task details...</p>
            </Container>
        );
    }

    // Get the priority color from the map
    const priorityColor = priorityColors[task.priority.id] || '#000'; // Default color if not found

    // Get the department color from the map
    const departmentColor = departmentColors[task.department.id] || '#000'; // Default color if not found

    // Get the department's shortened name from the map
    const departmentShortName = departmentShortNames[task.department.id] || task.department.name; // Default to full name if not found


    const georgianWeekdays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];

    const date = new Date(task.due_date);
    const dayOfWeek = date.getDay();
    const weekdayGe = georgianWeekdays[dayOfWeek];

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1);
    const year = date.getFullYear();

    const formattedDate = `${weekdayGe} - ${day}/${month}/${year}`;


    return (
        <Container>
            <Row className="align-items-center pt-4 ps-2">
                <Col className="p-0" lg={1} xs={2}>
                      <span>
                        <Button
                            className="level-btn pe-none"
                            style={{
                                "--bs-btn-border-color": priorityColor,
                                color: priorityColor,
                            } as React.CSSProperties}
                        >
                          <img
                              src={task.priority?.icon}
                              alt={task.priority?.name}
                              style={{ width: "16px", height: "18px", marginRight: "2px" }}
                          />
                            {task.priority?.name}
                        </Button>
                      </span>
                </Col>
                <Col className="p-0" lg={1} xs={2}>
                  <span>
                    <Button
                        className="department-btn pe-none"
                        style={{
                            backgroundColor: departmentColor,
                            borderColor: departmentColor,
                        }}
                    >
                      {departmentShortName}
                    </Button>
                  </span>
                </Col>
            </Row>

            <Row className="pt-2">
                <Col className="d-flex flex-column gap-4" xs={12} lg={6}>
                    <Row>
                        <h3 className="detail-page-title">{task.name}</h3>
                        <p className="detail-page-desc">{task.description}</p>
                    </Row>
                    <h4 className="detail-page-subtitle">
                        დავალების დეტალები
                    </h4>
                   <Container className="d-flex flex-column gap-5">
                       <Row className="align-items-center">
                           <Col className="p-0 col-4">
                               <div className="d-flex align-items-center gap-2">
                                   <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.2104 15.8901C20.5742 17.3946 19.5792 18.7203 18.3123 19.7514C17.0454 20.7825 15.5452 21.4875 13.9428 21.8049C12.3405 22.1222 10.6848 22.0422 9.12055 21.5719C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9583 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7706 2.169 10.1647C2.46804 8.55886 3.1559 7.05071 4.17245 5.77211C5.189 4.49351 6.50329 3.4834 8.0004 2.83008" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                   <span className="detail-page-span-text-gray">
                                       სტატუსი
                                   </span>
                               </div>
                           </Col>
                           <Col className="p-0 col-5">
                               <Dropdown>
                                   <Dropdown.Toggle
                                       variant="light"
                                       id="dropdown-basic"
                                       className="custom-dropdown w-100"
                                   >
                                       {statuses.find(status => status.id === selectedStatusId)?.name || 'სტატუსის არჩევა'}
                                   </Dropdown.Toggle>

                                   <Dropdown.Menu>
                                       {statuses.map((status: Status) => (
                                           <Dropdown.Item
                                               className="custom-dropdown-item"
                                               key={status.id}
                                               active={status.id === selectedStatusId}
                                               onClick={() => handleDropdownChange(status.id)}
                                           >
                                               {status.name}
                                           </Dropdown.Item>
                                       ))}
                                   </Dropdown.Menu>
                               </Dropdown>

                           </Col>

                       </Row>
                       <Row className="align-items-center">
                           <Col className="p-0 col-4">
                               <div className="d-flex align-items-center gap-2">
                                   <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19 22V20C19 18.9391 18.5786 17.9217 17.8284 17.1716C17.0783 16.4214 16.0609 16 15 16H7C5.93913 16 4.92172 16.4214 4.17157 17.1716C3.42143 17.9217 3 18.9391 3 20V22" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                   </span>
                                   <span className="detail-page-span-text-gray">
                                        თანამშრომელი
                                   </span>
                               </div>
                           </Col>
                           <Col className="p-0 col-5">
                                <Row className="align-items-center position-relative">
                                    <Col className="col-2">
                                        <Image className="detail-page-icon" src={task.employee.avatar} />
                                    </Col>
                                    <Col>
                                        <span className="detail-page-employ-dep">{task.department.name}</span>
                                        <span className="detail-page-span-text">{task.employee.name} {task.employee.surname}</span>
                                    </Col>
                                </Row>
                           </Col>
                       </Row>
                       <Row className="align-items-center">
                           <Col className="p-0 col-4">
                               <div className="d-flex align-items-center gap-2">
                                    <span>
                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M8 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M3 10H21" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                         </svg>
                                    </span>
                                   <span className="detail-page-span-text-gray">
                                        დავალების ვადა
                                   </span>
                               </div>
                           </Col>
                           <Col className="col-5">
                                <span className="detail-page-span-text">
                                    {formattedDate}
                                </span>
                           </Col>
                       </Row>
                   </Container>
                </Col>
                <Col className="mt-5 mt-lg-0" xs={12} lg={6}>
                    <CommentsSection comments={comments} taskId={taskId ?? ''} />
                </Col>
            </Row>
        </Container>
    );
};

export default TaskDetail;
