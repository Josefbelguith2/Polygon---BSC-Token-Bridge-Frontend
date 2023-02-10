import { Switch, Route } from 'react-router';

// pages
import Bridge from 'pages/Bridge';

// components
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';

// styles
import classes from 'App.module.scss';

function App() {
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.innercontainer}>
        <Switch>
          <Route path="/" component={Bridge} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
