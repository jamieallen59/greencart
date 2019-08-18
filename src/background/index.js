// Ensures icons are included in build
import '../img/greencart_logo_16x16.png'
import '../img/greencart_logo_32x32.png'
import '../img/greencart_logo_48x48.png'
import '../img/greencart_logo_128x128.png'
import '../img/greencart_logo.png'


// Background.js runs when chrome starts up.
import { redirectToAmazonSmile } from '../utils/redirectToAmazonSmile'
import { ACTIVATE_PLUGIN_RULE } from '../constants'

chrome.runtime.onInstalled.addListener(() => {
  // This is done here so it redirects before the page attempts to load.
  redirectToAmazonSmile()

  // declarativeContent: Decides when to activate the plugin

  // Note: You should always register or unregister rules in bulk 
  // rather than individually because each of these operations 
  // recreates internal data structures. This re-creation is 
  // computationally expensive but facilitates a faster matching algorithm.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      ACTIVATE_PLUGIN_RULE
    ])
  })
})