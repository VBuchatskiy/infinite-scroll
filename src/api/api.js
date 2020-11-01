import querystring from "querystring";

class GiphyApi {
  constructor() {
    this.host = `https://api.giphy.com/v1/gifs/`;
    this.key = `oZf0bLG34k2RMcuchA4D4gPp9mg8siE0`;
    this.paths = {
      trending: `trending`,
      search: `search`,
      searchTags: `search/tags`
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

  async getTrendingGifCollection({ limit = 20, offset = 0 } = {}) {
    return await this.request({
      query: this.query({
        path: this.paths.trending,
        params: { api_key: this.key, limit, offset }
      })
    });
  }

  async getSearchingGifCollection({ q = ``, limit = 20, offset = 0 } = {}) {
    console.warn(limit, offset);
    return await this.request({
      query: this.query({
        path: this.paths.search,
        params: { api_key: this.key, q, limit, offset }
      })
    });
  }

  async getSearchingGifTagsCollection({ q = ``, limit = 5, offset = 0 } = {}) {
    return await this.request({
      query: this.query({
        path: this.paths.searchTags,
        params: { api_key: this.key, q, limit, offset }
      })
    });
  }
}

export const api = new GiphyApi();
