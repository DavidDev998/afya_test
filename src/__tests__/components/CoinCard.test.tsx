import { render, screen, fireEvent } from '@testing-library/react'
import { CoinCard } from '@/components/CoinCard'
import { Coin } from '@/types/coin'

const mockCoin: Coin = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://example.com/bitcoin.png',
  current_price: 250000,
  market_cap: 5000000000,
  market_cap_rank: 1,
  fully_diluted_valuation: 5500000000,
  total_volume: 150000000,
  high_24h: 255000,
  low_24h: 245000,
  price_change_24h: 5000,
  price_change_percentage_24h: 2.04,
  market_cap_change_24h: 100000000,
  market_cap_change_percentage_24h: 2.04,
  circulating_supply: 19000000,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 345000,
  ath_change_percentage: -27.54,
  ath_date: '2021-11-10T14:24:11.849Z',
  atl: 340,
  atl_change_percentage: 73645.72,
  atl_date: '2013-07-06T00:00:00.000Z',
  roi: null,
  last_updated: '2024-01-01T00:00:00.000Z',
}

describe('CoinCard', () => {
  it('should render coin information correctly', () => {
    render(<CoinCard coin={mockCoin} />)

    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('btc')).toBeInTheDocument()
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('R$250,000.00')).toBeInTheDocument()
    expect(screen.getByText('+2.04%')).toBeInTheDocument()
  })

  it('deve exibir o preço de compra em verde', () => {
    render(<CoinCard coin={mockCoin} />)

    const priceChange = screen.getByText('+2.04%')
    expect(priceChange).toHaveClass('text-green-600')
  })

  it('deve exibir o preço de compra em vermelho', () => {
    const negativeCoin = {
      ...mockCoin,
      price_change_percentage_24h: -5.25,
    }

    render(<CoinCard coin={negativeCoin} />)

    const priceChange = screen.getByText('-5.25%')
    expect(priceChange).toHaveClass('text-red-600')
  })

  it('deve formatar números grandes corretamente', () => {
    render(<CoinCard coin={mockCoin} />)

    expect(screen.getByText('$5.00B')).toBeInTheDocument()
    expect(screen.getByText('$150.00M')).toBeInTheDocument()
  })

  it('deve exibir o preço máximo e mínimo de 24h', () => {
    render(<CoinCard coin={mockCoin} />)

    expect(
      screen.getByText(/Máximo \(24h\): R\$255,000\.00/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Mínimo \(24h\): R\$245,000\.00/)
    ).toBeInTheDocument()
  })

  it('deve chamar onClick quando o card é clicado', () => {
    const handleClick = jest.fn()
    render(<CoinCard coin={mockCoin} onClick={handleClick} />)

    const cardContainer = screen.getByText('Bitcoin').closest('.bg-white')
    fireEvent.click(cardContainer!)

    expect(handleClick).toHaveBeenCalledWith(mockCoin)
  })

  it('não deve ser clicável quando onClick não é fornecido', () => {
    render(<CoinCard coin={mockCoin} />)

    const cardContainer = screen.getByText('Bitcoin').closest('.bg-white')
    expect(cardContainer).not.toHaveClass('cursor-pointer')
  })

  it('deve ter efeitos de hover quando clicável', () => {
    const handleClick = jest.fn()
    render(<CoinCard coin={mockCoin} onClick={handleClick} />)

    const cardContainer = screen.getByText('Bitcoin').closest('.bg-white')
    expect(cardContainer).toHaveClass('cursor-pointer')
    expect(cardContainer).toHaveClass('hover:border-blue-300')
  })

  it('deve renderizar a imagem da moeda com o texto correto', () => {
    render(<CoinCard coin={mockCoin} />)

    const image = screen.getByAltText('Bitcoin')
    expect(image).toBeInTheDocument()
  })

  it('deve lidar com valores zero com elegância', () => {
    const zeroCoin = {
      ...mockCoin,
      market_cap: 0,
      total_volume: 0,
      price_change_percentage_24h: 0,
    }

    render(<CoinCard coin={zeroCoin} />)

    const naElements = screen.getAllByText('N/A')
    expect(naElements.length).toBeGreaterThan(0)
    expect(naElements.length).toBeGreaterThanOrEqual(3)
  })

  it('deve lidar com valores nulos com elegância', () => {
    const nullCoin = {
      ...mockCoin,
      market_cap: null as any,
      total_volume: null as any,
      price_change_percentage_24h: null as any,
    }

    render(<CoinCard coin={nullCoin} />)

    const naElements = screen.getAllByText('N/A')
    expect(naElements.length).toBeGreaterThan(0)
  })
})
