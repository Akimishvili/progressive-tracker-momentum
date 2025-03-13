import React from 'react';
import Button from 'react-bootstrap/Button';

interface FilterButtonProps {
    label: string;
    onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick }) => {
    return (
        <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" onClick={onClick}>
                {label}
            </Button>
        </div>
    );
};

export default FilterButton;
