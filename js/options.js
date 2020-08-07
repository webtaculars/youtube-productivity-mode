const applyChanges = () => {
  var modes = document.querySelectorAll(".modes:checked");
  var checkedValues = document.querySelectorAll(".pages:checked");
  var blockAds = document.querySelectorAll(".blockAds:checked");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let mode = modes[0].value;

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
          mode: mode,
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

chrome.storage.sync.get(["modes"], function(storage) {
  document.getElementsByName("modes").forEach(function(item) {
    if (storage.modes[item.value]) {
      item.checked = true;
      applyMode(item.value);
    }
  });
});

var radios = document.getElementsByName("modes");
for (var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function() {
    applyMode(this.value);
  };
}

function applyMode(mode) {
  showModeText(mode);
  updateOptions(mode);
}

function updateOptions(mode) {
  if (mode === "productivity") {
    enableProductivityMode();
  } else if (mode === "leisure") {
    enableLeisureMode();
  } else {
    enableCustomMode();
  }
}

function enableProductivityMode() {
  document.getElementsByName("pages").forEach(function(item) {
    item.checked = true;
    item.disabled = true;
  });
  document.getElementsByName("blockAds").forEach(function(item) {
    if (item.value === "enable") {
      item.checked = true;
      item.disabled = true;
    } else {
      item.checked = false;
      item.disabled = true;
    }
  });
}

function enableLeisureMode() {
  document.getElementsByName("pages").forEach(function(item) {
    item.checked = false;
    item.disabled = true;
  });

  document.getElementsByName("blockAds").forEach(function(item) {
    if (item.value === "enable") {
      item.checked = true;
    } else {
      item.checked = false;
    }
    item.disabled = true;
  });
}

function enableCustomMode() {
  chrome.storage.sync.get(["pages", "blockAds"], function(storage) {
    document.getElementsByName("pages").forEach(function(item) {
      if (storage.pages[item.value]) {
        item.checked = true;
      } else {
        item.checked = false;
      }
      item.disabled = false;
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
      item.disabled = false;
    });
  });
}

function showModeText(mode) {
  if (mode === "productivity") {
    document.getElementById("modeText").innerText =
      "In Productivity Mode, all thumbnails will be blurred to reduce distractions. Switch to Leisure Mode to browse YouTube™ in the original way.";
  } else if (mode === "leisure") {
    document.getElementById("modeText").innerText =
      "In Leisure Mode, browse YouTube™ the way it is. Fun & Entertaining!";
  } else {
    document.getElementById("modeText").innerText =
      "In Custom Mode, you can customize the settings according to your personal needs.";
  }
}

var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-168746579-2"]);
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
