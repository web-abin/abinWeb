export const getRemoteImg = (url: string) => {
  return `${import.meta.env.VITE_APP_WEB_BASEURL}${url}`
}
