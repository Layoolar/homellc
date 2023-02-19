import { useState, useEffect } from 'react';
import LoginIllustration from '../../components/Icons/LoginIllustration'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LogoIcon from '../../components/Icons/LogoIcon'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button/Index'
import '../Login/login.scss'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { login } from "../../store/slices/auth/loginSlice";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from 'react-redux';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

interface LoginValues {
  email: string;
  password: string;
}

const Index = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const success = useSelector((state: any) => state.authReducers.login.isLoggedIn);
    const failed = useSelector((state: any) => state.authReducers.login.error);


    const initialValues: LoginValues = {
    email: "",
    password: "",
  };


  useEffect(() => {
   if (success) {
      toast.success("Login successful!");
      navigate("/home");
    } else if (failed) {
      toast.error(failed);
    }
}, [success, failed, navigate]);

 const handleSubmit = async (values: LoginValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
    try {      
      const { email, password } = values;
    await dispatch(login(values));
    } catch {
      toast.error("Incorrect email or password");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  

    // navigate('/dashboard')
  

  

  return (
    <section className='login__wrapper'>
      <ToastContainer />
  
      <LogoIcon />
      
      <div className='login__content' >
        <LoginIllustration />
        <div>
         
          <h1>Welcome!</h1>
          <article>Enter details to login.</article>
          
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name='email'
                  type='email'
                  placeholder='Email'
                  className ='input__styles'
                />
                <ErrorMessage name='email' render={msg => <div className="error">{msg}</div>} />

                <Field
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='input__styles'
                  
                />
                <ErrorMessage name='password' render={msg => <div className="error">{msg}</div>} />

                <div className='forgot__password'>
                  <a href="#">Forgot Password</a>

                </div>
                <div className='forgot__password'>
                  <a href="#">Don't Have An Account?</a>
                  
                </div>

                <Button children={'Log In'} type="submit" background={'bg__cyan'} text_transform={'text__transform'} padding={'btn__padding'}
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