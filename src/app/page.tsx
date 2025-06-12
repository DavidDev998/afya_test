import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Teste técnico Afya
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Esta é uma aplicação Next.js com TypeScript, React Query para busca de
          dados, configuração completa de testes e conteinerização com Docker.
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <Link
            href="/coins"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 text-center min-w-[200px]"
          >
            <div className="text-2xl mb-2">🪙</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Dashboard de Criptomoedas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visualize preços e dados de mercado de criptomoedas em tempo real
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
