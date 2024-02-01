import '../../styles/layouts/footer.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowplow } from '@fortawesome/free-solid-svg-icons';
// faFaceSmile,
// faUser,
// ,
// faXTwitter,
// faStackOverflow,
// faYoutube,
// faInstagram,
function Footer() {
  return (
    <div className='footer glass-1'>
      <div className='footer__socials'>
        <FontAwesomeIcon className='footer__social-icon' icon={faSnowplow} size='2x' />
        <FontAwesomeIcon className='footer__social-icon' icon={faSnowplow} size='2x' />
        <FontAwesomeIcon className='footer__social-icon' icon={faSnowplow} size='2x' />
        <FontAwesomeIcon className='footer__social-icon' icon={faSnowplow} size='2x' />
      </div>
      <div className='footer__center'>
        <FontAwesomeIcon className='navbar__logo--icon' icon={faSnowplow} size='3x' />
        <p>&#169; 2024 Jake Nichols USA, inc. All rights reserved.</p>
      </div>
      <div className='footer__links'>
        <NavLink className='footer__link' to='/'>
          Home
        </NavLink>
        <NavLink className='footer__link' to='/Contact'>
          Contact
        </NavLink>
        <NavLink className='footer__link' to='/Help'>
          Help
        </NavLink>
        <NavLink className='footer__link' to='/Faq'>
          FAQ
        </NavLink>
        <NavLink className='footer__link' to='/Signup'>
          Signup
        </NavLink>
        <NavLink className='footer__link' to='/Login'>
          Login
        </NavLink>
        <NavLink className='footer__link' to='/dashboard'>
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
