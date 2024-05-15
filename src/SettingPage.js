import React, { useState } from 'react';
import { Button } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons'; // 아이콘 추가
import styles from './css/SettingPage.module.css'; // 스타일 시트 임포트

const SettingPage = () => {
    const [userInfo, setUserInfo] = useState({
        id: 'defaultUser',
        password: 'defaultPassword',
        userName: 'defaultUserName',
        profileImgPath: ''
    });

    // 백엔드 API 호출을 위한 함수 선언 (현재는 더미 데이터 사용)
    const fetchUserInfo = async () => {
        // 백엔드에서 사용자 정보를 불러오는 로직 구현 예정
        console.log("백엔드에서 사용자 정보를 불러오는 로직 구현 예정");
    };

    const handleUpdate = async () => {
        // 백엔드에 사용자 정보를 업데이트하는 로직 구현 예정
        console.log("백엔드에 사용자 정보를 업데이트하는 로직 구현 예정");
    };

    const handleDelete = async () => {
        // 백엔드에 사용자 탈퇴 요청하는 로직 구현 예정
        console.log("백엔드에 사용자 탈퇴 요청하는 로직 구현 예정");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton}>{'<'}</button>
                <h1 className={styles.title}>내정보</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.profileImageContainer}>
                    {userInfo.profileImgPath ? (
                        <img src={userInfo.profileImgPath} alt="profile" className={styles.profileImage} />
                    ) : (
                        <UserOutlined style={{ fontSize: '150px' }} />
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <label>닉네임</label>
                    <input
                        type="text"
                        value={userInfo.userName}
                        onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })}
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.updateButton} onClick={handleUpdate}>변경</button>
                    <button className={styles.deleteButton} onClick={handleDelete}>탈퇴</button>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;


