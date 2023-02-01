import { NavLink, Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <NavLink to="/">Homepage</NavLink>
            <NavLink to="test">TestPage</NavLink>
          </ul>
        </nav>
      </header>
      <main>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <footer>some footer</footer>
    </>
  );
}

export default MainLayout;
