import { Route, Switch } from "react-router";
import { AppStyles } from "./app.styles";
import GlobalStyles from "./globalStyles";
import Home from "./Pages/Home/Home";
import Lesson from "./Pages/lesson/Lesson";
import Login from "./Pages/login/Login";
import PrivateRoute from './components/private-route/PrivateRoute'

function App() {

  return (
    <AppStyles>
      <GlobalStyles />
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/:lesson' component={Lesson}/>
      </Switch>
    </AppStyles>
  );
}

export default App;
