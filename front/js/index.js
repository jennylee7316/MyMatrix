setHeader();

// 네트워크 통신을 하기때문에 비동기화 함수로 처리
async function setHeader() {
    // 로컬스토리지에 토큰 존재 여부 검사
    const token = localStorage.getItem("x-access-token");

    // 토큰이 없다면 signed에 hidden 클래스 붙이기
    if(!token) {
        const signed = document.querySelector(".signed");
        signed.classList.add("hidden");
        return;
    }

    const config = {
        method: "get",
        url: url + "/jwt",
        //headers에 토큰 보낸다
        headers: {
            "x-access-token": token
        }

    }
    const res = await axios(config);

    if(res.data.code !==200) {
        // 서버 로그를 남긴다 거나 기타 등등 보안적 조치를 할 수 있다
        // 하지만 프로젝트에서는 그렇게 까지 하지 않고 넘어갈 것
        // console.log("잘못된 토큰입니다.");
        alert("잘못된 토큰입니다.");
        return;
    }
    
    const nickname = res.data.result.nickname;
    const spanNickname = document.querySelector("span.nickname");
    spanNickname.innerText = nickname;

    // 토큰이 있다면 unsigned에 hidden 클래스 붙이기
    const unsigned = document.querySelector(".unsigned");
    unsigned.classList.add("hidden");
}


// ############### 로그아웃 기능
const buttonSignout = document.getElementById("sign-out");
buttonSignout.addEventListener("click", signout);

function signout() {
    localStorage.removeItem("x-access-token");
    location.reload();
}