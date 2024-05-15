import React, { useState, useEffect } from 'react';
import styles from '../css/GroupPage.module.css';

const EditGroupPage = ({ closeEditingGroup, groupId }) => {
  // 기본값으로 설정할 그룹 정보
  const defaultGroup = {
    id: 11,
    name: '수정NAME',
    admin: {
      id: 'TESTID1',
      userName: 'TESTNAME1',
      profileImgPath: 'TESTURL1'
    },
    description: '테스트그룹 설명5',
    isPrivate: false,
    hashtags: [
      { id: 1, field: 'IT', name: '스프링' },
      { id: 2, field: 'IT', name: '리크' },
      { id: 3, field: 'IT', name: '자바' },
    ],
    memberCount: 2
  };

  // useState를 사용하여 기본값 설정
  const [groupName, setGroupName] = useState(defaultGroup.name);
  const [groupDescription, setGroupDescription] = useState(defaultGroup.description);
  const [managerIds, setManagerIds] = useState([defaultGroup.admin.id]);
  const [interests, setInterests] = useState(defaultGroup.hashtags.map(tag => tag.name));
  const interestOptions = ['Technology', 'Education', 'Health', 'Art', 'Sports']; // 예시 관심분야

  useEffect(() => {
    // TODO: 백엔드에서 groupId를 사용하여 그룹 정보를 가져오는 로직 구현

  }, [groupId]);

  const handleInterestChange = (index, value) => {
    setInterests(interests.map((interest, i) => (i === index ? value : interest)));
  };

      // Add a new handler for the delete action
      const handleDelete = () => { //✅ 삭제버튼
        closeEditingGroup();

      };

      const handleSave = () => { //✅ 저장버튼
        // TODO: 백엔드에 그룹 정보를 저장하는 로직 구현
        // saveGroupInfo({ groupName, groupDescription, managerIds, interests }).then(() => {
        //   // 성공적으로 저장되었을 때의 처리
        // });
        closeEditingGroup();
      };

      const handleCancel = () => { 
        closeEditingGroup();
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
      <button onClick={() => handleSave(groupName, groupDescription, managerIds, interests)} className={styles.joinButton}>
        저장
      </button>
      <button onClick={handleDelete} className={styles.joinButton}>
          삭제
        </button>
        <button onClick={handleCancel} className={styles.joinButton}>
          취소
        </button>
    </div>
  );
};

export default EditGroupPage;