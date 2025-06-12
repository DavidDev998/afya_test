import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { coinsApi } from '@/lib/api';
import { Coin, CoinDetails, MarketChartData } from '@/types/coin';

export const useCoins = (
  page: number = 1,
  perPage: number = 50,
  currency: string = 'usd',
  options?: Omit<UseQueryOptions<Coin[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['coins', page, perPage, currency],
    queryFn: () => coinsApi.getCoins(page, perPage, currency),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
    ...options,
  });
};

export const useCoin = (
  coinId: string,
  options?: Omit<UseQueryOptions<Coin, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['coin', coinId],
    queryFn: () => coinsApi.getCoinById(coinId),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
    ...options,
  });
};

export const useCoinDetails = (
  coinId: string,
  currency: string = 'usd',
  options?: Omit<UseQueryOptions<CoinDetails, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['coin-details', coinId, currency],
    queryFn: () => coinsApi.getCoinDetails(coinId, currency),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false,
    retry: 2,
    ...options,
  });
};

export const useCoinMarketChart = (
  coinId: string,
  currency: string = 'usd',
  days: number = 7,
  options?: Omit<UseQueryOptions<MarketChartData, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['coin-chart', coinId, currency, days],
    queryFn: () => coinsApi.getCoinMarketChart(coinId, currency, days),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false,
    retry: 2,
    ...options,
  });
};

export const useSearchCoins = (
  query: string,
  options?: Omit<UseQueryOptions<{ coins: Coin[] }, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['search-coins', query],
    queryFn: () => coinsApi.searchCoins(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  });
}; 