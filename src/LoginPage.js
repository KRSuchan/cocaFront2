import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 처리
    // 예: 입력된 userId와 password를 검증하는 로직
    // 로그인 성공 후 메인 페이지로 리다이렉트
    navigate('/');
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <input
        type="text"
        placeholder="ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="PW"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
