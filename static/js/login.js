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

const myUrl = "http://localhost:4000"; // -> 개발용
// const myUrl = "3.36.49.113.nip.io"; // -> 배포용

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
  filterBooths();  // 초기 로딩에서도 필터링 적용
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
      return fetchWithAuth(`${myUrl}/manage/list`);
    } else {
      alert(data.message || "로그인 실패");
    }
  })
  .then(data => {
    if (data) {
      updateDOMAfterLogin(data);
    }
  })
  .catch((error) => console.error("Error:", error));
});

function updateDOMAfterLogin(data) {
  console.log(data);
  document.getElementsByClassName("logout")[0].classList.remove("hidden");
  document.getElementsByClassName("assigned_booth")[0].classList.remove("hidden");
  document.getElementsByClassName('login-container')[0].classList.add("hidden");
  if(!data.rank|| data.barcode) { // 부스 배정이 안된 경우
    document.getElementsByClassName("after_login")[0].classList.remove("hidden");
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

function filterBooths() {
  var selectedValue = document.getElementById('choices').value;
  var booths = document.querySelectorAll('.booth');

  booths.forEach(function(booth) {
      // 데이터 속성에서 booth의 카테고리를 확인하고, department가 '총학생회'가 아닌지도 체크합니다.
      if (booth.getAttribute('data-category') === selectedValue && booth.getAttribute('data-department') !== '총학생회') {
          booth.style.display = '';  // 카테고리가 일치하고, 총학생회가 아니면 보여줍니다.
      } else {
          booth.style.display = 'none';  // 그 외의 경우는 숨깁니다.
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.boothForm');

  forms.forEach(form => {
    const button = form.querySelector('.edit-button');
    button.addEventListener('click', function(event) {
      event.preventDefault(); // 기본 이벤트 방지

      const boothId = form.querySelector('[name="boothId"]').value;

      // fetchWithAuth 함수를 사용하여 데이터 전송
      fetchWithAuth('/manage/booth_linking', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `boothId=${encodeURIComponent(boothId)}`
      })
      .then(response => {
      })
      .then(data => {
        console.log(data);
        window.location.href = '/manage'; // 서버 응답 성공 후 페이지 리다이렉트
      })
      .catch(error => {
        console.error('Submission failed:', error);
        // 오류 처리 로직 추가
      });
    });
  });
});

