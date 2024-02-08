import '../../styles/layouts/footer.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowplow, faFish, faPoo, faGhost, faBug } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className='footer glass-1'>
      <div className='footer__socials'>
        <FontAwesomeIcon className='footer__social-icon social__ghost' icon={faGhost} size='2x' />
        <FontAwesomeIcon className='footer__social-icon social__poo' icon={faPoo} size='2x' />
        <FontAwesomeIcon className='footer__social-icon social__fish' icon={faFish} size='2x' />
        <FontAwesomeIcon className='footer__social-icon social__bug' icon={faBug} size='2x' />
      </div>
      <div className='footer__center'>
        <FontAwesomeIcon className='footer__logo--icon' icon={faSnowplow} size='3x' />
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
