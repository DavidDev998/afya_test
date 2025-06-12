'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCoins, useSearchCoins } from '@/hooks/useCoins'
import { CoinCard } from '@/components/CoinCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Coin } from '@/types/coin'

export default function CoinsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(20)
  const [currency] = useState('BRL')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (debouncedQuery) {
      setPage(1)
    }
  }, [debouncedQuery])

  const {
    data: marketCoins,
    isLoading: isLoadingMarket,
    error: marketError,
    refetch: refetchMarket,
    isFetching: isFetchingMarket,
  } = useCoins(page, perPage, currency, {
    enabled: !debouncedQuery || debouncedQuery.length < 2,
  })

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: searchError,
    refetch: refetchSearch,
  } = useSearchCoins(debouncedQuery, {
    enabled: debouncedQuery.length >= 2,
  })

  const handleCoinClick = (coin: Coin) => {
    router.push(`/coins/${coin.id}`)
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
  }

  const isSearchMode = debouncedQuery && debouncedQuery.length >= 2
  const coins = isSearchMode ? searchResults?.coins || [] : marketCoins || []
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingMarket
  const error = isSearchMode ? searchError : marketError
  const refetch = isSearchMode ? refetchSearch : refetchMarket

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Mercado de Criptomoedas
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Acompanhe os preços e dados do mercado de criptomoedas
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Pesquisar criptomoedas por nome ou símbolo..."
            value={searchQuery}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            {isSearchMode ? (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Resultados da pesquisa para &quot;{debouncedQuery}&quot;
              </h2>
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Principais Criptomoedas por Capitalização de Mercado
              </h2>
            )}
            {!isLoading && coins.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isSearchMode
                  ? `Encontrados ${coins.length} resultado${coins.length !== 1 ? 's' : ''}`
                  : `Exibindo ${coins.length} criptomoedas (Página ${page})`}
              </p>
            )}
          </div>
          {isLoading && <LoadingSpinner size="sm" />}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                {isSearchMode
                  ? 'Pesquisando criptomoedas...'
                  : 'Carregando dados de criptomoedas...'}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <ErrorMessage
              title={
                isSearchMode
                  ? 'Pesquisa falhou'
                  : 'Falha ao carregar dados de criptomoedas'
              }
              message={error.message || 'Algo deu errado ao buscar dados.'}
              onRetry={() => refetch()}
              className="max-w-md"
            />
          </div>
        )}

        {!isLoading && !error && coins.length === 0 && (
          <div className="text-center py-12">
            {isSearchMode ? (
              <>
                <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">
                  🔍
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-1">
                  Nenhuma criptomoeda encontrada para &quot;{debouncedQuery}
                  &quot;
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tente pesquisar com um nome ou símbolo diferente
                </p>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Não há dados de criptomoedas disponíveis
              </p>
            )}
          </div>
        )}

        {!isLoading && !error && coins.length > 0 && (
          <>
            {!isSearchMode && isFetchingMarket && !isLoadingMarket && (
              <div className="fixed top-4 right-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center space-x-2 border border-gray-200 dark:border-gray-700">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Atualizando...
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {coins.map(coin => (
                <CoinCard key={coin.id} coin={coin} onClick={handleCoinClick} />
              ))}
            </div>

            {!isSearchMode && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1 || isFetchingMarket}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>

                <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  Página {page}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={isFetchingMarket}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
