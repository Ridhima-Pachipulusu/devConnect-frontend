import { Route, BrowserRouter, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
