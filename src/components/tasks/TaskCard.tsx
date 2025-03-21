import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";

import { departmentColors, departmentShortNames, priorityColors, statusColors } from "../../services/config.ts";
import {formatGeorgianDate, getColorFromMap, truncateDescription} from "../../services/helpers.ts";
import { Task } from "../../types/types.ts"

    ;
const TaskCard = ({ task }: { task: Task }) => {

    // Get the status color from the map based on task.status.id
    const statusColor = getColorFromMap(statusColors, task.status.id.toString());

    // Get the priority color from the map
    const priorityColor = getColorFromMap(priorityColors, task.priority.id.toString());

    // Get the department color from the map
    const departmentColor = getColorFromMap(departmentColors, task.department.id.toString());

    // Get the department's shortened name from the map
    const departmentShortName = departmentShortNames[task.department.id] || task.department.name;

    // Format the due date using the helper function
    const formattedDate = formatGeorgianDate(task.due_date);

    // Truncate the description using the helper function
    const description = truncateDescription(task.description);

    return (
        <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ borderColor: statusColor, padding: 20, marginBottom: 20 }}>

                <Card.Header className="task-card-header">
                    <Row className="align-items-center justify-content-between g-0 px-0">
                        <Col xs={12} md={8} className="d-flex align-items-center flex-lg-nowrap gap-2 ">
                            <Button
                                className="level-btn me-2 pe-none"
                                style={{
                                    '--bs-btn-border-color': priorityColor,
                                    color: priorityColor,
                                } as React.CSSProperties}
                            >
                                <img
                                    src={task.priority.icon}
                                    alt={task.priority.name}
                                    style={{ width: '16px', height: '18px', marginRight: '2px' }}
                                />
                                {task.priority.name}
                            </Button>

                            <Button
                                className="department-btn pe-none"
                                style={{
                                    backgroundColor: departmentColor,
                                    borderColor: departmentColor,
                                }}
                            >
                                {departmentShortName}
                            </Button>
                        </Col>

                        <Col s={12} md="auto" className="text-md-end">
                            <h4 className="due-date mb-0">{formattedDate}</h4>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body className='task-card-body pb-4 pt-4'>
                    <Card.Title className="task-card-title">{task.name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>

                <Card.Footer className='task-card-footer'>
                    <Row className="align-items-center">
                        <Col>
                            <span>
                                <Image className="task-avatar" src={task.employee.avatar} />
                            </span>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <span className="me-1">
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.08086 0.259766C1.87258 0.259766 0.880859 1.25148 0.880859 2.45977V13.0198C0.880859 14.228 1.87258 15.2198 3.08086 15.2198H4.88211C4.94227 15.7491 4.93539 16.239 4.79961 16.6498C4.63289 17.1551 4.3218 17.5796 3.74086 17.9285C3.57758 18.0316 3.50195 18.2293 3.5518 18.4149C3.60164 18.6005 3.76836 18.7329 3.96086 18.7398C5.82742 18.7398 7.96727 17.7652 9.04836 15.2198H18.9209C20.1291 15.2198 21.1209 14.228 21.1209 13.0198V2.45977C21.1209 1.25148 20.1291 0.259766 18.9209 0.259766H3.08086ZM3.08086 1.13977H18.9209C19.6496 1.13977 20.2409 1.73102 20.2409 2.45977V13.0198C20.2409 13.7485 19.6496 14.3398 18.9209 14.3398H8.80086C8.61695 14.3398 8.45195 14.4549 8.38836 14.6285C7.7043 16.4951 6.48227 17.3837 5.21211 17.7085C5.38398 17.4627 5.54727 17.2032 5.63836 16.9248C5.86695 16.2304 5.84805 15.4707 5.70711 14.6973C5.66758 14.4927 5.49055 14.3432 5.28086 14.3398H3.08086C2.35211 14.3398 1.76086 13.7485 1.76086 13.0198V2.45977C1.76086 1.73102 2.35211 1.13977 3.08086 1.13977Z" fill="#212529"/>
                                    </svg>
                                </span>
                                <span>{task.total_comments}</span>
                            </div>

                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Link>
    );
};

export default TaskCard;
