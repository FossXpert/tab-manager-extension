import { Toaster } from 'react-hot-toast';
import Popup from './components/popup/popup';
import './index.css'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Popup/>
    </>
  );
}

export default App;
