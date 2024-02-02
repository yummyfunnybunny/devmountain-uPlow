import { NavLink } from 'react-router-dom';

import '../../styles/layouts/hero.css';

function Hero() {
  return (
    <div className='hero'>
      <div className='hero__bg'>
        <img className='hero__img' src='./hero-img.jpg'></img>
      </div>
      <div className='hero__content'>
        <div className='hero__left'>
          <h1 className='hero__title'>uPlow</h1>
          <h2 className='hero__slogan'>An app that helps you easily connect plowers and property owners in need!</h2>
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
