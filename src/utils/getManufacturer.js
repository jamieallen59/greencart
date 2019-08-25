import { getElementByXpath } from './getElementByXpath'

const getManufacturerUK = () => {
  const BY_XPATH = '//div[@id="bylineInfo_feature_div"]'
  const byLine = getElementByXpath(BY_XPATH)
  
  if (byLine && byLine.textContent) {
    return byLine.textContent.replace(/\s+/g, ' ').trim()
  }

  return ''
}

const getManufacturerUS = () => {
  const BY_XPATH = '//div[@id="bylineInfoUS_feature_div"]'
  let byLine = document.evaluate(BY_XPATH, document)

  try {  
    const element = byLine.iterateNext()
    byLine = element.textContent.replace(/\s+/g, ' ').trim()
  } catch (error) {
    byLine = ''
  }

  return byLine
}

export const getManufacturer = () => {
  // TODO: check for country before doing this
  const manufacturer = getManufacturerUS() || getManufacturerUK()

  return manufacturer
}