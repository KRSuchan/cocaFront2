import React, { useState } from 'react';
import styles from './css/GroupPage.module.css';
import { useNavigate } from 'react-router-dom';


const GroupPage = () => {

    const navigate = useNavigate(); 
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 그룹 목록 상태
  const [groups, setGroups] = useState([
    { name: '재생산 스타디그룹', memberCount: 1009, admin: '니이모를찾아서', description: '이 스터디그룹에서 여러분의 공부를 더욱 북돋을 동료 재수생들과 함께 할 수 있어요!', hashtags: ['#IT', '#스터디'] },
    { name: '리액트 개발자그룹', memberCount: 5388, admin: '관리자2', description: '그룹 설명...', hashtags: ['#웹개발', '#파이썬'] },
    { name: 'Vue.js 개발자그룹', memberCount: 891, admin: '관리자3', description: '그룹 설명...', hashtags: ['#Vue', '#JavaScript'] },
  ]);

  // 해시태그 상태
  const [hashtags, setHashtags] = useState(['#IT', '#스터디', '#웹개발', '#파이썬']);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMember, setIsMember] = useState(false); // 이미 참가된 그룹인지 여부

  // 해시태그 클릭 핸들러
  const handleHashtagClick = (hashtag) => {
    setSearchTerm(hashtag);
  };

  const handleSearchEnter = (event) => { // ✅ 엔터 눌렀을때
    if (event.key === 'Enter') {
      console.log('검색어:', searchTerm);
      // 여기에 검색을 처리하는 로직을 추가하세요.
    }
  };

  const handleCreate = () => { //✅ 그룹 생성 버튼 눌렀을떄
  }

  // 탈퇴 핸들러
  const handleLeave = () => { // ✅ 탈퇴버튼 눌렀을때
    // 백엔드에 탈퇴 요청을 보내는 로직
    console.log('Leaving group:', selectedGroup.name);
    // 예시로 console.log를 사용했습니다. 실제로는 여기에 API 호출을 넣으세요.
  };

  // 그룹 선택 핸들러
  const handleGroupSelect = (group) => { //✅ 그룹 선택 했을때
    setSelectedGroup(group);
    // 백엔드에 이미 참가된 그룹인지 확인하는 요청을 보내고
    // 결과에 따라 setIsMember를 업데이트하는 로직
    // 예시로 false를 설정했습니다. 실제로는 여기에 API 호출을 넣으세요.
    setIsMember(true);
  };


  const handleBackClick = () => { // 뒤로가기 버튼
    navigate("/main");
  }

// 참가 핸들러
const handleJoin = () => { // ✅ 참가버튼 눌렀을때
    // 백엔드에 참가 요청을 보내는 로직
    console.log('Joining group:', selectedGroup.name);
    };



  return (
    <div className={styles.groupPageContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.row}>
        <button className={styles.backButton} onClick={handleBackClick}>{'<'}</button>
          <span className={styles.groupSearchTitle}>그룹검색</span>
        </div>
        
        {/* 검색창 */}
        <div className={styles.searchBox}>
        <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchEnter}
            className={styles.searchInput}
            />
          {/* 해시태그 목록 */}
          <div className={styles.hashtags}>
            {hashtags.map((hashtag, index) => (
              <span key={index} className={styles.hashtag} onClick={() => handleHashtagClick(hashtag)}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* 그룹 목록 */}
        <div className={styles.groupList}>
          {groups.map((group, index) => (
       <div key={index} className={styles.groupItem} onClick={() => handleGroupSelect(group)}>
            <span className={styles.groupName}>{group.name}</span>
              <span className={styles.memberCount}>{group.memberCount}명</span>
            </div>
          ))}
        </div>
        <button className={styles.groupCreateButton} onClick={handleCreate}>생성</button>
      </div>
      <div className={styles.rightPanel}>
        {/* 우측 판넬의 내용 */}
        {selectedGroup && (
          <div className={styles.selectedGroupInfo}>
            <span className={styles.groupNameTitle}>{selectedGroup.name} </span>
            <span className={styles.memberCountInfo}>{selectedGroup.memberCount}명</span>
            <div className={styles.groupInfoBox}>
                <p className={styles.adminName}>[관리자] {selectedGroup.admin}</p>
            </div>
            <div className={styles.groupInfoBox}>
                <p className={styles.groupDescription}>{selectedGroup.description}</p>
                <div className={styles.groupHashtags}>
                {selectedGroup.hashtags.map((hashtag, index) => (
                    <span key={index} className={styles.hashtag}>{hashtag}</span>
                ))}
                </div>
            </div>
            {isMember ? (
              <button className={styles.joinButton} onClick={handleLeave}>탈퇴</button>
            ) : (
              <button className={styles.joinButton} onClick={handleJoin}>참가</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupPage;