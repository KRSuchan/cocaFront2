import Swal from "sweetalert2";

export const showAxiosError = () => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "서버와의 통신에 문제가 생겼어요!",
        showConfirmButton: false,
        timer: 1500
    }).then(res => {
        window.location.reload();
    });
}

export const showLoginRequired = (navigate) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: "에러!",
        text: "로그인은 필수에요!",
        showConfirmButton: false,
        timer: 1500
    }).then(res => {
        navigate("/");
    });
}