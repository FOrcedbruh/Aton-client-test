import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const App: React.FC = () => {


    return (
        <>
            <Routes>
                <Route path="/auth/registration" element={<Registration />}/>
                <Route path="/auth/login" element={<Login />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
        </>
    )
}

export default App;
