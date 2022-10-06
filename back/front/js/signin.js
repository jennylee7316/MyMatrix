const buttonSignin = document.getElementById("signin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

buttonSignin.addEventListener("click", signin);


// 로그인 처리 함수
async function signin(event) {
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;

    // 이메일이나 패스워드가 빈 값이면
    if(!currentEmail || !currentPassword) {
        return false;
    }

    // 로그인 api 요청
    const config = {
        method: "post",
        url: url + "/sign-in",
        data: {
            email: currentEmail,
            password: currentPassword
        }
    };

    try {
        // 비동기 처리
        const res = await axios(config);

        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        
        // 토큰 저장
        localStorage.setItem("x-access-token", res.data.result.token);

        alert(res.data.message);

        location.href = "index.html";
        
        return true;

    } catch (error) {
        console.error(err);
    }
}