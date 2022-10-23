import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shoppinglist from "./pages/Shoppinglist";
import Tasklist from "./pages/Tasklist";
import Header from "./component/Header";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Shoppinglist />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tasklist" element={<Tasklist />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
