import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import PopularBattle from "./pages/Popular-battle";
import Popular from "./pages/Popular";
import WeeklyBattle from "./pages/Weekly-battle";
import Weekly from "./pages/Weekly";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">Homepage |</Link>
          <Link to="/weekly">Weekly |</Link>
          <Link to="/weekly-battle">Weekly battle |</Link>
          <Link to="/popular">Popular |</Link>
          <Link to="/popular-battle">Popular battle |</Link>
          <Link to="/favorites">Favorites |</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/weekly" component={Weekly} />
          <Route exact path="/weekly-battle" component={WeeklyBattle}/>
          <Route exact path="/popular" component={Popular} />
          <Route exact path="/popular-battle" component={PopularBattle} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;