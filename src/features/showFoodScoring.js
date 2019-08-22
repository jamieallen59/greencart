const AMAZON_FRESH_CATEGORY_NAME = 'Amazon Fresh'

const checkAmazonFreshCategoryIsSelected = () => {
  const SEARCH_DROPDOWN = 'searchDropdownBox'
  const searchDropdownElement = document.getElementById(SEARCH_DROPDOWN)
  
  const { options = [], selectedIndex = 0 } = searchDropdownElement
  const { text: category } = options[selectedIndex]

  return category === AMAZON_FRESH_CATEGORY_NAME
}

const hasAmazonFreshHeader = () => {
  const FRESH_XPATH = '//div[a[contains(@href, "AmazonFresh")]]'

  try {
    let freshHeader = document.evaluate(FRESH_XPATH, document).iterateNext()
    
    if (freshHeader) {
      return true
    } else {
      return false
    }
  }
  catch {
    return false
  }
}

const checkIsAmazonFreshPage = () => {
  // TODO: Could check for other 'fresh' elements on the page here if needed
  const isAmazonFreshCategory = checkAmazonFreshCategoryIsSelected()
  const hasHeader = hasAmazonFreshHeader()

  return isAmazonFreshCategory || hasHeader // TODO: Can be changed to AND for more safety
}

export const getProductInformation = () => {
  // Returns a dictionary with product information text that can be extracted from the current page

  const title = document.getElementById('productTitle').textContent.trim()
  let description = document.getElementById('feature-bullets').textContent.trim()
  description = description.replace(/\s{2,}/g, '\n') // Replace multi-newlines with a single newline

  // Get the ASIN, safely
  const ASIN_XPATH = '//li[contains(., "ASIN:")]'
  let asin = document.evaluate(ASIN_XPATH, document)

  try {
    let el = asin.iterateNext()
    asin = el.textContent.replace('ASIN:', '').trim()
  } catch {
    asin = null
  }

  // Get the manufacturer/producer
  const BY_XPATH = '//div[@id="bylineInfoUS_feature_div"]'
  let byLine = document.evaluate(BY_XPATH, document)

  try {  
    let el = byLine.iterateNext()
    byLine = el.textContent.replace(/\s+/g, ' ').trim()
  } catch {
    byLink = null
  }

  return {
    title,
    description,
    asin,
    'by': byLine,
    'url': document.URL
  }
}

export const fetchImpactData = (productData) => {
  const url = 'https://greencart.herokuapp.com/lookup'

  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://smile.amazon.com',
            'Access-Control-Request-Method': 'POST'
            //'Access-Control-Allow-Origin': '*'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(productData), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
}



export const showFoodScoring = () => {
  const isAmazonFreshPage = checkIsAmazonFreshPage()

  if (isAmazonFreshPage) {
    console.log('TRUE')
    let data = getProductInformation()
    console.log(data);
    fetchImpactData(data).then(retData => {console.log(retData)})
  }

  // TODO: MVP
  // check roughly wht type of food it is
  // highlight based on text
  // show generic text on hover of traffic lights
  
  // TODO: Stretch
  // get food ASIN number
  // compare with JSON data
  // highlight traffic light based on choice
  // show specific food info
}