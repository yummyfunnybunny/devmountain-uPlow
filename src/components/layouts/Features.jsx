import '../../styles/layouts/features.css';

function Features() {
  return (
    <div className='features glass-1'>
      <h1 className='section__header'>
        What Can <span>uPlow</span> Do For You?
      </h1>

      {/* Feature 1 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__frame--pic'>
            <img className='feature__img' src='./feature_1.jpg'></img>
          </div>
        </div>
        <div className='feature__content'>
          <div className='feature__frame--content glass-2'>
            <h2 className='section__subheader'>Quickly Manage Your Properties & Jobs</h2>
            <p className='feature__description'>blah blah blah blah</p>
          </div>
        </div>
      </div>

      {/* Feature 2 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <div className='feature__frame--content glass-2'>
            <h2 className='section__subheader'>Easily Compare Plowers, Jobs, & Prices</h2>
            <p className='feature__description'>blah blah blah blah</p>
          </div>
        </div>
        <div className='feature__pic'>
          <div className='feature__frame--pic'>
            <img className='feature__img' src='./feature_2.jpg'></img>
          </div>
        </div>
      </div>

      {/* Feature 3 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__frame--pic'>
            <img className='feature__img' src='./feature_3.jpg'></img>
          </div>
        </div>
        <div className='feature__content'>
          <div className='feature__frame--content glass-2'>
            <h2 className='section__subheader'>Graphically Track Your Stats</h2>
            <p className='feature__description'>blah blah blah blah</p>
          </div>
        </div>
      </div>

      {/* Feature 4 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <div className='feature__frame--content glass-2'>
            <h2 className='section__subheader'>Instantly Verify And Complete Work</h2>
            <p className='feature__description'>blah blah blah blah</p>
          </div>
        </div>
        <div className='feature__pic'>
          <div className='feature__frame--pic'>
            <img className='feature__img' src='./feature_4.jpg'></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
