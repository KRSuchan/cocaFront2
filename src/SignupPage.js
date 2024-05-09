import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/SignupPage.css'; // 스타일시트 임포트

function SignUpPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [interest, setInterest] = useState(''); // 단일 선택을 위해 배열에서 문자열로 변경
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  // 비밀번호 일치 확인
  const isPasswordMatch = () => {
    return password === confirmPassword;
  };

  // 회원가입 처리 함수
const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isPasswordMatch()) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreeToPolicy) {
      alert('정책에 동의해주세요.');
      return;
    }
    // 회원가입 API 호출
    try {
      navigate('/'); // 회원가입 성공 시 홈페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };
  
  // 관심사 변경 처리
  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  // 프로필 사진 변경 처리
  const handleProfilePhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>회원가입</h2>
        <div className="form-group">
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="interest">관심사</label>
          <select id="interest" value={interest} onChange={handleInterestChange} required>
            <option value="">선택하세요</option>
            <option value="computer">컴퓨터</option>
            <option value="anime">애니</option>
            <option value="employment">취업</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profilePhoto">프로필 사진</label>
          <input type="file" id="profilePhoto" onChange={handleProfilePhotoChange} />
        </div>
        <div className="policy-container">
          <h3>개인정보처리방침</h3>
          <div className="policy-box">
  {/* 개인정보처리방침 내용 */}
  <p><strong>개인정보 처리방침</strong></p>
  <p>본 COCA 서비스는 회원님의 개인정보를 소중히 다루며, 회원가입 시 제공하신 정보는 다음과 같은 목적으로 사용됩니다:</p>
  <ul>
    <li>서비스 제공: 회원님의 아이디, 비밀번호, 닉네임 등은 서비스 이용을 위해 필요한 최소한의 정보로 활용됩니다.</li>
    <li>일정 공유: 회원님이 공개하신 일정은 다른 회원, 그룹, 친구들과 공유될 수 있습니다. 이는 서비스의 핵심 기능 중 하나로, 회원 간의 소통과 협업을 촉진합니다.</li>
    <li>개인화된 경험: 회원님의 관심사에 기반하여 맞춤형 서비스를 제공합니다.</li>
  </ul>
  <p><strong>정보 보호 조치</strong></p>
  <ul>
    <li>모든 개인정보는 암호화되어 안전하게 저장됩니다.</li>
    <li>서버는 철저한 보안 조치를 통해 외부로부터의 접근을 차단합니다.</li>
  </ul>
  <p><strong>정보 공유 및 공개</strong></p>
  <ul>
    <li>회원님이 동의하지 않는 한, 개인정보는 제3자에게 공개되거나 공유되지 않습니다.</li>
    <li>공개된 일정은 회원님의 동의 하에 특정 사용자 또는 그룹과만 공유됩니다.</li>
  </ul>
  <p><strong>동의 철회</strong></p>
  <p>회원님은 언제든지 개인정보 처리에 대한 동의를 철회할 수 있으며, 이 경우 관련 서비스 이용에 제한이 있을 수 있습니다.</p>
  <p><strong>문의 및 변경</strong></p>
  <p>개인정보 처리방침에 대한 문의나 변경 요청은 언제든지 서비스 고객센터로 연락 주시기 바랍니다.</p>
  <p>본 개인정보 처리방침은 [24.06.01]에 마지막으로 업데이트되었습니다.</p>
</div>

          <label>
            <input type="checkbox" checked={agreeToPolicy} onChange={(e) => setAgreeToPolicy(e.target.checked)} />
            개인정보처리방침에 동의합니다.
          </label>
        </div>

        <button type="submit" className="signup-button">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;