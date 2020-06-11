const applyChanges = () => {
  var checkedValues = document.querySelectorAll(".pages:checked");
  var blockAds = document.querySelectorAll(".blockAds:checked");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let values = [];
    for (let i = 0; i < checkedValues.length; i++) {
      values.push(checkedValues[i].value);
    }

    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: "js/content.js"
      },
      function() {
        chrome.tabs.sendMessage(tabs[0].id, {
          checkedValues: values,
          blockAds: blockAds[0].value === "enable" ? true : false
        });
        sendClickAnalytics(values, blockAds[0].value);
        setTimeout(() => {
          window.close();
        }, 200);
      }
    );
  });
};

document.getElementById("applyButton").addEventListener("click", applyChanges);

chrome.storage.sync.get(["pages", "blockAds"], function(storage) {
  document.getElementsByName("pages").forEach(function(item) {
    if (storage.pages[item.value]) {
      item.checked = true;
    }
  });

  document.getElementsByName("blockAds").forEach(function(item) {
    if (storage.blockAds) {
      if (item.value === "enable") {
        item.checked = true;
      }
    } else {
      if (item.value === "disable") {
        item.checked = true;
      }
    }
  });
});

var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-XXXXXXXXX"]);
_gaq.push(["_trackEvent", "option.html", "openPopup"]);

(function() {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

var sendClickAnalytics = (pages = [], blockAds) => {
  for (var i = 0; i < pages.length; i++) {
    _gaq.push(["_trackEvent", pages[i], "pageBlur"]);
  }
  _gaq.push(["_trackEvent", blockAds, "blockAds"]);
};
