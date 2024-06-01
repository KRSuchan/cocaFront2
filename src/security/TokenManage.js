import axios from "axios";
import Swal from "sweetalert2";

export const refreshAccessToken = async (navigate) => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/jwt/reissue",
      null,
      config
    );

    console.log("refresh", response.data);

    if(response.data.code === 200) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
    } else {
        throw new Error('Token refresh Error');
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    // 로그아웃 처리 또는 다른 대응
    Swal.fire({
      icon: "error",
      title: "세션이 만료되었어요!<br>다시 로그인 해주세요!",
      confirmButtonText: "확인",
    }).then((res) => {
        // 통신 없이 로그아웃 처리(토큰만 삭제)
      localStorage.clear();
      navigate("/");
    });
  }
};

export const logout = async (navigate) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/member/logoutReq', null, config);
        console.log(res);
        if(res.data.code === 200) {
            localStorage.clear();
            navigate("/");
        }

        if(res.data.code === 401) {
            throw new Error('access code is Expired');
        }
    } catch (error) {
        console.error(error);

        await refreshAccessToken(navigate);

        logout(navigate);
    }
};

export const checkPassword = async (navigate, pw) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const data = {
      id: localStorage.getItem('userId'),
      password: pw
    }

    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/member/checkPassword", data, config);

    if(res.data.code === 200) {
      return res.data.data;
    }
    else if(res.data.code === 401) {
      await refreshAccessToken(navigate);
      checkPassword(navigate, pw);
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
  }
}