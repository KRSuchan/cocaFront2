// SelectedGroupInfo.js
import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons'; // 사람 아이콘을 위한 import
import styles from '../css/GroupPage.module.css';
import axios from 'axios';

const SelectedGroupInfo = ({ groupId }) => {
  // 상태 관리를 위한 기본값 설정
  const [group, setGroup] = useState({
    id: 11,
    name: '수정NAME',
    admin: {
      id: 'TESTID1',
      userName: 'TESTNAME1',
      profileImgPath: 'https://file.instiz.net/data/file/20130117/a/6/e/a6e5e3521b4a120d81940cb69638c54b'
    },
    description: '테스트그룹 설명5',
    isPrivate: false,
    groupTags: [
      { id: 1, field: 'IT', name: '스프링' }
    ],
    memberCount: 2,
    isAdmin: false,
    isMember: false
  });
  const [isMember, setIsMember] = useState(false); // 가입여부
  const [isManager, setIsManager] = useState(true); // 관리자 여부를 상태로 관리

  const fetchGroupData = async() => {
    try {
      console.log(groupId);
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group/detail?memberId=${localStorage.getItem("userId")}&groupId=${groupId}`);
      console.log(res);

      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // 컴포넌트 마운트 시 백엔드에서 데이터를 가져오는 효과
  useEffect(() => { //✅ 그룹 상세정보 가져오면됨, 해당그룹 가입여부와 관리자여부는 백엔드측에서 추가해야 할듯
    // TODO: 백엔드에서 그룹 정보를 가져오는 로직 구현
    // fetchGroupInfo().then(data => setGroup(data));
    console.log('그룹 선택2:', groupId);
    const setData = async() => {
      const res = await fetchGroupData();
      setGroup(res);
      setIsMember(res.isMember);
      setIsManager(res.isAdmin);
    };

    setData();
  }, [groupId]);

  // 백엔드와 통신하여 그룹 참가 처리
  const handleJoinGroup = () => {
    // TODO: 백엔드에 그룹 참가 요청 로직 구현
    setIsMember(true);
  };

  // 백엔드와 통신하여 그룹 탈퇴 처리
  // const handleLeaveGroup = () => {
  //   // TODO: 백엔드에 그룹 탈퇴 요청 로직 구현
  //   setIsMember(false);
  // };

  return (
    <div className={styles.selectedGroupInfo}>
      <span className={styles.groupNameTitle}>{group.name}</span>
      <span className={styles.memberCountInfo}>{group.memberCount}명</span>
      <div className={styles.groupInfoBox} style={{ display: 'flex', alignItems: 'center' }}>
        {group.admin.profileImgPath ? (
          <img src={group.admin.profileImgPath} alt="관리자 사진" className={styles.adminProfileImage} style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }} />
        ) : (
          <UserOutlined style={{ fontSize: '50px', marginRight: '10px' }} />
        )}
        <p className={styles.adminName}>[관리자] {group.admin.userName}</p>
      </div>
      <div className={styles.groupInfoBox}>
        <p className={styles.groupDescription}>{group.description}</p>
        {/* 해시태그 배열을 처리하는 방식 변경 */}
        <div className={styles.groupHashtags}>
          {group.groupTags.map((tag) => (
            <span key={tag.id} className={styles.hashtag}>{tag.name}</span>
          ))}
        </div>
      </div>
      {isMember ? (
        // <button className={styles.joinButton} onClick={handleLeaveGroup}>탈퇴</button>
        null
      ) : (
        <button className={styles.joinButton} onClick={handleJoinGroup}>참가</button>
      )}
    </div>
  );
};

export default SelectedGroupInfo;
