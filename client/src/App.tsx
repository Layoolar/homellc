


import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Suspense} from 'react';
import Layout from './components/Layout/Index';
import NotFound from './pages/NotFound'

function App(): JSX.Element {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout children={<Home />} />} />
          <Route path="/home" element={<Layout children={<Home />} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;




