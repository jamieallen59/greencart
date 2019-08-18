const callback = info => {
  const { url } = info
  const redirectUrl = url.replace('www', 'smile')
  
  console.log(`Initial URL: ${url}`)
  console.log(`Redirect URL: ${redirectUrl}`)

  return { redirectUrl }
}

const filters = {
  urls: [
    '*://www.amazon.co.uk/*',
    '*://www.amazon.com/*'	
  ],
  types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
}

// https://stackoverflow.com/questions/12065029/redirecting-url-in-a-chrome-extension
export const redirectToAmazonSmile = () => {
  chrome.webRequest.onBeforeRequest.addListener(
    callback,
    filters,
    ['blocking']
  )
}