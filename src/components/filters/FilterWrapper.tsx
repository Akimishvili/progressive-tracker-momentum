import { useState } from 'react';
import FilterDropdown from './FilterDropdown';
import CheckboxGroup from './CheckboxGroup';
import {Col, Row} from "react-bootstrap";

const FilterWrapper = () => {
    // const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="filter-wrapper">
            <div className="filter-top">
                <Row className='w-50 filter-row'>
                    <Col className='text-center'>
                        {/* Dropdown with checkboxes */}
                        <FilterDropdown label="დეპარტამენტი">
                            <CheckboxGroup
                                options={[
                                    'მარკეტინგის დეპარტამენტი',
                                    'დიზაინის დეპარტამენტი',
                                    'ლოგისტიკის დეპარტამენტი',
                                    'IT დეპარტამენტი',
                                ]}
                                selected={selectedOptions}
                                onChange={handleCheckboxChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className='text-center'>
                        {/* Regular Dropdowns */}
                        <FilterDropdown label="პრიორიტეტი">
                            <CheckboxGroup
                                options={[
                                    'მარკეტინგის დეპარტამენტი',
                                    'დიზაინის დეპარტამენტი',
                                    'ლოგისტიკის დეპარტამენტი',
                                    'IT დეპარტამენტი',
                                ]}
                                selected={selectedOptions}
                                onChange={handleCheckboxChange}
                            />
                        </FilterDropdown>
                    </Col>
                    <Col className='text-center'>
                        <FilterDropdown label="თანამშრომელი">
                            <CheckboxGroup
                                options={[
                                    'მარკეტინგის დეპარტამენტი',
                                    'დიზაინის დეპარტამენტი',
                                    'ლოგისტიკის დეპარტამენტი',
                                    'IT დეპარტამენტი',
                                ]}
                                selected={selectedOptions}
                                onChange={handleCheckboxChange}
                            />
                        </FilterDropdown>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default FilterWrapper;
