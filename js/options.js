const applyChanges = () => {
  var checkedValues = document.querySelectorAll(".pages:checked");
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
          checkedValues: values
        });
        window.close();
      }
    );
  });
};

document.getElementById("applyButton").addEventListener("click", applyChanges);

chrome.storage.sync.get(["pages"], function(storage) {
  ["pages"].forEach(function(element) {
    document.getElementsByName(element).forEach(function(item) {
      if (storage.pages[item.value]) {
        item.checked = true;
      }
    });
  });
});
