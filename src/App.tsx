import './App.css';
import Catalog from './Components/Catalog';
import { Provider, darkTheme } from '@adobe/react-spectrum';
function App() {
  return (
    <Provider theme={darkTheme}>
    <Catalog />
    </Provider>
  );
}

export default App;
