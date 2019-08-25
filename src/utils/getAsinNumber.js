export const getAsinNumberUS = () => {
  const ASIN_XPATH = '//li[contains(., "ASIN:")]'
  let asin = document.evaluate(ASIN_XPATH, document)

  try {
    const element = asin.iterateNext()
    asin = element.textContent.replace('ASIN:', '').trim()
  } catch (error) {
    asin = ''
  }

  return asin
}

export const getAsinNumberUK = () => {
  const PRODUCT_DETAILS_ID = 'prodDetails'
  const prodDetails = document.getElementById(PRODUCT_DETAILS_ID)
  const labels = prodDetails.getElementsByClassName('label')

  const asinElements = [...labels].filter(element => {
    return element.textContent.includes('ASIN')
  })
  const [asinElement] = asinElements

  if (asinElement && asinElement.nextSibling) {
    return asinElement.nextSibling.textContent
  }

  return ''
}


export const getAsinNumber = () => {
  // TODO: check for country before doing this
  const asin = getAsinNumberUS() || getAsinNumberUK()

  return asin
}