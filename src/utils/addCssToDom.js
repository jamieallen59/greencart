export const addCssToDom = css => {
  const style = document.createElement('style')

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  document.getElementsByTagName('head')[0].appendChild(style)
}