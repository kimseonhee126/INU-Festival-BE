// 토큰과 함께 요청을 보내는 함수
function axiosWithAuth(url, options = {}) {
  const authToken = localStorage.getItem('authToken');
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    }
  };

  const finalOptions = Object.assign({}, defaultOptions, options);
  finalOptions.headers = Object.assign({}, defaultOptions.headers, options.headers);

  return axios.get(url, finalOptions)
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response);
      }
      return response.data; // 서버로부터 받은 JSON 응답을 파싱
    });
}

// const myUrl = "http://localhost:4000"; // -> 개발용
const myUrl = "https://13.125.142.74.nip.io"; // -> 배포용

// 새로고침시 실행되는 함수
(function() {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    axiosWithAuth(`${myUrl}/manage/detail`)
      .then(data => {
        // 이름, 소속, 소개 입력창에 기존 정보를 미리 채워넣음
        document.getElementById("booth_name_input").value = data.booth.name;
        document.getElementById("booth_dep_input").value = data.booth.department;
        document.getElementById("booth_dis_input").value = data.booth.description;
        document.getElementById("booth_loc_input").value = data.booth.location;

        const img_box = document.getElementsByClassName("img_box")[0];

        // 기존 이미지들과 체크박스를 미리보기로 생성
        data.booth.boothImgs.forEach((img, index) => {
          const container = document.createElement("div");
          container.className = "img_container";
          const imageElement = document.createElement("img");
          imageElement.className = "real_img";
          imageElement.src = img.url;

          const deleteContainer = document.createElement("div");
          deleteContainer.className = "delete_container";

          const toDelete = document.createElement("div");
          toDelete.className = "to_delete";
          toDelete.innerHTML = "삭제";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "delete_img";
          checkbox.name = "deleteImgs";
          checkbox.value = img.id; // 이미지 ID를 값으로 설정

          container.appendChild(imageElement);
          deleteContainer.appendChild(toDelete);
          deleteContainer.appendChild(checkbox);
          container.appendChild(deleteContainer);
          img_box.appendChild(container);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
})();

// 사진 업로드 요청을 보내는 함수
function axiosWithAuthForUpload(url, formData, options = {}) {
  const authToken = localStorage.getItem('authToken');
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  const finalOptions = Object.assign({}, defaultOptions, options);
  finalOptions.headers = Object.assign({}, defaultOptions.headers, options.headers);

  return axios.post(url, formData, finalOptions)
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response);
      }
      return response.data; // 서버로부터 받은 JSON 응답을 파싱
    })
    .catch(error => {
      console.error('Upload Error:', error);
      throw error; // 오류를 던져서 외부에서 처리할 수 있도록 함
    });
}

// 수정 폼 제출 시 실행되는 함수
function submitForm() {
  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  // 체크된 이미지 ID들을 폼 데이터에 추가
  const deleteImgs = document.querySelectorAll(".delete_img:checked");
  let count = 0; 
  deleteImgs.forEach(img => {
    formData.append('deleteImgs', img.value);
    count++;
  });

  // 함수 호출
  axiosWithAuthForUpload('detail', formData)
    .then(data => {
      // 성공 후 처리, 예를 들어 페이지 리다이렉트
      window.location.href = '/manage';
    })
    .catch(error => {
      console.error('Upload Error:', error);
    });
}

// 사진 버튼 누르면 이미지 업로드 창 생성
function addImageInput() {
  const imgBox = document.querySelector(".img_box");
  const input = document.createElement("input");
  input.type = "file";
  input.name = "imgs";
  input.multiple = true;
  input.onchange = previewImages; // 파일 선택 시 미리보기 생성
  imgBox.appendChild(input);

  document.getElementsByClassName('add_img')[0].classList.add('hidden');
}


// 이미지 미리보기 해주는 함수
function previewImages() {
  const files = this.files;
  const imgBox = document.querySelector(".img_box");

  // 기존의 미리보기 이미지들을 제거
  const existingPreviews = document.querySelectorAll(".preview");
  existingPreviews.forEach(preview => preview.remove());

  // 선택된 각 파일에 대해 미리보기 이미지 생성
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "preview";
      img.style.width = "20rem"; // 미리보기 이미지 크기 설정
      imgBox.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function checkLength() {
    let textarea = document.getElementById('booth_dis_input');
    let counter = document.getElementById('textCounter');
    let maxLength = 900;
    let currentLength = textarea.value.length;

    if (currentLength > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
    }
    counter.innerHTML = `${currentLength} / ${maxLength}`;
}