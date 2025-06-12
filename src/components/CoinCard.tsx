import { Coin } from '@/types/coin'
import Image from 'next/image'

interface CoinCardProps {
  coin: Coin
  onClick?: (coin: Coin) => void
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price)
}

const formatNumber = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

const formatPercentage = (percentage: number): string => {
  return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`
}

export const CoinCard: React.FC<CoinCardProps> = ({ coin, onClick }) => {
  const isPositive = coin.price_change_percentage_24h > 0

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 ${
        onClick
          ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600'
          : ''
      }`}
      onClick={() => onClick?.(coin)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <Image
              src={coin.image}
              alt={coin.name}
              fill
              className="rounded-full"
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {coin.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            #{coin.market_cap_rank}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Preço
          </span>
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {formatPrice(coin.current_price)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Variação (24h)
          </span>
          <span
            className={`font-medium ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {coin.price_change_percentage_24h
              ? formatPercentage(coin.price_change_percentage_24h)
              : 'N/A'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Capitalização de Mercado
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {coin.market_cap ? formatNumber(coin.market_cap) : 'N/A'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Volume (24h) em BRL
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {coin.total_volume ? formatNumber(coin.total_volume) : 'N/A'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Máximo (24h): {formatPrice(coin.high_24h)}</span>
          <span>Mínimo (24h): {formatPrice(coin.low_24h)}</span>
        </div>
      </div>
    </div>
  )
}
