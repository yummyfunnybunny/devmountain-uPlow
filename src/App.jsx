import { Outlet } from 'react-router-dom';
import Navbar from './components/components/Navbar.jsx';
import Footer from './components/layouts/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
