//import library for routing
import {Route, Routes, Navigate} from "react-router-dom";


//import pages
import Auth from "./Auth/index";
import Favorite from "./Favorite";
import Home from "./Home";
import Personal from "./Personal";
import NewsDetail from "./NewsDetail";
import PrivateRoute from "../components/PrivateRoute";


function Routing() {
    return (

        <Routes>
            {/*<Route path="/" element={<Navigate to="/auth" replace />} />*/}
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/personal" element={<PrivateRoute><Personal /></PrivateRoute>} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
}

export default Routing;