chrome.runtime.onInstalled.addListener(() => {

  // storage: Same as local storage
  chrome.storage.sync.set({color: '#3aa757'}, () => {
    console.log('SET COLOR')
  });

  // declarativeContent: Decides when to activate the plugin
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});