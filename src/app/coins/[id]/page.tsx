'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCoinDetails, useCoinMarketChart } from '@/hooks/useCoins'
import { PriceChart } from '@/components/PriceChart'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import Image from 'next/image'

export default function CoinDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const coinId = params.id as string
  const currency = 'BRL'

  const {
    data: coinDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useCoinDetails(coinId, currency)

  const {
    data: chartData,
    isLoading: isLoadingChart,
    error: chartError,
    refetch: refetchChart,
  } = useCoinMarketChart(coinId, currency, 7)

  const handleGoBack = () => {
    router.back()
  }

  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (detailsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorMessage
          title="Erro ao carregar detalhes da moeda"
          message={
            detailsError.message ||
            'Algo deu errado ao buscar os dados da moeda.'
          }
          onRetry={() => refetchDetails()}
          className="max-w-md"
        />
      </div>
    )
  }

  if (!coinDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Moeda não encontrada</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Voltar para a lista de moedas</span>
          </button>

          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src={coinDetails.image}
                alt={coinDetails.name}
                fill
                className="rounded-full"
                sizes="64px"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {coinDetails.name}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-lg text-gray-600 uppercase">
                  {coinDetails.symbol}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Rank #{coinDetails.market_cap_rank}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          {isLoadingChart ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <LoadingSpinner size="md" className="mb-2" />
              <p className="text-gray-600">Carregando dados do gráfico...</p>
            </div>
          ) : chartError ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ErrorMessage
                title="Erro ao carregar gráfico"
                message={
                  chartError.message || 'Não foi possível carregar o gráfico'
                }
                onRetry={() => refetchChart()}
              />
            </div>
          ) : chartData ? (
            <PriceChart data={chartData} currency={currency} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
