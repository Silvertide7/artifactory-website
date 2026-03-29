import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Artifactory } from './pages/Artifactory'
import { JsonBuilder } from './pages/JsonBuilder'
import { Homebound } from './pages/Homebound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artifactory" element={<Artifactory />} />
          <Route path="artifactory/config-generator" element={<JsonBuilder />} />
          <Route path="homebound" element={<Homebound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
