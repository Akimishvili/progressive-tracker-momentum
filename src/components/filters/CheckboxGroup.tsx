import React from 'react';
import Form from 'react-bootstrap/Form';

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (option: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selected, onChange }) => {
  return (
      <Form>
        {options.map((option: string, idx: number) => (
            <Form.Check
                key={idx}
                type="checkbox"
                label={option}
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="mb-2"
            />
        ))}
      </Form>
  );
};

export default CheckboxGroup;
