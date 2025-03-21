import { useState} from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";

import {FilterDropdownProps} from "../../types/types.ts";



const FilterDropdown: React.FC<FilterDropdownProps> = ({
                                                           label,
                                                           options = [],
                                                           selected,
                                                           onSelect,
                                                           onApplyFilter,
                                                           children
                                                       }) => {
    const [localSelected, setLocalSelected] = useState<string | null>(selected || null);

    console.log(localSelected)
    const handleItemClick = (option: string) => {
        setLocalSelected(option);
        if (onSelect) {
            onSelect(option);
        }
    };

    const handleApplyClick = () => {
        if (onApplyFilter) {
            onApplyFilter();
        }
    };

    return (
        <Dropdown className='filter-dropdown'>
            <Dropdown.Toggle className='dropdown-item'>
                {label}
            </Dropdown.Toggle>

            <Dropdown.Menu className='dropdown-manu'>
                {children ? (
                    children
                ) : (
                    options.map((option, idx) => (
                        <Dropdown.Item className="mb-2" key={idx} onClick={() => handleItemClick(option)}>
                            {option}
                        </Dropdown.Item>
                    ))
                )}
                <div className="dropdown-footer d-flex justify-content-end pt-4">
                    <Button className="btn comment-btn" onClick={handleApplyClick}>
                        არჩევა
                    </Button>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropdown;