// React 코드
import React, { useState } from 'react';
import './css/GroupPage.css';

const GroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null); // selectedGroup 상태 추가
  const [groups, setGroups] = useState([
    { id: 1, name: '그룹명1', members: 1009, admin: '관리자1', description: '설명1' },
    { id: 2, name: '그룹명2', members: 1009, admin: '관리자2', description: '설명2' },
    { id: 3, name: '그룹명3', members: 1009, admin: '관리자3', description: '설명3' },
    // ...더 많은 그룹 데이터
  ]);

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // 그룹을 클릭했을 때 선택된 그룹을 설정하는 함수
  };

  return (
    <div className="group-search-container">
      <div className="left-column">
        <div className='row'>
            <button className="back-button">◁</button>
            <p className="group-search-title">그룹검색</p>
        </div>
        <input
          type="text"
          placeholder="#IT #스터디 #웹개발 #파이썬"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="tags">
          <span onClick={() => handleTagClick('#IT')}>#IT</span>
          <span onClick={() => handleTagClick('#스터디')}>#스터디</span>
          <span onClick={() => handleTagClick('#웹개발')}>#웹개발</span>
          <span onClick={() => handleTagClick('#파이썬')}>#파이썬</span>
        </div>
        <ul className="group-list">
          {groups.map((group) => (
            <li key={group.id} onClick={() => handleGroupClick(group)}>
              <span className="group-name">{group.name}</span>
              <span className="group-members">{group.members}명</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-column">
        <div className="group-details">
            {selectedGroup && (
            <>
                <h2>{selectedGroup.name}</h2>
                <p>관리자: {selectedGroup.admin}</p>
                <p>{selectedGroup.description}</p>
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
