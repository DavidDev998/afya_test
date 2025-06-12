export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null | {
    times: number
    currency: string
    percentage: number
  }
  last_updated: string
}

export interface CoinDetails extends Coin {
  description?: {
    en: string
  }
  links?: {
    homepage: string[]
    blockchain_site: string[]
    official_forum_url: string[]
    subreddit_url: string
    repos_url: {
      github: string[]
    }
  }
  market_data?: {
    current_price: { [key: string]: number }
    market_cap: { [key: string]: number }
    total_volume: { [key: string]: number }
    high_24h: { [key: string]: number }
    low_24h: { [key: string]: number }
    price_change_24h_in_currency: { [key: string]: number }
    price_change_percentage_24h_in_currency: { [key: string]: number }
    price_change_percentage_7d_in_currency: { [key: string]: number }
    price_change_percentage_30d_in_currency: { [key: string]: number }
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: { [key: string]: number }
    ath_change_percentage: { [key: string]: number }
    ath_date: { [key: string]: string }
    atl: { [key: string]: number }
    atl_change_percentage: { [key: string]: number }
    atl_date: { [key: string]: string }
  }
}

export interface HistoricalPrice {
  timestamp: number
  price: number
  market_cap: number
  total_volume: number
}

export interface MarketChartData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export interface CoinsResponse {
  data: Coin[]
  status: string
  message?: string
}
