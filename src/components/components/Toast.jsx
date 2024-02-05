import '../../styles/components/toast.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Toast(props) {
  const dispatch = useDispatch();
  const reduxToast = useSelector((state) => state.toastReducer);
  console.log(reduxToast);

  useEffect(() => {
    const toast = document.querySelector('.toast');
    toast.classList.add(`glass-${reduxToast.color}`);
    setTimeout(() => {
      // console.log(toast);
      // const toast__bg = document.querySelector('.toast__bg');
      // const toast_children = toast__bg.childNodes;
      // toast_children.forEach((child) => {
      //   child.remove();
      // });
      // toast__bg.remove();
      dispatch({ type: 'RESET_TOAST' });
    }, 3000);
  }, []);

  return (
    // <container className='toast__bg'>
    <container className='toast'>
      <h1 className='toast__title'>{reduxToast.title}</h1>
      <p className='toast__message'>{reduxToast.message}</p>
    </container>
    // </container>
  );
}

export default Toast;
