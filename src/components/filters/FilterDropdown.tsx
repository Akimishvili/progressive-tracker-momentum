import Dropdown from 'react-bootstrap/Dropdown';
import { ReactNode } from 'react';

interface FilterDropdownProps {
    label: string;
    options?: string[];
    selected?: string | null;
    onSelect?: (option: string) => void;
    children?: ReactNode;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
                                                           label,
                                                           options = [],
                                                           selected,
                                                           onSelect,
                                                           children
                                                       }) => {
    return (
        <Dropdown className='filter-dropdown'>
            <Dropdown.Toggle className='dropdown-item'>
                {selected || label}
            </Dropdown.Toggle>

            <Dropdown.Menu className='dropdown-manu'>
                {/* If children exist, render them instead of options */}
                {children ? (
                    children
                ) : (
                    options.map((option, idx) => (
                        <Dropdown.Item key={idx} onClick={() => onSelect?.(option)}>
                            {option}
                        </Dropdown.Item>
                    ))
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropdown;
