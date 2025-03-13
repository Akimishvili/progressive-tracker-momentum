import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import FilterWrapper from "../components/filters/FilterWrapper.tsx";

const TaskDashboard = () => {
  return (
    <Container className='py-4'>
        <Row>
            <Col className='p-0'>
                <h1 className="mb-4">დავალებების გვერდი</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <FilterWrapper />
            </Col>
        </Row>
    </Container>
  )
}

export default TaskDashboard