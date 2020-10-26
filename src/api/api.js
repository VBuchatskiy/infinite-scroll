class GiphyApi {
  constructor() {
    this.host = `https://api.giphy.com/v1/gifs/`;
    this.key = `api_key=oZf0bLG34k2RMcuchA4D4gPp9mg8siE0`;
  }

  async request({ path = ``, query = ``, headers, method = `GET` } = {}) {
    const response = await fetch(`${this.host}${path}?${query}`, {
      method,
      headers
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getTrendingGifCollection({ limit = 20, offset = 0 } = {}) {
    return await this.request({
      path: `trending`,
      query: `${this.key}&=limit${limit}&=offset${offset}`
    });
  }
}

export const api = new GiphyApi();
