console.log("content script start");

// 페이지 새로고침 함수
function refreshPage() {
  console.log("refresh page");
  location.reload();
}

const REFREST_TIME = 1000 * 60 * 5;
const DOM_SELECT_TIME = 1000 * 3;

// 일정 주기마다 페이지 새로고침
setInterval(refreshPage, REFREST_TIME); // 5분마다 새로고침 (300000 밀리초)

// JS로 DOM을 만드는 시간이 있어서, setTimeout을 사용하여 DOM이 생성된 후에 실행되도록 함
setTimeout(() => {
  const $recentPostContainer = document.getElementById("mCSB_5_container");
  //   $recentPostContainer.style.backgroundColor = "red";
  console.log("recentPostContainer", $recentPostContainer);

  // service-worker로 메시지 보내기
  chrome.runtime.sendMessage({ key: "value" });
}, DOM_SELECT_TIME);
