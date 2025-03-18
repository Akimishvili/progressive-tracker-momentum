import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {schema} from "../schemas/validateTaskSchema.ts";
import Container from "react-bootstrap/Container";
import {Col, Form, Row} from "react-bootstrap";

const CreateTask = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            priority: "საშუალო",
            status: "დასაწყები",
            deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
    });

    // Watch live fields
    const titleValue = watch("title", "") ?? "";
    const descriptionValue = watch("description", "") ?? "";


    // Live validation checks
    const isTitleValid = titleValue.length >= 2 && titleValue.length <= 255;
    const isDescriptionValid = descriptionValue.length >= 2 && descriptionValue.length <= 255;


    // const [departments, setDepartments] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [statuses, setStatuses] = useState([]);

    const selectedDepartment = watch("department");




    const onSubmit = () => {
        console.log("ფორმა გაიგზავნა ✅");
    };

    return (
        <Container className="pt-4 pb-4">
        <div>
            <h3 className="detail-page-title fs-3">შექმენი ახალი დავალება</h3>
        </div>
        <Container className="create-task-form-container p-2">
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="justify-content-around">
                        <Col className="p-0 col-4">
                            <div>
                                {/* სათაური */}
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>სათაური *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register("title")}
                                        isInvalid={!!errors.title}
                                    />
                                    {/* Live validation messages */}
                                    <div>
                                        <small style={{ color: isTitleValid ? "green" : "#6C757D" }}>
                                            მინიმუმ 2 სიმბოლო
                                        </small>
                                    </div>
                                    <div>
                                        <small style={{ color: isTitleValid ? "green" : "#6C757D" }}>
                                            მაქსიმუმ 255 სიმბოლო
                                        </small>
                                    </div>

                                    {/* Backend error from yup */}
                                    {errors.description && (
                                        <div style={{ color: "red" }}>{errors.description.message}</div>
                                    )}

                                </Form.Group>
                            </div>

                            <div>
                                {/* აღწერა */}
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>აღწერა</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        {...register("description")}
                                        isInvalid={!!errors.description}
                                    />
                                    {/* Live validation messages */}
                                    <div>
                                        <small style={{ color: isDescriptionValid ? "green" : "#6C757D" }}>
                                            მინიმუმ 2 სიმბოლო
                                        </small>
                                    </div>
                                    <div>
                                        <small style={{ color: isDescriptionValid ? "green" : "#6C757D" }}>
                                            მაქსიმუმ 255 სიმბოლო
                                        </small>
                                    </div>

                                    {/* Backend error from yup */}
                                    {errors.description && (
                                        <div style={{ color: "red" }}>{errors.description.message}</div>
                                    )}

                                </Form.Group>
                            </div>

                            <div className="d-flex gap-4">
                                {/* პრიორიტეტი */}
                                <Form.Group className="mb-3" controlId="priority">
                                    <Form.Label>პრიორიტეტი *</Form.Label>
                                    <Form.Select
                                        {...register("priority")}
                                        isInvalid={!!errors.priority}
                                    >
                                        <option value="">აირჩიე პრიორიტეტი</option>
                                        <option value="დაბალი">დაბალი</option>
                                        <option value="საშუალო">საშუალო</option>
                                        <option value="მაღალი">მაღალი</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.priority?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* სტატუსი */}
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>სტატუსი *</Form.Label>
                                    <Form.Select
                                        {...register("status")}
                                        isInvalid={!!errors.status}
                                    >
                                        <option value="">აირჩიე სტატუსი</option>
                                        <option value="დასაწყები">დასაწყები</option>
                                        <option value="მიმდინარე">მიმდინარე</option>
                                        <option value="დასრულებული">დასრულებული</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </Col>

                        <Col className="p-0 col-6 d-flex flex-column justify-content-between">
                            <div className="w-75">
                                {/* დეპარტამენტი */}
                                <Form.Group className="mb-3" controlId="department">
                                    <Form.Label>დეპარტამენტი *</Form.Label>
                                    <Form.Select
                                        {...register("department")}
                                        isInvalid={!!errors.department}
                                    >
                                        <option value="">აირჩიე დეპარტამენტი</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.department?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="w-75">
                                {/* პასუხისმგებელი თანამშრომელი */}
                                <Form.Group className="mb-3" controlId="employee">
                                    <Form.Label>პასუხისმგებელი თანამშრომელი *</Form.Label>
                                    <Form.Select
                                        {...register("responsible")}
                                        disabled={!selectedDepartment}
                                    >
                                        <option value="">აირჩიე თანამშრომელი</option>

                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.responsible?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="w-50">
                                {/* დედლაინი */}
                                <Form.Group className="mb-3" controlId="deadline">
                                    <Form.Label>დედლაინი</Form.Label>
                                    <Form.Control
                                        type="date"
                                        {...register("deadline")}
                                        isInvalid={!!errors.deadline}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.deadline?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <div className="pb-4 d-flex justify-content-end">
                        <button type="submit" className="basic-btn btn-violent mt-2">დავალების შექმნა</button>
                    </div>
                </form>
            </div>
        </Container>
        </Container>
    );
};
export default CreateTask