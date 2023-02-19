import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const checkLogin = (WrappedComponent: React.ComponentType<any>) => {
  const WrapperComponent = (props: any) => {
    const userLoggedIn = useSelector((state: any) => state.authReducers.login.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if (!userLoggedIn) {
        navigate('/login');
      }
    }, [userLoggedIn, navigate]);

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default checkLogin;
