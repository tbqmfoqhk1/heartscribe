import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import CreateLetter from './pages/CreateLetter'
import ResultPage from './pages/ResultPage'
import DebugPage from './pages/DebugPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateLetter />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/debug" element={<DebugPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
