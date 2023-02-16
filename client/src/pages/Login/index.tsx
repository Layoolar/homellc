import { useState } from 'react'
import LoginIllustration from '../../components/Icons/LoginIllustration'
import LogoIcon from '../../components/Icons/LogoIcon'
import Input from '../../components/Shared/Input'
import Button from '../../components/Shared/Button/Index'
import '../Login/login.scss'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const Index = () => {
  // const navigate = useNavigate()
  const initialValues = {
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

  const loginAction = (e: any) => {
    e.preventDefault();

    if(values.email === "" || values.password === "") {
//       toast.error('🦄 Wow so easy!', {
// position: "top-right",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// });
      toast.error("fields can't be empty")
    }

    // navigate('/dashboard')
  }

  

  return (
    <section className='login__wrapper'>
      <ToastContainer />
  
      <LogoIcon />
      
      <div className='login__content' >
        <LoginIllustration />
        <div>
         
          <h1>Welcome!</h1>
          <article>Enter details to login.</article>
          
          
          <form onSubmit={e => loginAction(e)}>
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
            
            <Button children={'Log In'} type="submit" background={'bg__cyan'} text_transform={'text__transform'} padding={'btn__padding'} />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Index