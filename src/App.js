import "./App.css";
import SinglePage from "./pages/SinglePage/SinglePage";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/Home/Home";
import Write from "./pages/Write/Write";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";


import { useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

function App() {

    const user = useSelector((state)=>state.user.currentUser);

    return ( 
    <Router>
        {/* <Topbar /> */}
        < Switch >
            <Route exact path = "/" >
                <Home />
            </Route>
            <Route  path = "/post/:postId" >
                    <SinglePage />
            </Route>
            <Route path = "/write" >
                {
                    user ? <Write />: <Login/>
                }
            </Route>
            <Route path = "/user" >
                {
                    user ? < User /> : <Login/>
                }
            </Route> 
            <Route path = "/login" >
                < Login />
                {
                    user && < Redirect to = "/" />
                }
            </Route>
            <Route path = "/register" >
                < Register />
                {
                    user && < Redirect to = "/" />
                }
            </Route>
        </Switch>
    </Router>
    )
}

export default App;