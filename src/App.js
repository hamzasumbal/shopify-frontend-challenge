import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import DetailsModal from './components/Modal';

function App() {
  return (
    <div className="App">
      <Header/>
      <Cards/>
      <DetailsModal/>
    </div>
  );
}

export default App;
