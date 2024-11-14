import SignupForm from './components/SignUp.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignInForm from './components/SignIn.js';
import Products from './components/Product.js'
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = (success) => {
    if (success) setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm onSignIn={handleSignIn} />}/>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/products" element={isAuthenticated ? <Products/> : <Navigate to="/signin" />}/>
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
