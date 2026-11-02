export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true }).split(":")[0]?.toLowerCase()
  const url = getRequestURL(event)

  if ((host === "theroer.dev" || host === "www.theroer.dev") && /^\/cursio\/?$/.test(url.pathname)) {
    return sendRedirect(event, `https://cursio.theroer.dev/${url.search}`, 301)
  }

  if (host !== "cursio.theroer.dev") return

  if (url.pathname === "/") {
    event.node.req.url = `/cursio${url.search}`
  } else if (url.pathname === "/robots.txt") {
    event.node.req.url = `/cursio-robots.txt${url.search}`
  } else if (url.pathname === "/sitemap.xml") {
    event.node.req.url = `/cursio-sitemap.xml${url.search}`
  }
})
