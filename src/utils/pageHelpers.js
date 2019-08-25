// Get Manufacturer -------------------------
const getManufacturerUS = () => {
  const BY_XPATH = '//div[@id="bylineInfoUS_feature_div"]'
  let byLine = document.evaluate(BY_XPATH, document)

  try {  
    const element = byLine.iterateNext()
    byLine = element.textContent.replace(/\s+/g, ' ').trim()
  } catch (error) {
    console.log('getManufacturerUS Error', error)
    byLine = null
  }

  return byLine
}

export const getManufacturer = () => {
  // TODO: needs to work for UK too
  const manufacturer = getManufacturerUS()

  return manufacturer
}

// Get ASIN number --------------------------
export const getAsinNumberUS = () => {
  const ASIN_XPATH = '//li[contains(., "ASIN:")]'
  let asin = document.evaluate(ASIN_XPATH, document)

  try {
    const element = asin.iterateNext()
    asin = element.textContent.replace('ASIN:', '').trim()
  } catch (error) {
    console.log('getAsinNumberUS Error', error)
    asin = null
  }

  return asin
}

export const getAsinNumber = () => {
  // TODO: needs to work for UK too
  const asin = getAsinNumberUS()

  return asin
}