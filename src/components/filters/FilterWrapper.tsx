import {useEffect, useState} from 'react';
import FilterDropdown from './FilterDropdown';
import CheckboxGroup from './CheckboxGroup';
import {Col, Row} from "react-bootstrap";
import {apiToken, baseURL} from "../../services/config.ts";
import {Department, Priority} from "../../types/types.ts";

type FilterWrapperProps = {
    selectedDepartments: string[];
    setSelectedDepartments: (departments: string[]) => void;
    selectedPriorities: string[];
    setSelectedPriorities: (priorities: string[]) => void;
    selectedEmployee: string | null;
    setSelectedEmployee: (employee: string | null) => void;
};




const FilterWrapper = ({
                           selectedDepartments,
                           setSelectedDepartments,
                           selectedPriorities,
                           setSelectedPriorities,
                           selectedEmployee,
                           setSelectedEmployee,
                       }: FilterWrapperProps) => {
    const [departments, setDepartments] = useState<string[]>([]);
    const [priorities, setPriorities] = useState<string[]>([]);
    const [employees, setEmployees] = useState<{ name: string; surname: string; avatar: string }[]>([]);

    const [tempDepartments, setTempDepartments] = useState<string[]>(selectedDepartments);
    const [tempPriorities, setTempPriorities] = useState<string[]>(selectedPriorities);
    const [tempEmployee, setTempEmployee] = useState<string | null>(selectedEmployee);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch(`${baseURL}/departments`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setDepartments(data.map((d: Department) => d.name));
        };

        const fetchPriorities = async () => {
            const response = await fetch(`${baseURL}/priorities`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setPriorities(data.map((p: Priority) => p.name));
        };

        const fetchEmployees = async () => {
            const response = await fetch(`${baseURL}/employees`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setEmployees(data);
        };

        fetchDepartments();
        fetchPriorities();
        fetchEmployees();
    }, []);

    // Load saved filters from localStorage on page load
    useEffect(() => {
        const savedDepartments = localStorage.getItem('selectedDepartments');
        const savedPriorities = localStorage.getItem('selectedPriorities');
        const savedEmployee = localStorage.getItem('selectedEmployee');

        if (savedDepartments) {
            setTempDepartments(JSON.parse(savedDepartments));
        }
        if (savedPriorities) {
            setTempPriorities(JSON.parse(savedPriorities));
        }
        if (savedEmployee) {
            setTempEmployee(savedEmployee);
        }
    }, []);

    const handleApplyFilters = () => {
        setSelectedDepartments(tempDepartments);
        setSelectedPriorities(tempPriorities);
        setSelectedEmployee(tempEmployee);

        // Save the selected filters to localStorage
        localStorage.setItem('selectedDepartments', JSON.stringify(tempDepartments));
        localStorage.setItem('selectedPriorities', JSON.stringify(tempPriorities));
        if (tempEmployee) {
            localStorage.setItem('selectedEmployee', tempEmployee);
        } else {
            localStorage.removeItem('selectedEmployee');
        }
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
                <Row className='w-50 filter-row'>
                    <Col className='text-center'>
                        {/* Dropdown with checkboxes */}
                        <FilterDropdown label="დეპარტამენტი" options={departments} selected={tempDepartments.join(', ')} onSelect={handleDepartmentChange} onApplyFilter={handleApplyFilters}>
                            <CheckboxGroup
                                options={departments}
                                selected={tempDepartments}
                                onChange={handleDepartmentChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className='text-center'>
                        {/* Regular Dropdowns */}
                        <FilterDropdown label="პრიორიტეტი" options={priorities} selected={tempPriorities.join(', ')} onSelect={handlePriorityChange} onApplyFilter={handleApplyFilters}>
                            <CheckboxGroup
                                options={priorities}
                                selected={tempPriorities}
                                onChange={handlePriorityChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className='text-center'>
                        <FilterDropdown label="თანამშრომელი" options={employees.map(emp => `${emp.name} ${emp.surname}`)} selected={tempEmployee} onSelect={handleEmployeeChange} onApplyFilter={handleApplyFilters}>
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
