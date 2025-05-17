import {  useNavigate } from 'react-router-dom';
import {  GoogleLogin } from '@react-oauth/google';

const  Login = () => {
    const navigate = useNavigate();
  
    const handleLogin = async (credentialResponse) => {
      const res = await fetch('http://localhost:5001/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      console.log('login',data)
      if (data.success) {
        // 👉 Lưu thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            // 👉 Chuyển sang trang chính
            navigate('/');
        } else {
            console.error('Đăng nhập thất bại:', data.message);
        }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login failed')} />
      </div>
    );
  }

  export default Login