import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Detail from './pages/Detail'
import NotFoundPage from './pages/NotFoundPage'
import Reveall from './components/Detail/Reveall'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/prezentations/:id' element={<Detail />} />
        <Route path='/reveal' element={<Reveall />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
