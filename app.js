/* global window, document, fetch */
/* eslint-disable no-console */
function updateFavoriteFruits (contents) {
  // console.log('updateFavoriteFruits', contents)
  if (typeof contents !== 'string') {
    contents = contents.map((item) => `<li>${item}</li>`).join('')
  }
  if (contents.includes('Tomato')) {
    console.log("it's a red tomato - is it a fruit or not? who know...")
    document.querySelector('.fruits-title').classList.add("favorite")
  } else {
    document.querySelector('.fruits-title').classList.remove("favorite")
  }
  document.querySelector('.favorite-fruits').innerHTML = contents
}

function getFavoriteFruits () {
  const favFruits = document.querySelector('.favorite-fruits')

  if (!favFruits) {
    return
  }

  favFruits.innerHTML = '<div class="loader"></div>'

  fetch('/favorite-fruits', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
  .then((response) => {
    /* eslint-disable-next-line no-console */
    console.log('fetch response', response)
    if (response.ok) {
      return response.json()
    }

    const errorMessage = response.headers.get('status-text') || response.statusText

    throw new Error(errorMessage)
  })
  .then((response) => {
    /* eslint-disable-next-line no-console */
    console.log('server response', response)
    updateFavoriteFruits(response.length ? response : 'No favorites')
  })
  .catch((error) => {
    updateFavoriteFruits(`Failed loading favorite fruits: ${error.message}`)
  })
}

getFavoriteFruits()
setInterval(getFavoriteFruits, 5000)

