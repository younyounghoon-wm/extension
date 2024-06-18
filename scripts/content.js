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

  const $wemadeNews = document
    .getElementById("mCSB_6_container")
    .querySelectorAll("ul > li");

  const posts = [...$recentPosts, ...$wemadeNews];
  const $newPosts = posts.filter((post) => post.classList.contains("new"));

  // chrome storage에 저장된 마지막 게시물과 비교하여 새로운 게시물만 추출
  chrome.storage.local.get("viewedPosts", (result) => {
    const viewedPosts = result.viewedPosts || [];
    console.log("viewedPosts", viewedPosts);

    // 추가 조건들이 들어갈수 있음
    if ($newPosts.length === 0) {
      console.log("새로운 게시물이 없습니다. $newPosts.length === 0");
      return;
    }

    const formattedNewPosts = $newPosts.map((post) => {
      const title = post.innerText.split("\n")[0];
      return { title };
    });

    const viewedPostsTitles = viewedPosts.map((viewedPost) => viewedPost.title);

    const newPosts = formattedNewPosts.filter(
      (newPost) => !viewedPostsTitles.includes(newPost.title)
    );

    if (newPosts.length === 0) {
      console.log("새로운 게시물이 없습니다. newPosts.length === 0");
      return;
    }

    chrome.storage.local.set({ viewedPosts: [...viewedPosts, ...newPosts] });

    chrome.runtime.sendMessage({ key: "show_notification", payload: newPosts });
  });
}, DOM_SELECT_TIME);
