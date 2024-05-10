// EditGroupPage.js
import React, { useState } from 'react';
import styles from '../css/GroupPage.module.css';

const EditGroupPage = ({ group, onSave, onDelete }) => {
  // Initialize state only if group properties are defined
  const [groupName, setGroupName] = useState(group?.name || '');
  const [groupDescription, setGroupDescription] = useState(group?.description || '');
  const [managerIds, setManagerIds] = useState(group?.admins || ['', '']);
  const [interests, setInterests] = useState(group?.interests || ['', '', '']);
  const interestOptions = ['Technology', 'Education', 'Health', 'Art', 'Sports']; // Example interests

  const handleInterestChange = (index, value) => {
    setInterests(interests.map((interest, i) => (i === index ? value : interest)));
  };

  // Ensure group properties are arrays before mapping
  const renderManagerInputs = () => {
    return Array.isArray(managerIds) && managerIds.map((id, index) => (
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
    ));
  };

  const renderInterestSelects = () => {
    return Array.isArray(interests) && interests.map((interest, index) => (
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
    ));
  };

    // Add a new handler for the delete action
    const handleDelete = () => {
        // Call the onDelete prop with the group's identifier
        onDelete(group.id);
      };

  return (
    <div className={styles.createGroupPageBox}>
      <span className={styles.groupNameTitle}>그룹 수정</span>
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
        {renderManagerInputs()}
        <span className={styles.title2}>관심분야</span>
        {renderInterestSelects()}
      </div>
      <button onClick={() => onSave(groupName, groupDescription, managerIds, interests)} className={styles.joinButton}>
        저장
      </button>
      <button onClick={handleDelete} className={styles.joinButton}>
          삭제
        </button>
    </div>
  );
};

export default EditGroupPage;