import { NavLink } from 'react-router-dom';

import '../../styles/layouts/hero.css';

function Hero() {
  return (
    <div className='hero'>
      <div className='hero__bg'>
        <img
          className='hero__img'
          src='https://wallpapers.com/images/hd/snowplow-1920-x-1080-wallpaper-92c9mfv6oblv7d17.jpg'
        ></img>
      </div>
      <div className='hero__content'>
        <div className='hero__left'>
          <h1 className='hero__title'>uPlow</h1>
          <h3 className='hero__slogan'>snow removal servicing, mondernized</h3>
        </div>
        <div className='hero__right'>
          <h1>Get started now!</h1>
          <div className='hero__cta'>
            <NavLink to='/signup'>
              <button className='btn btn__cta1 btn--lg'>Sign Up</button>
            </NavLink>
            <NavLink to='/login'>
              <button className='btn btn__cta2 btn--lg'>Login</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
