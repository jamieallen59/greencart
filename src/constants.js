// Handles when to activate the plugin
export const ACTIVATE_PLUGIN_RULE = {
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