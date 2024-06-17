console.log("content script start");

// 페이지 새로고침 함수
function refreshPage() {
  location.reload();
}

// 새로운 게시물이 있으면 className에 new가 추가되고 있음
function haveNewPost(elements) {
  return Array.from(elements).some((item) => item.classList.contains("new"));
}

const REFRESH_TIME = 1000 * 60 * 5;
const DOM_SELECT_TIME = 1000 * 3;

// 일정 주기마다 페이지 새로고침
setInterval(refreshPage, REFRESH_TIME); // 5분마다 새로고침 (300000 밀리초)

setTimeout(() => {
  const $recentPosts = document
    .getElementById("mCSB_5_container")
    .querySelectorAll("ul > li");

  // 위메이드 소식
  const $wemadeNews = document
    .getElementById("mCSB_6_container")
    .querySelectorAll("ul > li");

  if (haveNewPost($recentPosts) || haveNewPost($wemadeNews)) {
    chrome.runtime.sendMessage({ key: "new_post" });
  }
}, DOM_SELECT_TIME);
