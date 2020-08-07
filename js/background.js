var modes = {
  productivity: false,
  leisure: true,
  custom: false
};

var productivityPages = {
  home: false,
  channels: false,
  subscriptions: false,
  history: false,
  search: false,
  trending: false,
  related: false
};

chrome.runtime.onInstalled.addListener(function({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      modes: modes,
      pages: productivityPages,
      blockAds: true
    });
  }
});
