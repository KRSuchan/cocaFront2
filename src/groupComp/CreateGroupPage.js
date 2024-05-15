// CreateGroupPage.js
import React, { useState } from 'react';
import styles from '../css/GroupPage.module.css';

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [managerIds, setManagerIds] = useState(['', '']);
  const [interests, setInterests] = useState(['', '', '']);
  const interestOptions = ['Technology', 'Education', 'Health', 'Art', 'Sports']; // Example interests

  const handleCreateGroup = () => {
    // 백엔드에서 그룹 생성 로직을 구현할 예정입니다.
  };

  
  const handleInterestChange = (index, value) => {
    setInterests(interests.map((interest, i) => (i === index ? value : interest)));
  };

  return (
    <div className={styles.createGroupPageBox}>
        <span className={styles.groupNameTitle}>그룹생성</span>
        <div className={styles.createGroupPage}>
            <p className={styles.title2}>그룹 기본정보</p>
            <input
                type="text"
                placeholder="그룹 이름"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className={styles.input}
            />
            <textarea
                placeholder="그룹 설명"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className={styles.textarea}
            />
            <span className={styles.title2}>관리자</span>
            {managerIds.map((id, index) => (
                <input
                key={index}
                type="text"
                placeholder={`매니저 ID ${index + 1}`}
                value={id}
                onChange={(e) => {
                    const newManagerIds = [...managerIds];
                    newManagerIds[index] = e.target.value;
                    setManagerIds(newManagerIds);
                }}
                className={styles.input}
                />
            ))}
            <span className={styles.title2}>관심분야</span>
            {interests.map((interest, index) => (
                <select
                key={index}
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                className={styles.select}
                >
                <option value="">관심분야 선택</option>
                {interestOptions.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            ))}
            
            </div>
            <button onClick={handleCreateGroup} className={styles.joinButton}>
                추가
            </button>
    </div>
    
  );
};

export default CreateGroupPage;
