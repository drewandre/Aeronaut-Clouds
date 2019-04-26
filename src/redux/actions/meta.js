let saveAuthStatus = bool => {
  return {
      type: 'SAVE_AUTH_STATUS',
      bool
  }
}

export {
  saveAuthStatus
}
