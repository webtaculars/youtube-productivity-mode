var uncheckedPages = {
  home: false,
  channels: false,
  subscriptions: false,
  history: false,
  search: false,
  trending: false,
  related: false
};

var uncheckedModes = {
  productivity: false,
  leisure: false,
  custom: false
};

chrome.runtime.onMessage.addListener(changeValue);

function changeValue(message) {
  uncheckedModes[message.mode] = true;
  message.checkedValues.forEach(item => {
    uncheckedPages[item] = true;
  });

  Object.keys(uncheckedPages).forEach(item => {
    if (uncheckedPages[item] === true) {
      blur(item, "10px");
    } else if (uncheckedPages[item] === false) {
      blur(item, "0px");
    }
  });

  chrome.storage.sync.set({
    modes: uncheckedModes,
    pages: uncheckedPages,
    blockAds: message.blockAds
  });
  chrome.runtime.onMessage.removeListener(changeValue);
}
