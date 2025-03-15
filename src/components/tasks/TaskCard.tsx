import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Task } from "../../types/types.ts";
import {departmentColors, departmentShortNames, priorityColors, statusColors} from "../../services/config.tsx";


const TaskCard = ({ task }: { task: Task }) => {
    // Get the status color from the map based on task.status.id
    const statusColor = statusColors[task.status.id] || '#000'; // Default color if not found

    // Get the priority color from the map
    const priorityColor = priorityColors[task.priority.id] || '#000'; // Default color if not found

    // Get the department color from the map
    const departmentColor = departmentColors[task.department.id] || '#000'; // Default color if not found

    // Get the department's shortened name from the map
    const departmentShortName = departmentShortNames[task.department.id] || task.department.name; // Default to full name if not found

    // Format due_date (Convert to human-readable format)
    const formattedDueDate = new Date(task.due_date);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(formattedDueDate);

    return (
        <Card style={{ borderColor: statusColor, padding: 20}}>
            {/*<Card.Header className='task-card-header'>*/}
            {/*    <Row>*/}
            {/*        <Col className='col-9 p-0'>*/}
            {/*            <Row className="align-items-center justify-content-between">*/}
            {/*                <Col className='p-0 col-5'>*/}
            {/*                    <span>*/}
            {/*                        <Button*/}
            {/*                            className="level-btn"*/}
            {/*                            style={{*/}
            {/*                                '--bs-btn-border-color': priorityColor,  // Custom CSS variable*/}
            {/*                                color: priorityColor,*/}
            {/*                            } as React.CSSProperties}  // Cast to React.CSSProperties*/}
            {/*                        >*/}
            {/*                            <img*/}
            {/*                                src={task.priority.icon}*/}
            {/*                                alt={task.priority.name}*/}
            {/*                                style={{ width: '16px', height:'18px', marginRight:'2px' }}*/}
            {/*                            />*/}
            {/*                            {task.priority.name}*/}
            {/*                        </Button>*/}
            {/*                    </span>*/}
            {/*                </Col>*/}
            {/*                <Col className='p-0 col-5'>*/}
            {/*                  <span>*/}
            {/*                        <Button*/}
            {/*                            className="department-btn"*/}
            {/*                            style={{*/}
            {/*                                backgroundColor: departmentColor,*/}
            {/*                                borderColor: departmentColor,*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                           {departmentShortName}*/}
            {/*                        </Button>*/}
            {/*                </span>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Col>*/}
            {/*        <Col className='col-3 p-0'>*/}
            {/*            <span>*/}
            {/*                <h4 className='due-date'>{formattedDate}</h4>*/}
            {/*            </span>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Card.Header>*/}
            <div className="task-card-header">
                <Row>
                    <Col className="col-8">
                        <Row className="p-0">
                            <Col className="p-0">
                                 <Button
                                      className="level-btn"
                                                 style={{
                                                       '--bs-btn-border-color': priorityColor,  // Custom CSS variable
                                                                color: priorityColor,
                                                      } as React.CSSProperties}  // Cast to React.CSSProperties
                                                 >
                                                 <img
                                                       src={task.priority.icon}
                                                       alt={task.priority.name}
                                                       style={{ width: '16px', height:'18px', marginRight:'2px' }}
                                                 />
                                     {task.priority.name}
                                 </Button>
                            </Col>
                            <Col className="p-0">
                                <Button
                                    className="department-btn"
                                    style={{
                                        backgroundColor: departmentColor,
                                        borderColor: departmentColor,
                                    }}
                                >
                                    {departmentShortName}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-3">
                        <span className="due-date">22 იანვ,2025</span>
                    </Col>
                </Row>

            </div>
            <Card.Body className='task-card-body'>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='task-card-footer'>
                <Row>
                    <Col>
                        <span>Image</span>
                    </Col>
                    <Col>
                        <span>Comments</span>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default TaskCard;
