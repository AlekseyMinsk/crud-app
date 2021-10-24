import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav'; 
import Footer from './Footer';
import Article from './Article';
import ArticleList from './ArticleList';
import Editor from './Editor';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profiles/:username" exact component={Profile} />        
        <Route path="/article/:id" component={Article} />
        <Route path="/" exact component={ArticleList} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
