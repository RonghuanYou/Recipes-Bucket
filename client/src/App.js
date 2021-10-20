import './App.css';
import {Switch, Route} from 'react-router-dom'

import Main from './components/Main'
import Create from './components/Create'
import Recipes from './components/Recipes'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/new">
          <Create />
        </Route>

        <Route exact path="/recipes">
          <Recipes />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>





  

      </Switch>
    </div>
  );
}

export default App;
