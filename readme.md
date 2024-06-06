<p align="center">
  <a href="https://www.npmjs.com/package/tavily"><img alt="NPM" src="https://img.shields.io/npm/v/tavily.svg" /></a>
  <a href="https://github.com/transitive-bullshit/tavily/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/tavily/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://github.com/transitive-bullshit/tavily/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

# Tavily <!-- omit from toc -->

> [Tavily](https://tavily.com) is a search API tailored for LLM Agents.

## Install

```sh
npm install tavily
```

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and requires `Node.js >= 18` or an equivalent environment (bun, deno, CF workers, etc).

## Usage

Sign up for a [Tavily API key](https://docs.tavily.com).

```ts
import { TavilyClient } from 'tavily'

const tavily = new TavilyClient() // api key defaults to "TAVILY_API_KEY" env var

const result0 = await tavily.search('what is AGI?')
console.log(result0)

const result1 = await tavily.search({
  query: 'when can we expect to have AGI?',
  search_depth: 'advanced',
  include_answer: true,
  include_images: true,
  max_results: 10
})
console.log(result1)
```

See the [Tavily docs](https://docs.tavily.com/docs/tavily-api/introduction) for more info.

## License

MIT © [Travis Fischer](https://twitter.com/transitive_bs)

To stay up to date or learn more, follow [@transitive_bs](https://twitter.com/transitive_bs) on Twitter.
