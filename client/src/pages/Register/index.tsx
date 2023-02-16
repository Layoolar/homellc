import { useState } from 'react'
import LoginIllustration from '../../components/Icons/LoginIllustration'
import LogoIcon from '../../components/Icons/LogoIcon'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button/Index'
import '../Register/register.scss'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const Index = () => {
  // const navigate = useNavigate()
   const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const [values, setValues] = useState<any>(initialValues);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');

  const onHandleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleToggle = () => {
    if(inputType === "password") {
        setInputType('text')
        setIsVisible(!isVisible)
    } else {
      setInputType('password')
      setIsVisible(!isVisible)
    }
  }

  const registerAction = (e: any) => {
    e.preventDefault();

    if(values.email === "" || values.password === "" ||
    values.confirmPassword === "" || values.firstName === "" ||
    values.lastName === "" ) {
      toast.error("fields can't be empty")
    }

    // navigate('/dashboard')
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
          
          
          <form onSubmit={e => registerAction(e)}>
            <Input
              name={'firstName'}
              value={values.firstName}
              type='text'
              onHandleInputChange={(e) => onHandleInputChange(e)}
              placeholder={'First Name'}
              input__class={'input__styles'}
            />
            <Input
              name={'lastName'}
              value={values.lastName}
              type='text'
              onHandleInputChange={(e) => onHandleInputChange(e)}
              placeholder={'Last Name'}
              input__class={'input__styles'}
            />
            <Input
              name={'email'}
              value={values.email}
              type='email'
              onHandleInputChange={(e) => onHandleInputChange(e)}
              placeholder={'Email'}
              input__class={'input__styles'}
            />
            <Input
              name={'password'}
              value={values.password}
              type={inputType}
              onHandleInputChange={(e) => onHandleInputChange(e)}
              placeholder={'Password'}
              input__class={'input__styles'}
              variable_x={!isVisible ? 'SHOW' : 'HIDE'}
              onClick={handleToggle}
              component__wrap={'password__styles'}
            />
            
            <Button children={'Register'} type="submit" background={'bg__cyan'} text_transform={'text__transform'} padding={'btn__padding'} />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Index