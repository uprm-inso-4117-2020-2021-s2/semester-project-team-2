export const navbarHeight = 70

/** returns the slug of the given url. */
export const urlSlug = (url) => url.substring(url.lastIndexOf('/') + 1)

/** returns the given url without the slug. */
export const domainUrl = (url) => url.substring(0, url.lastIndexOf('/'))
