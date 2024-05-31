import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons'; // 아이콘 추가
import styles from './css/SettingPage.module.css'; // 스타일 시트 임포트
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { refreshAccessToken } from './security/TokenManage';

const SettingPage = () => {
    let { state } = useLocation();
    console.log(state);

    const [userInfo, setUserInfo] = useState({
        id: 'defaultUser',
        password: 'defaultPassword',
        userName: 'defaultUserName',
        profileImgPath: ''
    });

    console.log(userInfo);

    const navigate = useNavigate();

    // 백엔드 API 호출을 위한 함수 선언 (현재는 더미 데이터 사용)
    const fetchUserInfo = async () => {
        // 백엔드에서 사용자 정보를 불러오는 로직 구현 예정
        // console.log("백엔드에서 사용자 정보를 불러오는 로직 구현 예정");

        const accessToken = localStorage.getItem('accessToken');

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/member/memberInfoInquiryReq", {
                id: state.id,
                password: state.password,
            }, config);

            console.log(res);

            if(res.data.code === 200) {
                return res.data.data;
            }
            else if(res.data.code === 401) {
                await refreshAccessToken(navigate);
                fetchUserInfo();
            } else {
                throw new Error('unknown Error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "에러!",
                text: "서버와의 통신에 문제가 생겼어요!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const updateMember = async () => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            let data = userInfo;

            if(userInfo.password === '') {
                console.log("pw blanked");
                data = {
                    id: userInfo.id,
                    password: state.password,
                    userName: userInfo.userName,
                    profileImgPath: userInfo.profileImgPath
                };
                console.log("data", data);
            }

            const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
            };

            const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/member/memberInfoUpdateReq", data, config);
            console.log(res);

            if(res.data.code === 200) {
                state.password = data.password;
                setUserInfo({...userInfo, password: ''});
                return true;
            }
            else if(res.data.code === 401) {
                await refreshAccessToken(navigate);
                updateMember();
            }
            else {
                // throw new Error('unknown Error');
                return false;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "에러!",
                text: "서버와의 통신에 문제가 생겼어요!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleUpdate = async () => {
        // 백엔드에 사용자 정보를 업데이트하는 로직 구현 예정
        // console.log("백엔드에 사용자 정보를 업데이트하는 로직 구현 예정");
        Swal.fire({
            icon: "question",
            title: "정보를 수정하시겠나요?",
            showCancelButton: true,
            confirmButtonText: "수정",
            cancelButtonText: "취소"
        }).then(async (res) => {
            if(res.isConfirmed) {
                const res = await updateMember();

                if(res) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "정상적으로 변경되었어요!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        html: `변경 중 오류가 발생했어요!<br>잠시 후, 다시 한 번 시도해주세요!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "수정을 취소했어요.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });

        
        
    };

    const deleteMember = async (password) => {
        console.log("탈퇴 처리");

        const accessToken = localStorage.getItem('accessToken');

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              };

        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/member/withdrawalReq", 
            {
                id: userInfo.id,
                password: password
            },
            config
        );

        console.log(res);

        if(res.data.data) {
            return res.data.data;
        } else if (res.data.code === 401) {
            await refreshAccessToken(navigate);
            deleteMember();
        }

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "에러!",
                text: "서버와의 통신에 문제가 생겼어요!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleDelete = async () => {
        // 백엔드에 사용자 탈퇴 요청하는 로직 구현 예정
        // console.log("백엔드에 사용자 탈퇴 요청하는 로직 구현 예정");
        Swal.fire({
            icon: "warning",
            title: "회원탈퇴",
            html: `정말로 탈퇴할거에요?<br>탈퇴 시, 모든 정보가 사라져요!`,
            input: 'password',
            inputPlaceholder: '비밀번호',
            showCancelButton: true,
            confirmButtonText: "탈퇴",
            cancelButtonText: "취소",
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
                const res = await deleteMember(password);
                if(!res) {
                    return Swal.showValidationMessage('비밀번호가 달라요!');
                }

                return res;
            }
        }).then(async (res) => {
            if(res.isConfirmed) {
                localStorage.clear();

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "탈퇴완료",
                    text: "다음에 또 방문해주세요!",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate("/");
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "탈퇴를 취소했어요!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    const handleBack = () => {
        navigate(-2);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUserInfo();
            setUserInfo({ 
                id: res.id, 
                password: '', 
                userName: res.userName, 
                profileImgPath: res.profileImgPath 
            });
        }

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
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


