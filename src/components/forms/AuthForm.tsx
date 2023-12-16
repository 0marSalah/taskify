import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from 'src/utilities/fetcher';
import '../../styles/auth.scss';
import Input from '../Inputs/AuthInput';
import { setCookie } from 'src/utilities/cookie';
import { useAuth } from 'src/hooks/useAuth';
import LoadingButton from '../Loading';
import { Helmet } from 'react-helmet-async';

type AuthType = {
  form: 'signup' | 'signin';
};

const AuthForm = ({ form }: AuthType) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useAuth();

  const navigate = useNavigate();

  /**
   * - validate form data for both signup and signin
   * @param field: keyof typeof formData
   * @returns
   */
  const validateFormData = (field: keyof typeof formData) => {
    // checking if field is empty
    if (formData[field] === '') {
      setErrors((prev: any) => ({
        ...prev,
        [field]: `${field} is required`
      }));
      setLoading(false);
      return false;
    }

    // checking if email is valid
    if (
      !String(formData.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors((prev: any) => ({
        ...prev,
        email: 'email is not valid'
      }));
      setLoading(false);
      return false;
    }
    return true;
  };

  /**
   * - handle submit function for both signup and signin
   * @param {Event} e
   * @param {string} path
   */
  const handleSubmit = async (e: any, path: string) => {
    e.preventDefault();
    setErrors({
      name: '',
      email: '',
      password: ''
    });

    const isValidName = validateFormData('name');
    const isValidEmail = validateFormData('email');
    const isValidPassword = validateFormData('password');

    if (
      path === '/signup' &&
      (!isValidName || !isValidEmail || !isValidPassword)
    )
      return;
    if (path === '/signin' && (!isValidEmail || !isValidPassword)) return;

    try {
      setLoading(true);
      const body =
        path === '/signup'
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password
            }
          : {
              email: formData.email,
              password: formData.password
            };

      const res = await fetcher(path, 'POST', body);

      if (res.error) {
        setErrors({
          name: '',
          password: '',
          email: res.error
        });
        setLoading(false);
        return;
      }

      if (res.token) {
        setCookie(res.token);
        window.location.href = '/';
      }

      if (res.data) {
        setUser(res.data);
      }

      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {form.toString() === 'signup'
            ? 'Taskify | Signup'
            : 'Taskify | Signin'}
        </title>
        <meta
          name="description"
          content={
            form.toString() === 'signup' ? 'Signup | Signup' : 'Signin | Signin'
          }
        />
      </Helmet>
      <div className="logo">
        <img src={'/logo.png'} alt="taskify" />
        <h1>TASKIFY</h1>
      </div>
      <div className="auth-form">
        <h1>{form.toString() === 'signup' ? 'Signup' : 'Signin'}</h1>
        <form>
          {form.toString() === 'signup' && (
            <>
              <Input
                label="Name"
                type="text"
                error={!!errors.name}
                helperText={errors.name}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          )}
          <Input
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            formData={formData}
            setFormData={setFormData}
          />
          <Input
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            formData={formData}
            setFormData={setFormData}
          />
          <LoadingButton
            style={{
              background: 'none',
              border: 'none',
              padding: '0',
              marginBlock: '1rem'
            }}
            loading={loading}
            onClick={() => {}}
          >
            <input
              onClick={(e) => handleSubmit(e, '/' + form.toLowerCase())}
              type="submit"
              value={form.toString() === 'signup' ? 'Signup' : 'Signin'}
            />
          </LoadingButton>
        </form>
        <p className="reverse-link">
          <Link to={form.toLowerCase() === 'signup' ? '/signin' : '/signup'}>
            {form.toLowerCase() === 'signup'
              ? 'have account...? signin'
              : "did'nt have account...? Signup"}
          </Link>
        </p>
      </div>{' '}
    </>
  );
};

export default AuthForm;
