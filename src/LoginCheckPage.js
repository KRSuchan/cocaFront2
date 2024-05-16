import React, { useState } from 'react';
import { Button } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons'; // 아이콘 추가
import styles from './css/SettingPage.module.css'; // 스타일 시트 임포트
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginCheckPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        id: localStorage.getItem("userId"),
        password: '',
        profileImgPath: ''
    });

    const handleLogin = async () => {
        console.log(userInfo);

        try {
            const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/member/loginReq", {
                id: userInfo.id,
                password: userInfo.password
            });

            console.log(res);

            if(res.data) {
                console.log("success")
                navigate(`/setting`, { state: userInfo });
            } else {
                console.log("fail")
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "로그인 실패!",
                    text: "비밀번호가 달라요!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        navigate(-1);
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
                <h1 className={styles.title}>본인확인</h1>
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
                    <label>ID</label>
                    <input
                        type="text"
                        value={userInfo.id}
                        onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
                        className={styles.inputField}
                        disabled
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
                    <button className={styles.loginButton} onClick={handleLogin}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default LoginCheckPage;