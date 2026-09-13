import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<div className="p-8 text-center text-2xl font-bold">DOCPath - Coming Soon</div>} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App
