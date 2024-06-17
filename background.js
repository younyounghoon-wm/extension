console.log("background script start!!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("content script onMessage", request);
  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "images/hoon_icon.png",
      title: "그룹웨어 푸시 알리미",
      message: "새로운 게시물이 등록됐어요.",
    },
    () => {}
  );
});
