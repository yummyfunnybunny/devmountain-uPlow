import Hero from '../layouts/Hero.jsx';
import Features from '../layouts/Features.jsx';
import Benefits from '../layouts/Benefits.jsx';
import Testimonials from '../layouts/Testimonials.jsx';
import Promotions from '../layouts/Promotions.jsx';

function Home() {
  return (
    <container className='page-container'>
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <Promotions />
    </container>
  );
}

export default Home;
