import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginIllustration from '../../components/Icons/LoginIllustration'
import LogoIcon from '../../components/Icons/LogoIcon'
import Button from '../../components/Shared/Button/Index'
import '../Register/register.scss'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { register, registrationSuccess, setSuccess, removeError } from '../../store/slices/auth/registerationSlice';
import { useAppDispatch } from '../../store/hooks';
import { useSelector } from 'react-redux';

interface RegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string().email('Email is invalid').required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
    .required('Please confirm your password'),
});



const Index = () => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const success = useSelector((state: any) => state.authReducers.register.success);
    const failed = useSelector((state: any) => state.authReducers.register.error);
  const initialValues: RegistrationValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

useEffect(() => {
   if (success) {
      toast.success("Registration successful!");
      navigate("/login");
      dispatch(setSuccess(false));
    } else if (failed) {
      toast.error(failed);
      dispatch(removeError())
    }
}, [success, failed, navigate, dispatch]);

    const handleSubmit = async (values: RegistrationValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    const { firstName, lastName, email, password } = values;
    await dispatch(register({firstName, lastName, email, password}));
    setSubmitting(false);
    resetForm();
  };

  const handleClick =() => {
    dispatch(removeError())
    navigate("/login")
  }
  

  return (
    <section className='register__wrapper'>
      <ToastContainer />
  
      <LogoIcon />
      
      <div className='register__content' >
        <LoginIllustration />
        <div>
         
          <h1>Welcome!</h1>
          <article>Enter details to register.</article>
          
          
          <Formik initialValues={initialValues} validationSchema={RegistrationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name='firstName'
                  type='text'
                  placeholder='First Name'
                  className='input__styles'
                  
                />
                <ErrorMessage name='firstName' render={msg => <div className="error">{msg}</div>} />

                <Field
                  name='lastName'
                  placeholder='Last Name'
                  type='text'
                  className='input__styles'

                />
                <ErrorMessage name='lastName' render={msg => <div className="error">{msg}</div>} />

                <Field
                  name='email'
                  placeholder='Email'
                  type='email'
                  className='input__styles'

                />
                <ErrorMessage name='email' render={msg => <div className="error">{msg}</div>} />

                <Field
                  name='password'
                  placeholder='Password'
                  type='password'
                  className='input__styles'

                />
                <ErrorMessage name='password' render={msg => <div className="error">{msg}</div>} />

                <Field
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  type='password'
                  className='input__styles'

                />
                <ErrorMessage name='confirmPassword' render={msg => <div className="error">{msg}</div>} />
                <div className='forgot__password'>
                  <a href="#" onClick={handleClick}>Already Have An Account?</a>
                </div>

                <Button children={'Register'} type="submit" background={'bg__cyan'} text_transform={'text__transform'} padding={'btn__padding'}
                 disabled={isSubmitting} 
                 />

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default Index