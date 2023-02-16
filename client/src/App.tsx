


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Suspense } from 'react'
// import LoadingScreen from '../src/components/LoadingSreen/LoadingScreen';
import Layout from './components/Layout/Index';


function App() {

  // const renderLoader = () => <LoadingScreen />

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout children={<Home />} />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;




// import React, {FC} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { Login, Register, Home } from "./pages";
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import Hamburger from './components/Icons/Hamburger';
// // import Home from './pages/Home';

// function App(): JSX.Element {
//   return (
//       <Hamburger />
//     // <div>
//     //    <BrowserRouter>
//     //     <Route path="/login" element={<Login />} />
//     //     <Route path="/" element={<Login />} />
//     //     <Route path="/register" element={<Register />} />
//     //     {/* <Route path="/home" element={<Home />} /> */}
//     //   </BrowserRouter>
//     // </div>
//   );
// }

// export default App;
