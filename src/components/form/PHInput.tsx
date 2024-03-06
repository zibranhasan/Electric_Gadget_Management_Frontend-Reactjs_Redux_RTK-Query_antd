// PHInput.jsx

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  value?: any; // Added value prop
  onChange?: (value: any) => void; // Added onChange prop
  disabled?: boolean;
};

const PHInput = ({
  type,
  name,
  label,
  value,
  onChange,
  disabled,
}: TInputProps) => {
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Controller
          name={name}
          render={({ field }) => (
            <Form.Item label={label}>
              <Input
                {...field}
                type={type}
                id={name}
                size="large"
                value={value} // Pass value prop
                onChange={(e) => onChange(e.target.value)} // Pass onChange prop
                disabled={disabled}
              />
            </Form.Item>
          )}
        />
      </div>
    </>
  );
};

export default PHInput;
