import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import FilterWrapper from "../components/filters/FilterWrapper.tsx";
import TaskList from "../components/tasks/TaskList.tsx";

const TaskDashboard = () => {
  return (
    <Container className='py-4'>
        <Row>
            <Col className='p-0'>
                <h1 className="mb-4">დავალებების გვერდი</h1>
            </Col>
        </Row>
        <Row className="pb-4 px-0">
            <Col>
                <FilterWrapper />
            </Col>
        </Row>
        <Row>
            <TaskList />
        </Row>
    </Container>
  )
}

export default TaskDashboard