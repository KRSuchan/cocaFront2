import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { UserOutlined, LeftOutlined, EditOutlined } from "@ant-design/icons"; // 아이콘 추가
import styles from "./css/SettingPage.module.css"; // 스타일 시트 임포트
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { refreshAccessToken } from "./security/TokenManage";
const SettingPage = () => {
  let { state } = useLocation();
  console.log("state", state);

  const [userInfo, setUserInfo] = useState({
    id: "defaultUser",
    password: "defaultPassword",
    id: state?.id || "defaultUser",
    password: state?.password || "defaultPassword",
    userName: "defaultUserName",
    profileImgPath:
      state?.profileImgPath ||
      "https://health.chosun.com/site/data/img_dir/2023/01/10/2023011001501_0.jpg",
    interest: [
      {
        tagId: 1,
        tagName: "콜라",
      },
      {
        tagId: 2,
        tagName: "코카콜라",
      },
      {
        tagId: 3,
        tagName: "코카콜라",
      },
    ],
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [originalProfileImgPath, setOriginalProfileImgPath] = useState("");
  const [interests, setInterests] = useState(["", "", ""]); // 관심사 상태 추가
  // 관심사 변경 처리 함수 추가
  const handleInterestChange = (index, event) => {
    const value = event.target.value;
    setInterests(prevInterests => {
      const newInterests = [...prevInterests];
      newInterests[index] = value;
      return newInterests;
    });
  };
  // 태그 리스트 상태 추가
  const [tagList, setTagList] = useState([]);
  // 태그 리스트 가져오기 함수 추가
  const fetchTagList = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/tag/all"
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (state === null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "잘못된 접근이에요!",
        showConfirmButton: false,
        timer: 1500,
      }).then(res => {
        navigate("/main");
      });
    }
  });
  useEffect(() => {
    fetchTagList().then(res => {
      if (res.code === 200) {
        setTagList(res.data.map(option => option));
      } else {
        console.error("태그 정보 가져오기 실패");
      }
    });
  }, []);
  useEffect(() => {
    setOriginalProfileImgPath(userInfo.profileImgPath);
  }, [userInfo.profileImgPath]);

  console.log(userInfo);
  const navigate = useNavigate();
  const handleProfileImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setProfileImageFile(file);
        setUserInfo({ ...userInfo, profileImgPath: reader.result });
        state.profileImgPath = reader.result; // Update state with new profile image
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfileEditClick = () => {
    setIsEditingProfile(true);
  };
  const handleProfileEditCancel = () => {
    setIsEditingProfile(false);
    setProfileImage(null);
    setProfileImageFile(null);
    setUserInfo(prevState => ({
      ...prevState,
      profileImgPath: originalProfileImgPath,
    }));
  };
  // 백엔드 API 호출을 위한 함수 선언 (현재는 더미 데이터 사용)
  const fetchUserInfo = async () => {
    // 백엔드에서 사용자 정보를 불러오는 로직 구현 예정
    // console.log("백엔드에서 사용자 정보를 불러오는 로직 구현 예정");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/member/memberInfoInquiryReq",
        {
          id: state.id,
          password: state.password,
        },
        config
      );
      console.log(res);
      if (res.data.code === 200) {
        return res.data.data;
      } else if (res.data.code === 401) {
        await refreshAccessToken(navigate);
        fetchUserInfo();
      } else {
        throw new Error("unknown Error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "서버와의 통신에 문제가 생겼어요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const updateMember = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      let data = userInfo;
      const interestData = interests
        .filter(item => item !== "")
        .map(item => {
          const tag = tagList.find(tag => tag.name === item);
          return tag ? { tagId: tag.id, TagName: tag.name } : null;
        })
        .filter(tag => tag !== null);
      if (userInfo.password === "") {
        console.log("pw blanked");
        data = {
          id: userInfo.id,
          password: state.password,
          userName: userInfo.userName,
          profileImageUrl:
            profileImageFile === null && !isEditingProfile
              ? userInfo.profileImgPath
              : "",
          interestId: interestData,
        };
        console.log("data", data);
      } else {
        data = {
          id: userInfo.id,
          password: userInfo.password,
          userName: userInfo.userName,
          profileImageUrl:
            profileImageFile === null && !isEditingProfile
              ? userInfo.profileImgPath
              : "",
          interestId: interestData,
        };
      }
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      } else {
        formData.append("profileImage", "[]");
      }
      console.log("pro", profileImageFile);
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/member/memberInfoUpdateReq",
        formData,
        config
      );
      console.log(res);
      if (res.data.code === 200) {
        state.password = data.password;
        state.profileImgPath = res.data.data.profileImgPath;
        setUserInfo({ ...userInfo, password: "" });
        return true;
      } else if (res.data.code === 401) {
        await refreshAccessToken(navigate);
        updateMember();
      } else {
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
        timer: 1500,
      });
    }
  };
  const handleUpdate = async () => {
    // 백엔드에 사용자 정보를 업데이트하는 로직 구현 예정
    // console.log("백엔드에 사용자 정보를 업데이트하는 로직 구현 예정");
    Swal.fire({
      icon: "question",
      title: "정보를 수정하시겠나요?",
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then(async res => {
      if (res.isConfirmed) {
        const res = await updateMember();
        if (res) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "정상적으로 변경되었어요!",
            showConfirmButton: false,
            timer: 1500,
          }).then(res => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            html: `변경 중 오류가 발생했어요!<br>잠시 후, 다시 한 번 시도해주세요!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "수정을 취소했어요.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const deleteMember = async password => {
    console.log("탈퇴 처리");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/member/withdrawalReq",
        {
          id: userInfo.id,
          password: password,
        },
        config
      );
      console.log(res);
      if (res.data.data) {
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
        timer: 1500,
      });
    }
  };
  const handleDelete = async () => {
    // 백엔드에 사용자 탈퇴 요청하는 로직 구현 예정
    // console.log("백엔드에 사용자 탈퇴 요청하는 로직 구현 예정");
    Swal.fire({
      icon: "warning",
      title: "회원탈퇴",
      html: `정말로 탈퇴할거에요?<br>탈퇴 시, 모든 정보가 사라져요!`,
      input: "password",
      inputPlaceholder: "비밀번호",
      showCancelButton: true,
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
      showLoaderOnConfirm: true,
      preConfirm: async password => {
        const res = await deleteMember(password);
        if (!res) {
          return Swal.showValidationMessage("비밀번호가 달라요!");
        }
        return res;
      },
    }).then(async res => {
      if (res.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "탈퇴완료",
          text: "다음에 또 방문해주세요!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "탈퇴를 취소했어요!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleBack = () => {
    navigate("/main");
  };
  useEffect(() => {
    const fetchData = async () => {
      if (state === null) return;
      const res = await fetchUserInfo();
      setUserInfo({
        id: res.id,
        password: "",
        userName: res.userName,
        profileImgPath: res.profileImgPath,
        interest: res.interest.map(item => item.tagName),
      });
      setInterests(res.interest.map(item => item.tagName));
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          {"<"}
        </button>
        <h1 className={styles.title}>내정보</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.profileImageContainer}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className={styles.profileImage}
            />
          ) : state?.profileImgPath ? (
            <img
              src={state.profileImgPath}
              alt="profile"
              className={styles.profileImage}
            />
          ) : (
            <UserOutlined style={{ fontSize: "150px" }} />
          )}
          <div className={styles.editIcon} onClick={handleProfileEditClick}>
            <EditOutlined style={{ fontSize: "24px" }} />
          </div>
          {isEditingProfile && (
            <div className={styles.profileEditContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              <button onClick={handleProfileEditCancel}>취소</button>
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label>닉네임</label>
          <input
            type="text"
            value={userInfo.userName}
            onChange={e =>
              setUserInfo({ ...userInfo, userName: e.target.value })
            }
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>비밀번호</label>
          <input
            type="password"
            value={userInfo.password}
            onChange={e =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>관심사</label>
          {interests.map((interest, index) => (
            <select
              key={index}
              id={`interest-${index}`}
              style={{ marginRight: "10px" }}
              value={interest}
              onChange={e => handleInterestChange(index, e)}
              required>
              <option value="" disabled>
                선택하세요
              </option>
              {tagList.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.updateButton} onClick={handleUpdate}>
            변경
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingPage;