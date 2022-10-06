// 조회 함수 호출
readTodo();

async function readTodo() {
    // 토큰이 없으면 return
    const token = localStorage.getItem("x-access-token");
    if (!token) {
        return;
    }

    // 일정 조회 API 호출하기
    const config = {
        method: "get",
        url: url + "/todos",
        headers: { "x-access-token": token }
    };
    try {
        const res = await axios(config);
        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        
        const todoDataSet = res.data.result;

        // in을 사용하면 안에 있는 key값들이 section으로 들어오게 된다
        for(let section in todoDataSet) {
            // section 은 do, decide, delete, delegate 나온다
            // 각 섹션에 해당하는 ul 태그 선택
            const sectionUl = document.querySelector(`#${section} ul`)
            
            // 각 센션에 해당하는 데이터
            const arrayForEachSection = todoDataSet[section];
            
            let result = "";
            // arrayForEachSection 하나하나 요소들이 todo로 대입 
            for(let todo of arrayForEachSection) {
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                    <div class="done-text-container">
                        <input type="checkbox" class="todo-done" ${todo.status === 'C' ? "checked" : ""} />
                        <p class="todo-text">
                            ${todo.contents}
                        </p>
                    </div>


                    <div class="update-delete-container">
                        <i class="todo-update fas fa-pencil-alt"></i>
                        <i class="todo-delete fas fa-trash-alt"></i>
                    </div>
                </li>
                `;
                result += element;
            }

            sectionUl.innerHTML = result;
        }

    } catch (err) {
        console.error(err);
        return false;
    }
};

// 일정 CUD
// 조회
// 이벤트 위임을 이용할 것. 전체 적용하여 가까운 부모찾기
const matrixContainer = document.querySelector(".matrix-container");
// console.log(matrixContainer);
// 엔터키 감지
matrixContainer.addEventListener("keypress", cudController);
matrixContainer.addEventListener("click", cudController);


function cudController(event){
    // 토큰이 없으면 return
    const token = localStorage.getItem("x-access-token");
    if (!token) {
        return;
    }
    // 이벤트 객체
    // key가 어느 것인지, type들을 return
    // console.log(event);
    // 이벤트 일어난 위치
    const target = event.target;

    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;

    // console.log(target, targetTagName, eventType, key );

    // create 이벤트 처리
    if(targetTagName === "INPUT" && key === "Enter") {
        createTodo(event, token);
        return;
    }

    // update 이벤트 처리
    // 체크박스 업데이트
    // console.log(target.className);
    if(target.className === "todo-done" && eventType === "click") {
        updateTodoDone(event, token);
        return;
    }

    // 컨텐츠 업데이트
    // console.log(target.className);
    const firstClassName = target.className.split(" ")[0];
    if (firstClassName === "todo-update" && eventType === "click") {
        updateTodoContents(event, token);
        return;
    }

    // delete 이벤트 처리
    if (firstClassName === "todo-delete" && eventType === "click") {
        deleteTodo(event, token);
        return;
    }

}

async function createTodo(event, token) {
    // 이벤트 타겟의 적혀 있는 내용을 가져와야 한다
    const contents = event.target.value;
    // closest(선택자) : 선택자에 부합하는 가장 가까운 부모 요소 반환
    const type = event.target.closest(".matrix-item").id;
    
    // contents가 비어 있다면
    if(!contents) {
        alert("내용을 입력해주세요.");
        return false;
    }

    const config = {
        method: "post",
        url: url + "/todo",
        headers: { "x-access-token": token},
        data: {
            contents: contents,
            type: type
        }
    }

    try {
        const res = await axios(config);

        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value = "";
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updateTodoDone(event, token) {
    // event.target.checked true, false체크박스 여부 return
    const status = event.target.checked ? "C" : "A";
    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: { "x-access-token": token},
        data: {
            todoIdx: todoIdx,
            status: status
        }
    }

    try {
        const res = await axios(config);

        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch (err) {
        console.error(err);
        return false;
    }

}

async function updateTodoContents(event, token) {
    const contents = prompt("내용을 입력해주세요.");
    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: { "x-access-token": token},
        data: {
            todoIdx: todoIdx,
            contents: contents
        }
    }

    try {
        const res = await axios(config);

        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteTodo(event, token) {
    const isValidReq = confirm("삭제하시겠습니까? 삭제 후에는 복구가 어렵습니다.");

    if (!isValidReq) {
        return false;
    }

    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "delete",
        url: url + "/todo/" + todoIdx, // `/todo/${todoIdx}` 이렇게 사용 해도 된다
        headers: { "x-access-token": token}
    }

    try {
        const res = await axios(config);

        if(res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch (err) {
        console.error(err);
        return false;
    }
}