let category

const BOOKS_CATEGORY_NAME = 'Books'
const CARBON_FRIENDLY_OPTIONS = [
  'Kindle Edition',
  'Audiobook'
]

function getAllText(node) {
  function recursor(n) {
      var i, a = [];
      if (n.nodeType !== 3) {
          if (n.childNodes)
               for (i = 0; i < n.childNodes.length; ++i)
                   a = a.concat(recursor(n.childNodes[i]));
      } else
          a.push(n.data);
      return a;
  }
  return recursor(node);
}

function checkHasText(allText, optionsToFind) {
  let hasText = false

  allText.map(text => {
    optionsToFind.map(option => {
      if (text.indexOf(option) > -1) {
        hasText = true
      }
    })
  })

  return hasText
}


const highlightLowCarbonOptions = () => {
  const BOOK_BUY_BOX = 'buybox'
  const buyBoxElement = document.getElementById(BOOK_BUY_BOX)

  const isOnAProductPage = !!buyBoxElement

  if (isOnAProductPage) {
    const PRICING_ELEMENTS = 'swatchElement'
    const pricingElements = document.getElementsByClassName(PRICING_ELEMENTS)

    for (let element of pricingElements) {
      const innerElement = element.getElementsByClassName('a-button-inner')
      const innerTextElement = innerElement[0].getElementsByClassName('a-button-text')

      const allText = getAllText(innerTextElement[0])

      const isCarbonFriendlyOption = checkHasText(allText, CARBON_FRIENDLY_OPTIONS)
      
      if (isCarbonFriendlyOption) {
        innerElement[0].style.background = 'green'
      }
    }
  }
}

const getCategoryProperty = (element = {}) => {
  const target = element.target || element

  const { options, selectedIndex } = target

  const { text: category } = options[selectedIndex]

  return category
}

const setCategory = element => {
  category = getCategoryProperty(element)
  console.log('New category', category)

  if (category === BOOKS_CATEGORY_NAME) {
    highlightLowCarbonOptions()
  }
}

const addCategoryListener = element => {
  element.addEventListener(
    'change',
    setCategory,
    false
  )
}

const getCategory = () => {
  const SEARCH_DROPDOWN = 'searchDropdownBox'
  const searchDropdownElement = document.getElementById(SEARCH_DROPDOWN)

  addCategoryListener(searchDropdownElement)

  setCategory(searchDropdownElement)
}


getCategory()