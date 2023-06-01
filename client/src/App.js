import './style.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './components/Home';
import Edit from './components/Edit';
import { Switch, Route } from "react-router-dom"


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>

    </>
  );
}

export default App;