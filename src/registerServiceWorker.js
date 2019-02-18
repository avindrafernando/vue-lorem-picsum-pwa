/* eslint-disable no-console */

import { register } from 'register-service-worker'

const notifyUserAboutUpdate = worker => {
  document.dispatchEvent(new CustomEvent('ShowSnackbar', {
    detail: {
      options: {
        notificationText: 'New content is available.',
        buttonText: 'Refresh',
        onClick: () => { window.location.reload() },
        timeout: 15000
      }
    }
  }))
  return worker.postMessage({ action: 'skipWaiting' })
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      notifyUserAboutUpdate(registration.waiting)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
