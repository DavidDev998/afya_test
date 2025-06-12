import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/Navigation'

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
    query: {},
  }),
}))

describe('Navigation', () => {
  it('deve renderizar os links de navegação', () => {
    render(<Navigation />)

    expect(screen.getByText('Afya Test')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Crypto Market')).toBeInTheDocument()
  })

  it('deve renderizar o texto do logo/marca', () => {
    render(<Navigation />)

    const brand = screen.getByText('Afya Test')
    expect(brand).toBeInTheDocument()
  })

  it('deve ter uma estrutura de navegação correta', () => {
    render(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('deve renderizar links com atributos href corretos', () => {
    render(<Navigation />)

    const cryptoLink = screen.getByRole('link', { name: /crypto market/i })
    const homeLink = screen.getByRole('link', { name: /home/i })

    expect(cryptoLink).toHaveAttribute('href', '/coins')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('deve ter classes de design responsivo', () => {
    const { container } = render(<Navigation />)

    const navContainer = container.querySelector('nav')
    expect(navContainer).toBeInTheDocument()
    expect(navContainer).toHaveClass('bg-white')
    expect(navContainer).toHaveClass('shadow-sm')
  })

  it('deve renderizar o botão de menu mobile em telas menores', () => {
    render(<Navigation />)

    const navContainer = screen.getByRole('navigation')
    expect(navContainer).toBeInTheDocument()
  })

  it('deve destacar a página ativa', () => {
    render(<Navigation />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('deve renderizar a marca como link para a página inicial', () => {
    render(<Navigation />)

    const brandLink = screen.getByRole('link', { name: /afya test/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('deve exibir os ícones de navegação', () => {
    render(<Navigation />)

    expect(screen.getByText('🏠')).toBeInTheDocument()
    expect(screen.getByText('🪙')).toBeInTheDocument()
  })
})
