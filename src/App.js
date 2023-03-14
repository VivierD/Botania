import './App.css';
import { LeafData } from './modules/leap'; 
import { MyLines, My3Lines } from './components/components';
import Audio from './modules/Audio';

const App = () => {
  const {connect, isConnected, dataFilter, dataNorm, dataMax, dataMin} = LeafData();
  return(
  <div className='App'>
    <div className='button'>
    {isConnected ? <button>disconnect</button> : 
    (<button onClick={connect}>Connect</button>)
    }
    </div>
    <Audio />
      <MyLines id ="Normalisé" dataNorm={dataNorm} />
      <My3Lines id ="Filtré" dataFilter={dataFilter} dataMin={dataMin} dataMax={dataMax}/>
  </div>)
}

export default App;
