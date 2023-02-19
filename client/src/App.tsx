


import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Suspense, useEffect } from 'react';
import Layout from './components/Layout/Index';
import { useSelector } from 'react-redux';





function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoutes(): JSX.Element {
  const userLoggedIn = useSelector((state: any) => state.authReducers.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/login');
    }
  }, [userLoggedIn, navigate]);

  return (
    <Layout>
      <Routes>
         <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} /> 
      </Routes>
    </Layout>
  );
}

export default App;












// function App(): JSX.Element {

//   // const renderLoader = () => <LoadingScreen />

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ToastContainer />
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Layout children={<Home />} />} />
//           <Route path="/home" element={<Layout children={<Home />} />} />
//         </Routes>
//       </Router>
//     </Suspense>
//   );
// };

// export default App;




