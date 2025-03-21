import { Col, Row } from "react-bootstrap";

import FilterDropdown from "./FilterDropdown";
import CheckboxGroup from "./CheckboxGroup";

import useFilters from "../../hooks/useFilters.ts";
import {FilterWrapperProps} from "../../types/types.ts";

const FilterWrapper = ({
                           setSelectedDepartments,
                           setSelectedPriorities,
                           setSelectedEmployee,
                       }: FilterWrapperProps) => {
    const {
        departments,
        priorities,
        employees,
        tempDepartments,
        setTempDepartments,
        tempPriorities,
        setTempPriorities,
        tempEmployee,
        setTempEmployee,
        saveFiltersToLocalStorage,
    } = useFilters();

    const handleApplyFilters = () => {
        setSelectedDepartments(tempDepartments);
        setSelectedPriorities(tempPriorities);
        setSelectedEmployee(tempEmployee);

        saveFiltersToLocalStorage();
    };

    const handleDepartmentChange = (option: string) => {
        setTempDepartments(
            tempDepartments.includes(option)
                ? tempDepartments.filter((item) => item !== option)
                : [...tempDepartments, option]
        );
    };

    const handlePriorityChange = (option: string) => {
        setTempPriorities(
            tempPriorities.includes(option)
                ? tempPriorities.filter((item) => item !== option)
                : [...tempPriorities, option]
        );
    };

    const handleEmployeeChange = (option: string) => {
        setTempEmployee(option === tempEmployee ? null : option);
    };

    return (
        <div className="filter-wrapper">
            <div className="filter-top">
                <Row className="w-50 filter-row">
                    <Col className="text-center">
                        <FilterDropdown
                            label="დეპარტამენტი"
                            options={departments}
                            selected={tempDepartments.join(", ")}
                            onSelect={handleDepartmentChange}
                            onApplyFilter={handleApplyFilters}
                        >
                            <CheckboxGroup
                                options={departments}
                                selected={tempDepartments}
                                onChange={handleDepartmentChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className="text-center">
                        <FilterDropdown
                            label="პრიორიტეტი"
                            options={priorities}
                            selected={tempPriorities.join(", ")}
                            onSelect={handlePriorityChange}
                            onApplyFilter={handleApplyFilters}
                        >
                            <CheckboxGroup
                                options={priorities}
                                selected={tempPriorities}
                                onChange={handlePriorityChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className="text-center">
                        <FilterDropdown
                            label="თანამშრომელი"
                            options={employees.map((emp) => `${emp.name} ${emp.surname}`)}
                            selected={tempEmployee}
                            onSelect={handleEmployeeChange}
                            onApplyFilter={handleApplyFilters}
                        >
                            <CheckboxGroup
                                options={employees}
                                selected={tempEmployee ? [tempEmployee] : []}
                                onChange={handleEmployeeChange}
                            />
                        </FilterDropdown>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default FilterWrapper;
