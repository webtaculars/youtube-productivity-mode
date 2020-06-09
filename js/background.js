var pages = {
  home: true,
  channels: true,
  subscriptions: true,
  history: true
};

chrome.runtime.onInstalled.addListener(function({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      pages: pages,
      blockAds: true
    });
  }
});
