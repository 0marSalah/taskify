import React from 'react';
import '../styles/auth.scss';
import LinedEye from 'src/svg/LinedEye';
import NormalEye from 'src/svg/NormalEye';

type FormType = {
  name: string;
  email: string;
  password: string;
};

type InputType = {
  label: string;
  type: string;
  error: boolean;
  helperText: string;
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
};

const Input = ({
  label,
  type,
  error = false,
  helperText,
  formData,
  setFormData
}: InputType) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    helperText = '';
  };

  return (
    <div
      style={{
        marginBottom: '1rem'
      }}
    >
      <label htmlFor={label}>{label}</label>
      <div
        className={type.toLowerCase() === 'password' ? 'password-input' : ''}
      >
        <input
          onChange={(e) => handleChange(label.toLowerCase(), e.target.value)}
          type={showPassword ? 'text' : type}
          name={label}
          id={label}
          style={{
            border: error ? '1px solid var(--color-red)' : ''
          }}
        />
        {type.toLowerCase() === 'password' && (
          <div className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <LinedEye /> : <NormalEye />}
          </div>
        )}
      </div>
      {error && (
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-red)',
            marginBottom: '0rem',
            marginTop: '0.25rem',
            textTransform: 'capitalize'
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
