// Background.js runs when chrome starts up.
const redirectToAmazonSmile = info => {
  const { url } = info

  const smileUrl = url.replace('www', 'smile')

  return { redirectUrl: smileUrl };
}

const filters = {
  urls: [
    "*://www.amazon.co.uk/*",
    "*://www.amazon.com/*"	
  ],
  types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
}

chrome.runtime.onInstalled.addListener(() => {
  // storage: Same as local storage
  // chrome.storage.sync.set({color: '#3aa757'}, () => {
  //   console.log('SET COLOR')
  // });

  // https://stackoverflow.com/questions/12065029/redirecting-url-in-a-chrome-extension
  chrome.webRequest.onBeforeRequest.addListener(
    redirectToAmazonSmile,
    filters,
    ["blocking"]
  )

  // declarativeCon tent: Decides when to activate the plugin
  // Note: You should always register or unregister rules in bulk 
  // rather than individually because each of these operations 
  // recreates internal data structures. This re-creation is 
  // computationally expensive but facilitates a faster matching algorithm.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {

    const WHEN_TO_ACTIVATE_PLUGIN_RULE = {
      conditions: [
        // https://developer.chrome.com/extensions/declarativeContent#property-PageStateMatcher
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: '.amazon.'
          },
        })
      ],
      // Triggers page_action declared in manifest.json
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }

    chrome.declarativeContent.onPageChanged.addRules([
      WHEN_TO_ACTIVATE_PLUGIN_RULE
    ]);
  });
});