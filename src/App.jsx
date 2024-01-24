import { Outlet } from 'react-router-dom';
import Navbar from './components/components/Navbar.jsx';
import Footer from './components/layouts/Footer.jsx';
import Modal from './components/components/Modal.jsx';
import { useSelector } from 'react-redux';

function App() {
  const modal = useSelector((state) => state.modalReducer.modalType);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {modal !== 'NONE' ? <Modal /> : <></>}
    </>
  );
}

export default App;
