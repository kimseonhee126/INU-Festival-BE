// Auth 헤더를 포함한 fetch 함수
function fetchWithAuth(url, options = {}) {
  const authToken = localStorage.getItem('authToken');
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    }
  };

  const finalOptions = Object.assign({}, defaultOptions, options);
  finalOptions.headers = Object.assign({}, defaultOptions.headers, options.headers);

  return fetch(url, finalOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json(); // 서버로부터 받은 JSON 응답을 파싱
    });
}

// const myUrl = "http://localhost:4000"; // -> 개발용
const myUrl = "https://13.125.142.74.nip.io"; // -> 배포용

// 즉시 실행 함수 -> user/me API 호출 -> 자동로그인
(function() {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    fetchWithAuth(`${myUrl}/user/me`)
      .then((data) => {
        document.getElementsByClassName("student")[0].innerText = `${data.name} 님`;
        return fetchWithAuth(`${myUrl}/manage/list`);
      })
      .then(data => {
        updateDOMAfterLogin(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
})();

// 로그인 폼 제출 이벤트
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var studentId = document.getElementById("studentId").value;
  var password = document.getElementById("password").value;

  fetch(`${myUrl}/user/lms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId: studentId,
      password: password,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.accessToken) {
      localStorage.setItem('authToken', data.accessToken);
      document.getElementsByClassName("student")[0].innerText = `${data.studentId} 님`;
      return fetchWithAuth(`${myUrl}/manage/list`); // 개인정보에 대한 부스정보 가져오기
    } else {
      alert(data.message || "로그인 실패");
    }
  })
  .then(data => {
    if (data) {
      updateDOMAfterLogin(data); // 로그인성공 후 -> 부스등록유무에 따른 DOM 변경
    }
  })
  .catch((error) => console.error("Error:", error));
});

// 로그인성공 후 -> 부스등록유무에 따른 DOM 변경
function updateDOMAfterLogin(data) {
  document.getElementsByClassName("logout")[0].classList.remove("hidden");
  document.getElementsByClassName("assigned_booth")[0].classList.remove("hidden");
  document.getElementsByClassName('login-container')[0].classList.add("hidden");
  if(!data.rank) {
    document.getElementsByClassName("after_login")[0].classList.remove("hidden");

    if(data.barcode === 1) {
      document.getElementsByClassName("choices")[0].classList.add("hidden");
      document.getElementsByClassName("warning")[0].classList.add("hidden");
      document.getElementsByClassName("warning")[0].classList.add("hidden");

      const elements1 = document.getElementsByClassName("boothForm");
      for (let i = 0; i < elements1.length; i++) {
        elements1[i].classList.add("hidden");
      }

      const elements3 = document.getElementsByClassName("chong_edit_btn");
      for (let i = 0; i < elements3.length; i++) {
        elements3[i].classList.remove("hidden");
      }

      const elements2 = document.getElementsByClassName("chong_option");
      for (let i = 0; i < elements2.length; i++) {
        elements2[i].classList.remove("hidden");
      }
      filterBooths("비주점", 1);

      return;
    } else {
      filterBooths("비주점");
    }
  } else { // 부스 배정이 된 경우
    document.getElementsByClassName("my_booth_box")[0].classList.remove("hidden");
    document.getElementsByClassName("my_booth_name")[0].innerText = `${data.booth.name} | ${data.booth.department}`;
  }
}

// 로그아웃 함수
function logout() {
  fetchWithAuth(`${myUrl}/user/logout`)
    .then((data) => {
      if (data.success) {
        localStorage.removeItem('authToken');
        window.location.href = `${myUrl}/manage`;
      } else {
        alert(data.message || "로그아웃 실패");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function filterBooths(selectedValue, apple) {
  var selectedValue = document.getElementById('choices').value;

  var booths = document.querySelectorAll('.booth');
  booths.forEach(function(booth) {
      // 데이터 속성에서 booth의 카테고리를 확인합니다.

      if (apple === 1) { 
        if (booth.getAttribute('data-category') === selectedValue) {
          booth.style.display = '';  
        } else {
          booth.style.display = 'none';  
        }
        return;
      } else {
        if (booth.getAttribute('data-category') === selectedValue) {
          booth.style.display = '';  
        } else {
            booth.style.display = 'none';  
        }
        return;
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const boothId = urlParams.get('boothId');
  const category = urlParams.get('category');

  if (category) {
    const selectElement = document.getElementById('choices');
    selectElement.value = category; // URL에서 가져온 카테고리로 select 엘리먼트를 설정합니다.
    filterBooths(); // 필터링 함수를 호출하여 해당 카테고리의 부스만 표시합니다.
  }

  if (boothId) {
    const boothElement = document.querySelector(`input[name="boothId"][value="${boothId}"]`);
    if (boothElement) {
      boothElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally, highlight the booth
      const boothContainer = boothElement.closest('.booth_box');
      if (boothContainer) {
        boothContainer.style.border = "2px solid red"; // Highlighting the booth
      }
    }
  }

  const forms = document.querySelectorAll('.boothForm');

  forms.forEach(form => {
    const button = form.querySelector('.edit-button');
    button.addEventListener('click', function(event) {
      event.preventDefault(); // 기본 이벤트 방지

      const isConfirmed = confirm('지금 등록 이후 재등록이 불가합니다. 이 부스가 확실합니까?');
      if (!isConfirmed) {
        return; // 사용자가 취소를 누르면 작업을 중단
      }

      const boothId = form.querySelector('[name="boothId"]').value;

      // fetchWithAuth 함수를 사용하여 데이터 전송
      fetchWithAuth(`${myUrl}/manage/booth_linking`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `boothId=${encodeURIComponent(boothId)}`
      })
      .then(data => {
        console.log(data);
        if (data.success) {
          window.location.href = `${myUrl}/manage`; // 서버 응답 성공 후 페이지 리다이렉트
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Submission failed:', error);
        alert('오류가 발생했습니다: ' + error.message); // 오류 메시지 표시
      });
    });
  });
});

