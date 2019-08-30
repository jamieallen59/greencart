import { createSvgLogo } from './createSvgLogo'

const createTrafficLight = ({ color, lighterColor, isHighlighted }) => {
  // create outer housing
  const LIGHT_HOUSING_COLOR = '#2d2d2d'
  const LIGHT_HOUSING_SIZE = '32px'
  const lightHousing = document.createElement('div')

  lightHousing.style.display = 'flex'
  lightHousing.style.justifyContent = 'center'
  lightHousing.style.alignItems = 'center'
  lightHousing.style.width = LIGHT_HOUSING_SIZE
  lightHousing.style.height = LIGHT_HOUSING_SIZE
  lightHousing.style.borderRadius = '2px'
  lightHousing.style.backgroundColor = LIGHT_HOUSING_COLOR

  // create inner light
  const LIGHT_SIZE = '26px'
  const trafficLight = document.createElement('div')

  trafficLight.style.width = LIGHT_SIZE
  trafficLight.style.height = LIGHT_SIZE
  trafficLight.style.borderRadius = LIGHT_SIZE
  trafficLight.style.cursor = 'pointer'
  trafficLight.style.transition = '.15s ease-in-out'
  
  if (isHighlighted) {
    trafficLight.style.backgroundColor = lighterColor
    trafficLight.style.boxShadow = `0 0 20px ${lighterColor}`
  } else {
    trafficLight.style.backgroundColor = color
    trafficLight.style.opacity = '0.4'
  }

  lightHousing.appendChild(trafficLight)
  
  return lightHousing
}

const createTrafficLights = (colors) => {
  // create outer wrapper
  const trafficLights = document.createElement('div')

  trafficLights.style.display = 'flex'
  trafficLights.style.flexDirection = 'column'
  trafficLights.style.justifyContent = 'space-evenly'
  trafficLights.style.alignItems = 'center'
  trafficLights.style.zIndex = '1000'
  trafficLights.style.width = '40px'
  trafficLights.style.minWidth = '40px'
  trafficLights.style.height = '120px'
  trafficLights.style.borderRadius = '4px'
  trafficLights.style.backgroundColor = '#b3b3b3'

  const { green, amber, red } = colors

  const greenLight = createTrafficLight(green)
  const amberLight = createTrafficLight(amber)
  const redLight = createTrafficLight(red)

  // add them all together and place into the DOM
  trafficLights.appendChild(greenLight)
  trafficLights.appendChild(amberLight)
  trafficLights.appendChild(redLight)

  return trafficLights
}

const getLightColorDetails = (highlightedColor) => {
  const colors = {
    green: {
      color: '#126315',
      lighterColor: '#1b9720',
      isHighlighted: highlightedColor === 'green',
    },
    amber: {
      color: '#F18F01',
      lighterColor: '#ffd462',
      isHighlighted: highlightedColor === 'amber',
    },
    red: {
      color: '#E80B0B',
      lighterColor: '#f63b3b',
      isHighlighted: highlightedColor === 'red'
    },
  }

  const highlightColor = Object.values(colors).find(({ isHighlighted }) => isHighlighted)

  return {
    colors,
    highlightColor: highlightColor.lighterColor
  }
}

export const createFoodScoringWidget = (highlightedColor, description) => {
  const WIDGET_ID = 'greencart_widget'

  const { colors, highlightColor } = getLightColorDetails(highlightedColor)

  // container
  const outerWrapper = document.createElement('div')
  outerWrapper.setAttribute('id', WIDGET_ID)

  outerWrapper.style.position = 'fixed'
  outerWrapper.style.display = 'flex'
  outerWrapper.style.flexDirection = 'column'
  outerWrapper.style.top = '40px'
  outerWrapper.style.right = '40px'
  outerWrapper.style.padding = '12px'
  outerWrapper.style.borderRadius = '4px'
  outerWrapper.style.border = `2px solid ${highlightColor}`
  outerWrapper.style.backgroundColor = 'white'
  outerWrapper.style.zIndex = '1000'
  outerWrapper.style.maxWidth = '250px'

  // Close button
  const closeButton = document.createElement('button')
  closeButton.textContent = 'x'
  closeButton.onclick = () => document.getElementById(WIDGET_ID).style.display = 'none'

  closeButton.style.fontSize = '16px'
  closeButton.style.border = 'none'
  closeButton.style.outline = 0
  closeButton.style.cursor = 'pointer'
  closeButton.style.position = 'absolute'
  closeButton.style.top = '12px'
  closeButton.style.right = '12px'

  // logo
  const logoWrapper = document.createElement('div')
  logoWrapper.style.display = 'flex'
  logoWrapper.style.alignItems = 'center'

  const logo = createSvgLogo()
  const logoText = document.createElement('p')
  logoText.textContent = 'greenCart'
  logoText.style.marginLeft = '8px'
  logoText.style.fontFamily = 'Montserrat, sans-serif'
  logoText.style.fontSize = '16px'

  logoWrapper.appendChild(logo)
  logoWrapper.appendChild(logoText)

  const trafficLightAndInfoWrapper = document.createElement('div')
  trafficLightAndInfoWrapper.style.display = 'flex'
  trafficLightAndInfoWrapper.style.marginTop = '8px'

  // trafficLights
  const trafficLights = createTrafficLights(colors)

  // description
  const descriptionWrapper = document.createElement('p')
  descriptionWrapper.textContent = description
  descriptionWrapper.style.fontFamily = 'Helvetica, sans-serif'
  descriptionWrapper.style.marginLeft = '8px'

  trafficLightAndInfoWrapper.appendChild(trafficLights)
  trafficLightAndInfoWrapper.appendChild(descriptionWrapper)

  outerWrapper.appendChild(closeButton)
  outerWrapper.appendChild(logoWrapper)
  outerWrapper.appendChild(trafficLightAndInfoWrapper)

  return outerWrapper
}