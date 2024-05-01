import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="info-card">
        <h2>비인증자 차단</h2>
        <p>보안 인증된 회원만이, 모임에 참여할 수 있습니다!</p>
        <p>모임가입 시 신원인증하며, 이후 언제든지 확인할 수 있습니다.</p>
      </div>
      <div className="login-card">
        <div className="transparent-box">
          <input
            type="text"
            id="id"
            name="id"
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            id="pw"
            name="pw"
            placeholder="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button className="login-button" type="submit" onClick={handleLogin}>LOGIN</button>
            <button className="signup-button" type="submit">SIGN UP</button>
          </div>
        </div>
        <h1 className="right-aligned">COCA</h1>
      </div>
      
    </div>
  );
}

export default LoginPage;
