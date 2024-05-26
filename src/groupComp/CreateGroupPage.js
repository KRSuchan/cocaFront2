// CreateGroupPage.js
import React, { useState, useEffect } from 'react';
import styles from '../css/GroupPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [managerIds, setManagerIds] = useState(['', '']);
  const [interests, setInterests] = useState(['', '', '']);
  const [interestOptions, setInterestOptions] = useState([]); // 관심분야 옵션을 상태로 관리
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  // 백엔드에서 관심분야 목록을 가져오는 함수
  const fetchInterestOptions = async () => {
    // 백엔드 API 호출 로직 구현 예정

    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/tag/all");

      console.log("tag", res.data.data);

      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }

    // 임시 응답 데이터
    // return {
    //   code: 200,
    //   message: "OK",
    //   data: [
    //     { id: 1, field: "IT", name: "스프링" },
    //     { id: 2, field: "IT", name: "자바" },
    //     { id: 3, field: "IT", name: "리액트" },
    //     { id: 4, field: "IT", name: "자바스크립트" },
    //     { id: 5, field: "여행", name: "일본" },
    //     { id: 6, field: "여행", name: "미국" },
    //     { id: 7, field: "여행", name: "영국" },
    //     { id: 8, field: "여행", name: "호주" }
    //   ]
    // };
  };

  useEffect(() => {
    fetchInterestOptions().then(response => {
      if (response.code === 200) {
        setInterestOptions(response.data.map(option => option.name));
        setTags(response.data.map(option => option));
      } else {
        console.error('관심분야 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  const handleCreateGroup = async () => { //✅ 그룹생성버튼 눌렀을때
    const groupData = {
      member: {
        id: localStorage.getItem("userId") // TODO : 관리자 두명? -> 일단 처음 생성 시에는 생성하는 본인이 관리자가 되는 게 맞을 듯.
      },
      group: {
        name: groupName,
        description: groupDescription,
        privatePassword: null // TODO : 비밀번호 추가
      },
      groupTags: interests
        .filter(interest => interest)
        .map(interest => {
          const tag = tags.find(option => option.name === interest);
          console.log(tags);
          console.log("tagg", tag);
          return {
            tag: {
              id: tag.id,
              field: tag.field,
              name: tag.name
            }
          };
        })
    };

    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/group/add", groupData);
      if(res.data.code === 201) {
        navigate("/main");
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
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
                그룹생성
            </button>
    </div>
    
  );
};

export default CreateGroupPage;
