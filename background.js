console.log("background script start!!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("content script onMessage", request);

  const newPosts = request.payload;

  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "images/turi.png",
      title: "그룹웨어 푸시 알리미",
      message: `${newPosts[0].title} \n${newPosts.length}개의 새로운 게시물이 있습니다.`,
    },
    () => {}
  );
});
