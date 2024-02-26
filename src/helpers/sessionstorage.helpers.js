import { CHAT_HISTORY } from 'constants/index'

export const storeChatHistoryInSession = (value) => {
  sessionStorage.setItem(CHAT_HISTORY, JSON.stringify(value))
}

export const getChatHistoryFromSession = () => {
  return JSON.parse(sessionStorage.getItem(CHAT_HISTORY))
}

export const deleteChatHistoryFromSession = () => {
  sessionStorage.removeItem(CHAT_HISTORY)
}
