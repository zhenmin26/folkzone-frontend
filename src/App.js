import { Landing } from "./components/Landing";
import Main from "./components/Main";
import { Profile } from "./components/Profile";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}


export default App;