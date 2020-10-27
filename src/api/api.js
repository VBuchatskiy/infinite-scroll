import querystring from "querystring";

class GiphyApi {
  constructor() {
    this.host = `https://api.giphy.com/v1/gifs/`;
    this.key = `oZf0bLG34k2RMcuchA4D4gPp9mg8siE0`;
    this.paths = {
      trending: `trending`
    };
  }

  query({ path = ``, params = {} } = {}) {
    return path.concat(`?`, querystring.stringify(params));
  }

  async request({ query = ``, headers, method = `GET` } = {}) {
    const response = await fetch(`${this.host}${query}`, {
      method,
      headers
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getTrendingGifCollection({ limit = 40, offset = 0 } = {}) {
    return await this.request({
      query: this.query({
        path: this.paths.trending,
        params: { api_key: this.key, limit, offset }
      })
    });
  }
}

export const api = new GiphyApi();
