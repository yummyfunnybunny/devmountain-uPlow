import Hero from '../layouts/Hero.jsx';
import Features from '../layouts/Features.jsx';
import Benefits from '../layouts/Benefits.jsx';
import Testimonials from '../layouts/Testimonials.jsx';
import Promotions from '../layouts/Promotions.jsx';

function Home() {
  return (
    <container className='page__container'>
      <container className='page__section'>
        <Hero />
      </container>
      <container className='page__section'>
        <Features />
      </container>
      <container className='page__section'>
        <Benefits />
      </container>
      <container className='page__section'>
        <Testimonials />
      </container>
      <container className='page__section'>
        <Promotions />
      </container>
    </container>
  );
}

export default Home;
