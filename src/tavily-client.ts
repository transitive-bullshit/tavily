import defaultKy, { type KyInstance } from 'ky'

import { pruneNullOrUndefined } from './utils.js'

export namespace tavily {
  export const API_BASE_URL = 'https://api.tavily.com'

  export interface SearchOptions {
    /** Search query. (required) */
    query: string

    /** The depth of the search. It can be basic or advanced. Default is basic for quick results and advanced for indepth high quality results but longer response time. Advanced calls equals 2 requests. */
    search_depth?: 'basic' | 'advanced'

    /** Include answers in the search results. Default is `false`. */
    include_answer?: boolean

    /** Include a list of query related images in the response. Default is `false`. */
    include_images?: boolean

    /** Include raw content in the search results. Default is `false`. */
    include_raw_content?: boolean

    /** The number of maximum search results to return. Default is `5`. */
    max_results?: number

    /** A list of domains to specifically include in the search results. Default is `undefined`, which includes all domains. */
    include_domains?: string[]

    /** A list of domains to specifically exclude from the search results. Default is `undefined`, which doesn't exclude any domains. */
    exclude_domains?: string[]
  }

  export interface SearchResponse {
    /** The search query. */
    query: string

    /** A list of sorted search results ranked by relevancy. */
    results: SearchResult[]

    /** The answer to your search query. */
    answer?: string

    /** A list of query related image urls. */
    images?: string[]

    /** A list of suggested research follow up questions related to original query. */
    follow_up_questions?: string[]

    /** How long it took to generate a response. */
    response_time: string
  }

  export interface SearchResult {
    /** The url of the search result. */
    url: string

    /** The title of the search result page. */
    title: string

    /**
     * The most query related content from the scraped url. We use proprietary AI and algorithms to extract only the most relevant content from each url, to optimize for context quality and size.
     */
    content: string

    /** The parsed and cleaned HTML of the site. For now includes parsed text only. */
    raw_content?: string

    /** The relevance score of the search result. */
    score: string
  }
}

/**
 * Tavily provides a web search API tailored for LLMs.
 *
 * @see https://tavily.com
 */
export class TavilyClient {
  protected readonly ky: KyInstance
  protected readonly apiKey: string
  protected readonly apiBaseUrl: string

  constructor({
    apiKey = process.env.TAVILY_API_KEY,
    apiBaseUrl = tavily.API_BASE_URL,
    ky = defaultKy
  }: {
    apiKey?: string
    apiBaseUrl?: string
    ky?: KyInstance
  } = {}) {
    if (!apiKey) {
      throw new Error(
        'TavilyClient missing required "apiKey" (defaults to "TAVILY_API_KEY")'
      )
    }

    this.apiKey = apiKey
    this.apiBaseUrl = apiBaseUrl

    this.ky = ky.extend({
      prefixUrl: this.apiBaseUrl
    })
  }

  /**
   * Search for data based on a query.
   */
  async search(queryOrOpts: string | tavily.SearchOptions) {
    const options =
      typeof queryOrOpts === 'string' ? { query: queryOrOpts } : queryOrOpts

    const res = await this.ky
      .post('search', {
        json: {
          ...options,
          api_key: this.apiKey
        }
      })
      .json<tavily.SearchResponse>()

    return pruneNullOrUndefined(res).results?.map(pruneNullOrUndefined)
  }
}
