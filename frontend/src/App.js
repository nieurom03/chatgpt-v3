// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/index'
import LoginPage from './pages/login'


export default function App() {
  return (
    <GoogleOAuthProvider clientId="158891073338-l2lvkj6jrt2fsd08atffvakpr584e2c1.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
