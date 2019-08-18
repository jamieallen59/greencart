// Constants
const CARBON_FRIENDLY_OPTIONS = [
  'Kindle Edition',
  'Audiobook'
]

// Helpers
const hasCarbonFriendlyText = textArray => {
  return CARBON_FRIENDLY_OPTIONS.some(text => {
    return textArray.includes(text)
  })
}

// Returns an array of all the text in a DOM tree
const getAllText = node => {
  function recursor(n) {
    let i
    let array = []

    if (n.nodeType !== 3) {
      if (n.childNodes) {
        for (i = 0; i < n.childNodes.length; ++i) {
          array = array.concat(recursor(n.childNodes[i]))
        }
      }
    } else {
      array.push(n.data)
    }
    
    return array
  }
  return recursor(node)
}

const checkHasBookBuyBox = () => {
  const BOOK_PAGE_BUY_BOX_ID = 'buybox'
  const buyBoxElement = document.getElementById(BOOK_PAGE_BUY_BOX_ID)

  return !!buyBoxElement
}

const getSwatchPricingElements = () => {
  const SWATCH_PRICING_ELEMENT_CLASSNAME = 'swatchElement'
  const swatchPricingElements = document.getElementsByClassName(SWATCH_PRICING_ELEMENT_CLASSNAME)

  return swatchPricingElements
}

const getBookPagePricingElements = () => {
  const hasBookBuyBox = checkHasBookBuyBox()
  const swatchPricingElements = getSwatchPricingElements()

  if (hasBookBuyBox && swatchPricingElements.length) {
    return swatchPricingElements
  }

  return null
}

// Public
export const highlightLowCarbonBookOptions = () => {
  // Check if it is a page with a book
  const bookPagePricingElements = getBookPagePricingElements()

  // If they exist, it is a book page
  if (bookPagePricingElements) {
    for (let swatchPricingElement of bookPagePricingElements) {
      const innerElement = swatchPricingElement.getElementsByClassName('a-button-inner')
      const innerTextElement = innerElement[0].getElementsByClassName('a-button-text')

      const allText = getAllText(innerTextElement[0])

      const isCarbonFriendlyOption = hasCarbonFriendlyText(allText)

      if (isCarbonFriendlyOption) {
        innerElement[0].style.background = 'green'
      }
    }
  }
}
