// SelectedGroupInfo.js
import React, { useState, useEffect } from 'react';
import styles from '../css/GroupPage.module.css';

const SelectedGroupInfo = ({ groupId, onLeave, onJoin, onEdit }) => {
  // 상태 관리를 위한 기본값 설정
  const [group, setGroup] = useState({
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
      { id: 1, field: 'IT', name: '스프링' }
    ],
    memberCount: 2
  });
  const [isMember, setIsMember] = useState(false); // 가입여부
  const [isManager, setIsManager] = useState(true); // 관리자 여부를 상태로 관리

  // 컴포넌트 마운트 시 백엔드에서 데이터를 가져오는 효과
  useEffect(() => {
    // TODO: 백엔드에서 그룹 정보를 가져오는 로직 구현
    // fetchGroupInfo().then(data => setGroup(data));
    console.log('그룹 선택2:', groupId);
  }, []);

  return (
    <div className={styles.selectedGroupInfo}>
      <span className={styles.groupNameTitle}>{group.name}</span>
      <span className={styles.memberCountInfo}>{group.memberCount}명</span>
      <div className={styles.groupInfoBox}>
        <p className={styles.adminName}>[관리자] {group.admin.userName}</p>
        {/* 관리자 프로필 이미지 추가 예정임*/}
      </div>
      <div className={styles.groupInfoBox}>
        <p className={styles.groupDescription}>{group.description}</p>
        {/* 해시태그 배열을 처리하는 방식 변경 */}
        <div className={styles.groupHashtags}>
          {group.hashtags.map((tag) => (
            <span key={tag.id} className={styles.hashtag}>{tag.name}</span>
          ))}
        </div>
      </div>
      {isMember ? (
        <button className={styles.joinButton} onClick={() => setIsMember(false)}>탈퇴</button>
      ) : (
        <button className={styles.joinButton} onClick={() => setIsMember(true)}>참가</button>
      )}
      {isManager && (
        <button className={styles.joinButton} onClick={onEdit}>수정</button>
      )}
    </div>
  );
};

export default SelectedGroupInfo;
