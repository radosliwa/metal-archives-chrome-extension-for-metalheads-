chrome.browserAction.onClicked.addListener(working);
console.log('tab ',tab );
function working(tab){
  chrome.tabs.sendMessage(tab.id, "hello");
}