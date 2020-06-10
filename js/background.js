var pages = {
  home: true,
  channels: false,
  subscriptions: false,
  history: false,
  search: false,
  trending: false
};

chrome.runtime.onInstalled.addListener(function({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      pages: pages,
      blockAds: true
    });
  }
});
