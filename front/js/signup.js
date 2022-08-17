// 입력값 유효성 겁사
//이메일
const inputEmail = document.getElementById("email");
const emailMessage = document.querySelector("div.email-message");
// 사용자가 input 할 때 계속 감지하여 체크 하고 callback함수 체크
inputEmail.addEventListener("input", isValidEmail);

// 비밀번호
const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input", isValidPassword);

// 비밀번호 확인
const inputPasswordConfirm = document.getElementById("password-confirm");
const passwordConfirmMessage = document.querySelector("div.password-confirm-message");
inputPasswordConfirm.addEventListener("input", isValidPasswordConfirm);

// 닉네임
const inputNickname = document.getElementById("nickname");
const nicknameMessage = document.querySelector("div.nickname-message");
inputNickname.addEventListener("input", isValidNickname);


// 이메일 형식 검사
function isValidEmail(event) {
    const currentEmail = inputEmail.value;
    const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailReg.test(currentEmail)) {
        emailMessage.style.visibility = "visible";
        return false;
    }
    emailMessage.style.visibility = "hidden";
    return true
}

// 비밀번호 형식 검사
function isValidPassword(event) {
    const currentPassqword = inputPassword.value;

    const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;

    if (!passwordReg.test(currentPassqword)) {
        passwordMessage.style.visibility = "visible";
        return false;
    }
    passwordMessage.style.visibility = "hidden";
    return true;
}

// 비밀번호 확인 검사
function isValidPasswordConfirm(event) {
    const currentPassqword = inputPassword.value;
    const currentPassqwordConfirm = inputPasswordConfirm.value;

    if(currentPassqword !== currentPassqwordConfirm) {
        passwordConfirmMessage.style.visibility = "visible";
        return false;
    }

    passwordConfirmMessage.style.visibility = "hidden";
    return true;

}

// 닉네임 검사
function isValidNickname(event) {
    const currentNickname = inputNickname.value;

    if(currentNickname.length < 2 || currentNickname.length > 10) {
        nicknameMessage.style.visibility = "visible";
        return false;
    }

    nicknameMessage.style.visibility = "hidden";
    return true;
}

// ########### 회원가입 요청
const buttonSignup = document.getElementById("signup");
buttonSignup.addEventListener("click", signup);


// async, await로 하는 법
async function signup(event) {
    const isValidReq = isValidEmail() && isValidPassword() && isValidPasswordConfirm() && isValidNickname();

    if(!isValidReq) {
        alert("회원 정보를 확인해주세요.");
        return false;
    }
    
    const currentEmail = inputEmail.value;
    const currentPassqword = inputPassword.value;
    const currentNickname = inputNickname.value;

    // html 구조상 common.js는 signup.js 위에 위치한다.
    // 그러한 이유로 url 변수를 사용할 수 있다.
    const config = {
        method: "post",
        url: url + "/user",
        data: {
            email: currentEmail,
            password: currentPassqword,
            nickname: currentNickname
        }  
    };
    try {
        const res = await axios(config);

        // response객체에 data의 code를 본다
        res.data.code
        if (res.data.code === 400) {
            alert(res.data.message);
            // 새로고침
            location.reload();
            return false;
        }

        if (res.data.code === 200) {
            alert(res.data.message);
            location.href = "signin.html";
            return true;
        }

        console.log(res);
    } catch (err) {
        console.error(err)
    }
    
}