import React, { useState } from 'react';
import './css/GroupPage.css';

const GroupPage = () => {
  const [hashtags, setHashtags] = useState(['#해시태그1', '#해시태그2', '#해시태그3']);
  const [groups, setGroups] = useState([
    { name: '재수생 스터디그룹', members: 1009 },
    { name: '리액트 개발자그룹', members: 5388 },
    { name: 'Vue.js 개발자그룹', members: 891 }
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="group-page">
      <div className="left-panel">
        <div className="header">
          <button className="back-button">뒤로가기</button>
          <h1 className="group-search">그룹검색</h1>
        </div>
        <div className="search-box">
          <i className="search-icon">🔍</i>
          <input type="text" className="search-editor" placeholder="검색..." />
        </div>
        <div className="hashtags">
          {hashtags.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>
        <div className="group-list">
          {groups.map((group, index) => (
            <div key={index} className="group-item" onClick={() => handleSelectGroup(group)}>
              <span className="group-name">{group.name}</span>
              <span className="group-members">{group.members}명</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="right-panel">
        {selectedGroup && (
          <>
            <div className="group-info">
              <h2 className="group-name">{selectedGroup.name}</h2>
              <span className="member-count">{selectedGroup.members}명</span>
            </div>
            <div className="group-details">
              {/* 여기에 관리자명, 해시태그, 그룹설명을 렌더링하는 코드가 들어갑니다 */}
            </div>
            <button className="join-button">참가하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupPage;
