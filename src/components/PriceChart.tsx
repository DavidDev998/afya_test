'use client'

import { MarketChartData } from '@/types/coin'

interface PriceChartProps {
  data: MarketChartData
  currency: string
  className?: string
}

interface ChartPoint {
  x: number
  y: number
  price: number
  date: Date
}

const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase() === 'BRL' ? 'BRL' : 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price)
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
  })
}

export const PriceChart: React.FC<PriceChartProps> = ({
  data,
  currency,
  className = '',
}) => {
  if (!data.prices || data.prices.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">Não há dados disponíveis para o gráfico</p>
      </div>
    )
  }

  const width = 600
  const height = 300
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const prices = data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: new Date(timestamp),
  }))

  const minPrice = Math.min(...prices.map(p => p.price))
  const maxPrice = Math.max(...prices.map(p => p.price))
  const priceRange = maxPrice - minPrice

  const chartPoints: ChartPoint[] = prices.map((price, index) => ({
    x: padding + (index / (prices.length - 1)) * chartWidth,
    y: padding + ((maxPrice - price.price) / priceRange) * chartHeight,
    price: price.price,
    date: price.date,
  }))

  const pathData = chartPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const firstPrice = prices[0]?.price || 0
  const lastPrice = prices[prices.length - 1]?.price || 0
  const isPositive = lastPrice >= firstPrice

  const areaPath = `${pathData} L ${chartPoints[chartPoints.length - 1].x} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Gráfico de Preço (7 dias)
        </h3>
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-sm text-gray-600">Atual: </span>
            <span className="font-medium text-gray-900">
              {formatPrice(lastPrice, currency)}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Variação: </span>
            <span
              className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {isPositive ? '+' : ''}
              {(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <defs>
            <pattern
              id="grid"
              width={chartWidth / 6}
              height={chartHeight / 4}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${chartWidth / 6} 0 L 0 0 0 ${chartHeight / 4}`}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient
              id={`gradient-${isPositive ? 'green' : 'red'}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={isPositive ? '#10b981' : '#ef4444'}
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? '#10b981' : '#ef4444'}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <rect
            x={padding}
            y={padding}
            width={chartWidth}
            height={chartHeight}
            fill="url(#grid)"
          />

          <path
            d={areaPath}
            fill={`url(#gradient-${isPositive ? 'green' : 'red'})`}
          />

          <path
            d={pathData}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {chartPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={isPositive ? '#10b981' : '#ef4444'}
              className="hover:r-5 transition-all duration-200"
            >
              <title>
                {formatDate(point.date)}: {formatPrice(point.price, currency)}
              </title>
            </circle>
          ))}

          <text
            x={padding - 10}
            y={padding + 5}
            textAnchor="end"
            className="text-xs fill-gray-500"
          >
            {formatPrice(maxPrice, currency)}
          </text>
          <text
            x={padding - 10}
            y={padding + chartHeight + 5}
            textAnchor="end"
            className="text-xs fill-gray-500"
          >
            {formatPrice(minPrice, currency)}
          </text>

          <text
            x={padding}
            y={height - 10}
            textAnchor="start"
            className="text-xs fill-gray-500"
          >
            {formatDate(chartPoints[0].date)}
          </text>
          <text
            x={padding + chartWidth}
            y={height - 10}
            textAnchor="end"
            className="text-xs fill-gray-500"
          >
            {formatDate(chartPoints[chartPoints.length - 1].date)}
          </text>
        </svg>
      </div>
    </div>
  )
}
