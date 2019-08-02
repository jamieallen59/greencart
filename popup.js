let changeColor = document.getElementById('changeColor');

// storage: Same as local storage
chrome.storage.sync.get('color', data => {
  const { color } = data

  console.log('GET COLOR')

  changeColor.style.backgroundColor = color;
  changeColor.setAttribute('value', color);
});

changeColor.onclick = element => {
  const { value: color } = element.target
  console.log('HERE', document.body.style.backgroundColor)

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: "alert('it works!')" }
    )

    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};