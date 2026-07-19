import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Cases from './components/Cases/Cases'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div style={{ height: '100vh', backgroundColor: '#0a0a0a' }}>
            {/* Blank home page as requested */}
          </div>
        } />
        <Route path="/projects" element={<Cases />} />
      </Routes>
    </>
  )
}

export default App
