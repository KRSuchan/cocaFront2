import React, { useEffect, useState } from 'react';
import styles from './css/GroupPage.module.css';
import { useNavigate } from 'react-router-dom';

import SelectedGroupInfo from './groupComp/selectedGroupInfo';
import CreateGroupPage from './groupComp/CreateGroupPage';
import axios from 'axios';
import { refreshAccessToken } from './security/TokenManage';
import Swal from 'sweetalert2';

//✨ 이 페이지 컴포넌트는 모두 groupComp에 있음
//✨ 관심분야 설정 -> PM에게 확인 예정임
//✨ 

const GroupPage = () => {

  const navigate = useNavigate(); 
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 생성 페이지 상태
  const [createGroupPage, setCreateGroupPage] = useState(false);

  // 그룹 목록 상태
  const [groups, setGroups] = useState([
    { groupId: 1, name: '재생산 스타디그룹', memberCount: 1009, admin: '니이모를찾아서', description: '이 스터디그룹에서 여러분의 공부를 더욱 북돋을 동료 재수생들과 함께 할 수 있어요!', hashtags: ['#IT', '#스터디'] },
    { groupId: 2, name: '리액트 개발자그룹', memberCount: 5388, admin: '관리자2', description: '그룹 설명...', hashtags: ['#웹개발', '#파이썬'] },
    { groupId: 3, name: 'Vue.js 개발자그룹', memberCount: 891, admin: '관리자3', description: '그룹 설명...', hashtags: ['#Vue', '#JavaScript'] },
  ]);

  // 해시태그 상태
  const [hashtags, setHashtags] = useState(['#IT', '#스터디', '#웹개발', '#파이썬']);
  const [selectedGroup, setSelectedGroup] = useState(null); //목록에서 선택된 그룹

  const handleBackClick = () => { // 뒤로가기 버튼
    navigate("/main");
  }

  // 해시태그 클릭 핸들러
  const handleHashtagClick = (hashtag) => { //해시태그 클릭할때
    setSearchTerm(hashtag);
  };

  const fetchTagList = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/tag/all");
      console.log(res.data);

      return res.data;
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTagList().then(res => {
      if(res.code === 200) {
        setHashtags(res.data.map(option => `#${option.name}`));
      } else {
        console.error('태그 정보 가져오기 실패');
      }
    })
  }, []);

  // TODO :: 페이지 검색 처리
  const searchGroupByTag = async(searchTag) => {
    const pageNum = 1;
    const accessToken = localStorage.getItem('accessToken');
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group/find/tag/${searchTag}/pageNum/${pageNum}`, config);
        console.log(res); 
        
        if(res.data.code === 200) {
          return res.data.data;
        }
        else if(res.data.code === 401) {
          await refreshAccessToken(navigate);
          searchGroupByTag(searchTag);
        }
        else {
          throw new Error('unknown Error');
        }
        
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "서버와의 통신에 문제가 생겼어요!",
        showConfirmButton: false,
        timer: 1500
      });
      return null;
    }
  }

  const searchGroupByName = async(searchText) => {
    const pageNum = 1;
    const accessToken = localStorage.getItem('accessToken');
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      };
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group/find/groupName/${searchText}/pageNum/${pageNum}`, config);
      console.log(res);

      if(res.data.code === 200) {
        return res.data.data;
      }
      else if(res.data.code === 401) {
        await refreshAccessToken(navigate);
        searchGroupByName(searchText);
      }
      else {
        throw new Error('unknown Error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "서버와의 통신에 문제가 생겼어요!",
        showConfirmButton: false,
        timer: 1500
      });
      return null;
    }
  }

  const searchGroup = async() => {
    let res;

    if(searchTerm.includes("#")) { // 태그 검색
      const match = searchTerm.match(/#([^\s]+)/)[1];
      console.log("matchText", match);
      res = await searchGroupByTag(match);
    } 
    else { // 일반 검색
      res = await searchGroupByName(searchTerm);
    }

    setGroups(res);

  }

  const handleSearchEnter = (event) => { // 22✅ 엔터 눌렀을때 [그룹 페이지] 
    if (event.key === 'Enter') {
      console.log('검색어:', searchTerm);
      // 여기에 검색을 처리하는 로직을 추가하세요.
      searchGroup();
    }
  };

    // 그룹 선택 핸들러
    const handleGroupSelect = (group) => { // 그룹선택시
        if(selectedGroup === group) {
          setSelectedGroup(null);
        } else {
          setSelectedGroup(group); 
          console.log('그룹 선택:', group.id);
        }
      };

  // 생성 버튼 핸들러
  const handleCreate = () => { // 생성 버튼 [그룹 페이지]
    setCreateGroupPage(!createGroupPage); //그룹 생성 페이지 띄움
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
          <button className={styles.groupCreateButton} onClick={handleCreate}>{createGroupPage? "닫기" : "생성"}</button>
        </div>
      <div className={styles.rightPanel}>

        {/* 우측 판넬의 내용 */}
        {createGroupPage ? (
          <CreateGroupPage />
        ) : selectedGroup ? (
          <SelectedGroupInfo
            groupId={selectedGroup.id}
          />
        ) : null}
        {/* 그룹 생성인가? 아니면 그룹 상세인가? */}
      </div>
    </div>
  );
};

export default GroupPage;
