// Get Manufacturer -------------------------
const getManufacturerUS = () => {
  const BY_XPATH = '//div[@id="bylineInfoUS_feature_div"]'
  let byLine = document.evaluate(BY_XPATH, document)

  try {  
    let el = byLine.iterateNext()
    byLine = el.textContent.replace(/\s+/g, ' ').trim()
  } catch (error) {
    console.log('Error', error)
    byLine = null
  }

  return byLine
}

export const getManufacturer = () => {
  // needs to work for UK too
  const manufacturer = getManufacturerUS()

  return manufacturer
}

// Get ASIN number --------------------------
export const getAsinNumberUS = () => {
  const ASIN_XPATH = '//li[contains(., "ASIN:")]'
  let asin = document.evaluate(ASIN_XPATH, document)

  try {
    let el = asin.iterateNext()
    asin = el.textContent.replace('ASIN:', '').trim()
  } catch (error) {
    console.log('Error', error)
    asin = null
  }

  return asin
}

export const getAsinNumber = () => {
  // needs to work for UK too
  const asin = getAsinNumberUS()

  return asin
}