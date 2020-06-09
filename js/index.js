var pages = {
  home: true,
  channels: true,
  subscriptions: true,
  history: true
};

chrome.storage.sync.get(["pages"], function(storage) {
  Object.keys(storage.pages).map(item => {
    if (storage.pages[item]) blur(item, "10px");
  });
});

var blur = (key, value) => {
  document.documentElement.style.setProperty(
    `--blur-value-${key}`,
    `blur(${value})`
  );
};
