import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboards from './pages/Dashboards'
import Research from './pages/Research'
import About from './pages/About'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App
