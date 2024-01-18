import '../../styles/layouts/features.css';

function Features() {
  return (
    <div className='features'>
      <h1 className='features__header'>Features</h1>

      {/* Feature 1 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__frame'>
            <img className='feature__img' src='./feature_1.jpg'></img>
          </div>
        </div>
        <div className='feature__content'>
          <h2 className='feature__title'>Feature 1</h2>
          <p className='feature__description'>blah blah blah blah</p>
        </div>
      </div>

      {/* Feature 2 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <h2 className='feature__title'>Feature 2</h2>
          <p className='feature__description'>blah blah blah blah</p>
        </div>
        <div className='feature__pic'>
          <div className='feature__frame'>
            <img className='feature__img' src='./feature_2.jpg'></img>
          </div>
        </div>
      </div>

      {/* Feature 3 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__frame'>
            <img className='feature__img' src='./feature_3.jpg'></img>
          </div>
        </div>
        <div className='feature__content'>
          <h2 className='feature__title'>Feature 3</h2>
          <p className='feature__description'>blah blah blah blah</p>
        </div>
      </div>

      {/* Feature 4 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <h2 className='feature__title'>Feature 4</h2>
          <p className='feature__description'>blah blah blah blah</p>
        </div>
        <div className='feature__pic'>
          <div className='feature__frame'>
            <img className='feature__img' src='./feature_4.jpg'></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
