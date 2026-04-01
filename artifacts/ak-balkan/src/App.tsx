import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">🚗 AMK Balkan</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">Welcome</h2>
          <button onClick={() => setCount(count + 1)} className="bg-accent text-white px-4 py-2 rounded">
            Counter: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
