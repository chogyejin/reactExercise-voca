import Header from './component/Header';
import DayList from './component/DayList';
import Day from './component/Day';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <DayList />
          </Route>
          <Route path="/day/:day">
            <Day />
          </Route>
          <Route path="/create_word">
            <CreateWord />
          </Route>
          <Route path="/create_day">
            <CreateDay />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
