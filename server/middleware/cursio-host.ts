export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true }).split(":")[0]?.toLowerCase()
  if (host !== "cursio.theroer.dev") return

  const url = getRequestURL(event)
  if (url.pathname === "/") {
    event.node.req.url = `/cursio${url.search}`
  } else if (url.pathname === "/robots.txt") {
    event.node.req.url = `/cursio-robots.txt${url.search}`
  } else if (url.pathname === "/sitemap.xml") {
    event.node.req.url = `/cursio-sitemap.xml${url.search}`
  }
})
