const CARBON_FRIENDLY_OPTIONS = [
  'Kindle Edition',
  'Audiobook'
]

// Textarray is an array of strings
export const hasCarbonFriendlyText = textArray => {
  let hasText = false

  textArray.map(text => {
    CARBON_FRIENDLY_OPTIONS.map(option => {
      if (text.indexOf(option) > -1) {
        hasText = true
      }
    })
  })

  return hasText
}