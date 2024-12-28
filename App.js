import './App.css';
import ImageDetail from './ImageDetail';
import ImageGallary from './ImageGallary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ImageGallary />} />
          <Route path='/:id' element={<ImageDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;