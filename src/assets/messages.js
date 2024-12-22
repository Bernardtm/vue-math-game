import { Notify } from 'quasar'

const sendMessage = (message, type, timeout = 1000) => {
  Notify.create({
    position: 'center',
    type,
    message,
    timeout
  })
}

export function success (message) {
  sendMessage(message, 'positive')
}

export function info (message) {
  sendMessage(message, 'info')
}

export function warning (message) {
  sendMessage(message, 'warning')
}

export function error (message) {
  sendMessage(message, 'negative')
}
