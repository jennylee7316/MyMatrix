// // 회원가입
// axios({
//     method: "post", //http 메소드를 의미 get, post 등
//     url: "http://127.0.0.1:3000/user", // url
//     headers: {}, //headers
//     data: {email: "test@naver.com", password: "aaaa1111", nickname: "짱구"}, //body에 들어가는 데이터
// })
// .then((res)=>{
//     console.log(res);
// }) // 성공시
// .catch((err)=>{
//     console.log(err);
// }); // 실패시



// //로그인
// axios({
//     method: "post", //http 메소드를 의미 get, post 등
//     url: "http://127.0.0.1:3000/sign-in", // url
//     headers: {}, //headers
//     data: {email: "test@naver.com", password: "aaaa1111"}, //body에 들어가는 데이터
// })
// .then((res)=>{
//     console.log(res);
// }) // 성공시
// .catch((err)=>{
//     console.log(err);
// }); // 실패시

async function dummy(){
	try{
		const res = await axios({
            method: "post", //http 메소드를 의미 get, post 등
            url: "http://127.0.0.1:3000/sign-in", // url
            headers: {}, //headers
            data: {email: "test@naver.com", password: "aaaa1111"}, //body에 들어가는 데이터
		});

		console.log(res);
	} catch(err){
		console.error(err);	
    }
}

dummy();