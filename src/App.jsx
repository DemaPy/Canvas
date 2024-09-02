import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas } from './components/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas />
    </>
  )
}

export default App
