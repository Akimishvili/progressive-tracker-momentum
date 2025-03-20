import { useState, useEffect } from "react";
import { Col, Row, Badge, Button, Container } from "react-bootstrap";
import FilterWrapper from "../components/filters/FilterWrapper.tsx";
import TaskList from "../components/tasks/TaskList.tsx";

const TaskDashboard = () => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);


    useEffect(() => {
        const savedDepartments = localStorage.getItem("selectedDepartments");
        const savedPriorities = localStorage.getItem("selectedPriorities");
        const savedEmployee = localStorage.getItem("selectedEmployee");

        if (savedDepartments) {
            setSelectedDepartments(JSON.parse(savedDepartments));
        }
        if (savedPriorities) {
            setSelectedPriorities(JSON.parse(savedPriorities));
        }
        if (savedEmployee) {
            setSelectedEmployee(savedEmployee);
        }
    }, []);

    const handleRemoveDepartment = (department: string) => {
        const newDepartments = selectedDepartments.filter((dep) => dep !== department);
        setSelectedDepartments(newDepartments);
        localStorage.setItem("selectedDepartments", JSON.stringify(newDepartments));
    };

    const handleRemovePriority = (priority: string) => {
        const newPriorities = selectedPriorities.filter((pri) => pri !== priority);
        setSelectedPriorities(newPriorities);
        localStorage.setItem("selectedPriorities", JSON.stringify(newPriorities));
    };

    const handleRemoveEmployee = () => {
        setSelectedEmployee(null);
        localStorage.removeItem("selectedEmployee");
    };

    const handleClearAllFilters = () => {
        setSelectedDepartments([]);
        setSelectedPriorities([]);
        setSelectedEmployee(null);

        // Clear localStorage
        localStorage.removeItem("selectedDepartments");
        localStorage.removeItem("selectedPriorities");
        localStorage.removeItem("selectedEmployee");
    };

    const hasFilters =
        selectedDepartments.length > 0 ||
        selectedPriorities.length > 0 ||
        selectedEmployee !== null;

    const activeFilters = [
        ...selectedDepartments.map((dep) => ({
            label: dep,
            onRemove: () => handleRemoveDepartment(dep),
            color: "primary",
        })),
        ...selectedPriorities.map((pri) => ({
            label: pri,
            onRemove: () => handleRemovePriority(pri),
        })),
        ...(selectedEmployee
            ? [
                {
                    label: selectedEmployee,
                    onRemove: handleRemoveEmployee,
                },
            ]
            : []),
    ];

    useEffect(() => {
        return () => {

            localStorage.removeItem("selectedDepartments");
            localStorage.removeItem("selectedPriorities");
            localStorage.removeItem("selectedEmployee");
        };
    }, []);

    return (
        <Container className="py-4">
            <Row>
                <Col className="p-0">
                    <h1 className="mb-4">დავალებების გვერდი</h1>
                </Col>
            </Row>

            <Row className="pb-4 px-0">
                <Col>
                    <FilterWrapper
                        key={
                            selectedDepartments.join(",") +
                            selectedPriorities.join(",") +
                            (selectedEmployee ?? "")
                        }
                        selectedDepartments={selectedDepartments}
                        setSelectedDepartments={setSelectedDepartments}
                        selectedPriorities={selectedPriorities}
                        setSelectedPriorities={setSelectedPriorities}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />
                </Col>
            </Row>

            {/* Filter Chips Section */}
            {hasFilters && (
                <Row className="mb-4">
                    <Col className="p-0">
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            {activeFilters.map((filter, index) => (
                                <Badge
                                    key={index}
                                    className={"d-flex align-items-center gap-2 p-2 filtered-btn"}
                                >
                                    {filter.label}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        role="button"
                                        style={{ cursor: "pointer" }}
                                        onClick={filter.onRemove}
                                    >
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </Badge>
                            ))}

                            <Button className="clear-btn" size="sm" onClick={handleClearAllFilters}>
                                გასუფთავება
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}

            {/* Task List */}
            <Row className="gap-4 mt-5">
                <TaskList
                    selectedDepartments={selectedDepartments}
                    selectedPriorities={selectedPriorities}
                    selectedEmployee={selectedEmployee}
                />
            </Row>
        </Container>
    );
};

export default TaskDashboard;
