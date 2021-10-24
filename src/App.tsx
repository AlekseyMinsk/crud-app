import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./LoginRegister";
import Logout from "./Logout";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={LoginRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />        
        <Route path='/article/:id' component={Article} />
        <Route path="/" exact component={ArticleList} />
      </Switch>
    </Router>
  );
}

export default App;
