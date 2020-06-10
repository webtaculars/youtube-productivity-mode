var pages = {
  home: true,
  channels: true,
  subscriptions: true,
  history: true,
  search: true,
  trending: true
};

chrome.storage.sync.get(["pages", "blockAds"], function(storage) {
  Object.keys(storage.pages).map(item => {
    if (storage.pages[item]) blur(item, "10px");
  });
  console.log(storage.blockAds);
  if (storage.blockAds) {
    enableBlockAds();
  }
});

var blur = (key, value) => {
  document.documentElement.style.setProperty(
    `--blur-value-${key}`,
    `blur(${value})`
  );
};

var enableBlockAds = () => {
  setInterval(() => {
    for (const button of document.getElementsByClassName(
      "ytp-ad-skip-button"
    )) {
      button.click();
    }
  }, 3000);
};
