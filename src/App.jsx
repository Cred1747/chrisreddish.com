import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboards from './pages/Dashboards'
import Research from './pages/Research'
import About from './pages/About'
import BourbonExplorer from './pages/BourbonExplorer'
import BertExplorer from './pages/BertExplorer'
import UtilityDashboard from './pages/UtilityDashboard'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/research" element={<Research />} />
          <Route path="/about" element={<About />} />
          <Route path="/bourbon" element={<BourbonExplorer />} />
          <Route path="/bert" element={<BertExplorer />} />
          <Route path="/utility" element={<UtilityDashboard />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
