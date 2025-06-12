import { Coin, CoinDetails, MarketChartData } from '@/types/coin';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-5aAL1FebZb8pGCciQSAtKeB7';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': API_KEY, 
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Erro desconhecido'
    );
  }
}

export const coinsApi = {
  /**
   * @param page
   * @param perPage
   * @param currency
   */
  getCoins: async (
    page: number = 1,
    perPage: number = 100,
    currency: string = 'usd'
  ): Promise<Coin[]> => {
    const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`;
    return fetchApi<Coin[]>(endpoint);
  },

  /**
   * @param coinId
   * @param currency
   */
  getCoinDetails: async (
    coinId: string,
    currency: string = 'usd'
  ): Promise<CoinDetails> => {
    const endpoint = `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const data = await fetchApi<any>(endpoint);
    
    const coinDetails: CoinDetails = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large || data.image?.small || '',
      current_price: data.market_data?.current_price?.[currency] || 0,
      market_cap: data.market_data?.market_cap?.[currency] || 0,
      market_cap_rank: data.market_cap_rank || 0,
      fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.[currency] || 0,
      total_volume: data.market_data?.total_volume?.[currency] || 0,
      high_24h: data.market_data?.high_24h?.[currency] || 0,
      low_24h: data.market_data?.low_24h?.[currency] || 0,
      price_change_24h: data.market_data?.price_change_24h_in_currency?.[currency] || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h_in_currency?.[currency] || 0,
      market_cap_change_24h: data.market_data?.market_cap_change_24h_in_currency?.[currency] || 0,
      market_cap_change_percentage_24h: data.market_data?.market_cap_change_percentage_24h || 0,
      circulating_supply: data.market_data?.circulating_supply || 0,
      total_supply: data.market_data?.total_supply || 0,
      max_supply: data.market_data?.max_supply || 0,
      ath: data.market_data?.ath?.[currency] || 0,
      ath_change_percentage: data.market_data?.ath_change_percentage?.[currency] || 0,
      ath_date: data.market_data?.ath_date?.[currency] || '',
      atl: data.market_data?.atl?.[currency] || 0,
      atl_change_percentage: data.market_data?.atl_change_percentage?.[currency] || 0,
      atl_date: data.market_data?.atl_date?.[currency] || '',
      roi: data.roi,
      last_updated: data.last_updated || '',
      description: data.description,
      links: data.links,
      market_data: data.market_data,
    };

    return coinDetails;
  },

  /**
   * @param coinId
   * @param currency
   * @param days
   */
  getCoinMarketChart: async (
    coinId: string,
    currency: string = 'usd',
    days: number = 7
  ): Promise<MarketChartData> => {
    const endpoint = `/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;
    return fetchApi<MarketChartData>(endpoint);
  },

  /**
   * @param coinId
   */
  getCoinById: async (coinId: string): Promise<Coin> => {
    const details = await coinsApi.getCoinDetails(coinId);
    return details;
  },

  /**
   * @param query
   */
  searchCoins: async (query: string): Promise<{ coins: Coin[] }> => {
    try {
      const searchEndpoint = `/search?query=${encodeURIComponent(query)}`;
      const searchResponse = await fetchApi<{
        coins: Array<{ id: string; name: string; symbol: string; market_cap_rank: number; thumb: string; large: string }>;
      }>(searchEndpoint);

      if (!searchResponse.coins || searchResponse.coins.length === 0) {
        return { coins: [] };
      }

      const coinIds = searchResponse.coins.slice(0, 20).map(coin => coin.id);
      
      const marketEndpoint = `/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;
      const marketData = await fetchApi<Coin[]>(marketEndpoint);

      return { coins: marketData };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Search failed'
      );
    }
  },
};

export default coinsApi; 