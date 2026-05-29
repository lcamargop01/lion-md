const PROXY_ORIGIN = 'https://cc373d75.lionmd-payroll.pages.dev'

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url)
    
    // Proxy all API requests to the working deployment
    if (url.pathname.startsWith('/api/')) {
      const proxyUrl = PROXY_ORIGIN + url.pathname + url.search
      const proxyReq = new Request(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      })
      return fetch(proxyReq)
    }

    // Let Cloudflare Pages serve static assets normally
    return env.ASSETS.fetch(request)
  }
}
