//import library for routing
import {BrowserRouter} from "react-router-dom";

//import Routing component
import Routing from "./pages/routing";
import {ToastContainer} from "react-toastify";
import  "react-toastify/dist/ReactToastify.css"
function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <ToastContainer/>
              <Routing/>
          </div>
      </BrowserRouter>
  );
}

export default App;
