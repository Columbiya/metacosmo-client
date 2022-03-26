import { observer } from 'mobx-react-lite'
import Header from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom'
import { ADMIN_PATH, NEWS_PATH, ARTICLES_PATH } from './consts';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import News from './components/News/News';
import Articles from './components/Articles/Articles';

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path={NEWS_PATH} element={<News />} />
        <Route path={ARTICLES_PATH} element={<Articles />} />
        <Route index element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
