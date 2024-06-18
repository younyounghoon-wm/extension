console.log("content script start");

function refreshPage() {
  location.reload();
}

const REFRESH_TIME = 1000 * 60 * 5;
const DOM_SELECT_TIME = 1000 * 3;

// 일정 주기마다 페이지 새로고침
setInterval(refreshPage, REFRESH_TIME); // 5분마다 새로고침 (300000 밀리초)

setTimeout(() => {
  console.log("DOM_SELECT_TIME");

  const $recentPosts = document
    .getElementById("mCSB_5_container")
    .querySelectorAll("ul > li");

  // 위메이드 소식
  const $wemadeNews = document
    .getElementById("mCSB_6_container")
    .querySelectorAll("ul > li");

  const posts = [...$recentPosts, ...$wemadeNews];
  const $newPosts = posts.filter((post) => post.classList.contains("new"));

  // 추가 조건들이 들어갈수 있음
  if ($newPosts.length === 0) {
    return;
  }

  const formattedPosts = $newPosts.map((post) => {
    const title = post.innerText.split("\n")[0];
    return { title };
  });

  chrome.runtime.sendMessage({ key: "new_posts", payload: formattedPosts });
}, DOM_SELECT_TIME);
