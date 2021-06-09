import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Portfolio from "./components/Portfolio";
import PnL from "./components/PnL";
import Login from "./components/Login";
import StockMarket from "./components/StockMarket";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Portfolio} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/pnl" component={PnL} />
        <Route path="/login" component={Login} />
        <Route path="/stockmarket" component={StockMarket} />
        <Route path="/createuser" component={CreateUser} />
      </Switch>
    </main>
  );
}

export default App;
