import React from 'react';
import Form from 'react-bootstrap/Form';

interface CheckboxGroupProps {
  options: { name: string; surname: string; avatar: string }[] | string[];
  selected: string[];
  onChange: (option: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selected, onChange }) => {
  return (
      <Form>
        {options.map((option, idx) => {

          const label = typeof option === 'string' ? option : `${option.name} ${option.surname}`;
          const avatar = typeof option === 'string' ? null : option.avatar;

          return (
              <Form.Check
                  key={idx}
                  type="checkbox"
                  label={
                    <div className="d-flex align-items-center">
                      {avatar && <img src={avatar} alt={label} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />}
                      {label}
                    </div>
                  }
                  checked={selected.includes(label)}
                  onChange={() => onChange(label)}
                  className="mb-2 custom-checkbox"
              />
          );
        })}
      </Form>
  );
};

export default CheckboxGroup;
