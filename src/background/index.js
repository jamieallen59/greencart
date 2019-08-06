// Background.js runs when chrome starts up.
import { redirectToAmazonSmile } from '../utils/redirectToAmazonSmile.js'
import { ACTIVATE_PLUGIN_RULE } from '../utils/pageRules.js'

chrome.runtime.onInstalled.addListener(() => {
  // Done here so happens before the page attempts to load.
  redirectToAmazonSmile()

  // declarativeCon tent: Decides when to activate the plugin
  // Note: You should always register or unregister rules in bulk 
  // rather than individually because each of these operations 
  // recreates internal data structures. This re-creation is 
  // computationally expensive but facilitates a faster matching algorithm.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      ACTIVATE_PLUGIN_RULE
    ]);
  });
});