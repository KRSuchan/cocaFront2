import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from '../css/GroupPage.module.css';

const EditGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  // 백엔드에서 그룹 정보를 가져오는 함수 (미구현 상태)
  const fetchGroupDetails = async (groupId) => { 
    // TODO: 백엔드 API 호출 로직 구현
    // 아래는 임시 응답 데이터
    return {
      code: 200,
      message: "OK",
      data: {
        groupId: 11,
        name: "수정NAME",
        description: "테스트그룹 설명5",
        privatePassword: null,
        groupTags: [
          { id: 1, field: "IT", name: "스프링" },
          { id: 2, field: "IT", name: "리액트" },
          { id: 3, field: "IT", name: "자바" }
        ],
        groupMembers: [
          { id: "TESTID1", userName: "TESTNAME1", profileImgPath: "TESTURL1" },
          { id: "TESTID2", userName: "TESTNAME2", profileImgPath: "TESTURL2" }
        ],
        groupManagers: [
          { id: "TESTID1", userName: "TESTNAME1", profileImgPath: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/35/23dc85ac1d8c845da121c12ff644d920_res.jpeg" },
          { id: "TESTID2", userName: "TESTNAME2", profileImgPath: null }
        ],
        groupNotice: "초기 공지사항"
      }
    };
  };

  // 백엔드에서 태그 목록을 가져오는 함수
  const fetchTags = async () => {
    // TODO: 백엔드 API 호출 로직 구현
    // 아래는 임시 응답 데이터
    return {
      code: 200,
      message: "OK",
      data: [
        { id: 1, field: "IT", name: "스프링" },
        { id: 2, field: "IT", name: "자바" },
        { id: 3, field: "IT", name: "리액트" },
        { id: 4, field: "IT", name: "자바스크립트" },
        { id: 5, field: "여행", name: "일본" },
        { id: 6, field: "여행", name: "미국" },
        { id: 7, field: "여행", name: "영국" },
        { id: 8, field: "여행", name: "호주" }
      ]
    };
  };

  // useState를 사용하여 그룹 정보 상태 관리
  const [groupDetails, setGroupDetails] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(groupId).then(response => {
        if (response.code === 200) {
          setGroupDetails(response.data);
        } else {
          console.error('그룹 정보를 가져오는데 실패했습니다.');
        }
      });
      fetchTags().then(response => {
        if (response.code === 200) {
          setAvailableTags(response.data);
        } else {
          console.error('태그 정보를 가져오는데 실패했습니다.');
        }
      });
    }
  }, [groupId]);

  const handleSave = () => {
    // TODO: 백엔드에 그룹 정보를 저장하는 로직 구현
    navigate(-1);
  };

  const handleDelete = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '50px 200px' }}> {/* 패딩 추가 */}
      <div className={styles.createGroupPageBox}>
        <span className={styles.groupNameTitle}>그룹 수정</span>
        <div className={styles.createGroupPage}>
          <p className={styles.title2}>그룹 기본정보</p>
          <input
            type="text"
            placeholder="그룹 이름"
            value={groupDetails.name}
            onChange={(e) => setGroupDetails({ ...groupDetails, name: e.target.value })}
            className={styles.input}
          />
          <textarea
            placeholder="그룹 설명"
            value={groupDetails.description}
            onChange={(e) => setGroupDetails({ ...groupDetails, description: e.target.value })}
            className={styles.textarea}
          />
          <textarea
            placeholder="공지사항"
            value={groupDetails.groupNotice}
            onChange={(e) => setGroupDetails({ ...groupDetails, groupNotice: e.target.value })}
            className={styles.textarea}
          />
          <p className={styles.title2}>그룹 매니저</p>
          <div className={styles.managersContainer} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', gap: '20px' }}>
            {groupDetails.groupManagers.map(manager => (
              <div key={manager.id} className={styles.managerInfo} style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                {manager.profileImgPath ? (
                  <img src={manager.profileImgPath} alt="매니저 사진" className={styles.managerImage} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <UserOutlined style={{ fontSize: '80px' }} />
                )}
                <span style={{ display: 'block', marginTop: '8px', fontWeight: 'bold', color: '#333' }}>{manager.userName}</span>
              </div>
            ))}
          </div>
          <p className={styles.title2}>그룹분야</p>
          {groupDetails.groupTags.map((tag, index) => (
            <select
              key={tag.id}
              value={tag.id}
              onChange={(e) => {
                const newTags = [...groupDetails.groupTags];
                const selectedTag = availableTags.find(t => t.id === parseInt(e.target.value));
                newTags[index] = selectedTag;
                setGroupDetails({ ...groupDetails, groupTags: newTags });
              }}
              className={styles.input}
            >
              {availableTags.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          ))}
        </div>
        <button onClick={handleSave} className={styles.joinButton}>
          저장
        </button>
        <button onClick={handleDelete} className={styles.joinButton}>
          삭제
        </button>
        <button onClick={handleCancel} className={styles.joinButton}>
          취소
        </button>
      </div>
    </div>
  );
};

export default EditGroupPage;
