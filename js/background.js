var modes = {
  productivity: false,
  leisure: false,
  custom: true
};

var productivityPages = {
  home: false,
  channels: false,
  subscriptions: false,
  history: false,
  search: false,
  trending: false,
  related: true
};

chrome.runtime.onInstalled.addListener(function ({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      modes: modes,
      pages: productivityPages,
      blockAds: true
    });
  }
});
