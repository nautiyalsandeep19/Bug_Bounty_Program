import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import ProgramDetail from './components/Programs/ProgramData/ProgramMainDetail'
import ProgramList from './components/Programs/ProgramDetails/ProgramList'
import {Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
   <Navbar/>
   <div className="bg-gray-50">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/program/:slug" element={<ProgramDetail />} />
        </Routes>
    </div>
    </>
  )
}

export default App
