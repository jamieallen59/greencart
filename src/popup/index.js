const carbonCostButton = document.getElementById('carbonCostButton')

carbonCostButton.onclick = element => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const { id: tabId } = tabs[0]

    chrome.tabs.executeScript(
      tabId,
      { code: "alert('it works!')" }
    )
  })
}
