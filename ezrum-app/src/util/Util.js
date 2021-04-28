export const navbarHeight = 70

/** returns the slug of the given url. */
export const urlSlug = (url) => url.substring(url.lastIndexOf('/') + 1)

/** returns the given url without the slug. */
export const domainUrl = (url) => url.substring(0, url.lastIndexOf('/'))


export const randomStr = () => {
  const length = 11;
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');
}

export const baseUrl = (endpoint) => {
  console.log('endpoint', endpoint)
  return `https://team-ezrum.herokuapp.com${endpoint}`
}