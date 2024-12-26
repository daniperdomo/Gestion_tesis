import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Info from './pages/Info';
import Home from './pages/home';
import Versa from './pages/versa';



function App() {
  return (
  <>
      <Router>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/info' element={<Info/>}/>
              <Route path='/:title' element={<Versa/>}/>
          </Routes>
      </Router>
  </>
  )
}

export default App