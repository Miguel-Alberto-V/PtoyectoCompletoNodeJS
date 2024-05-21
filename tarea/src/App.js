
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AgendaCrud from './AgendaCrud';
import AgregarEvento from './AgregarEvento';
import Editar from './Editar';

const App = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<AgendaCrud />} />
            <Route path="/insertar" element={<AgregarEvento />} />
            <Route path="/editar/:id" element={<Editar />} />
          </Routes>

  </Router> 
  );
}

export default App;
