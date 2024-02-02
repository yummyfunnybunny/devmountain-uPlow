import '../../styles/layouts/benefits.css';

function Benefits() {
  return (
    <div className='benefits'>
      <h1 className='section__header'>
        How Does <span>uPlow</span> Help You?
      </h1>

      <div className='benefits__cards'>
        {/* Card 1 - [insert] */}
        <div className='benefits__card'>
          <div className='benefit__bg'>
            <img className='benefit__img' src='./benefit_1.jpg'></img>
          </div>
          <h2 className='section__subheader'>Reduce your Plowing Expenses</h2>
          {/* <p className='benefits__details'>blah blah blah blah</p> */}
        </div>

        {/* Card 2 - [insert] */}
        <div className='benefits__card'>
          <div className='benefit__bg'>
            <img className='benefit__img' src='./benefit_2.jpg'></img>
          </div>
          <h2 className='section__subheader'>Control Your Properties</h2>
          {/* <p className='benefits__details'>blah blah blah blah</p> */}
        </div>

        {/* Card 3 - [insert] */}
        <div className='benefits__card'>
          <div className='benefit__bg'>
            <img className='benefit__img' src='./benefit_3.jpg'></img>
          </div>
          <h2 className='section__subheader'>Instant Updates</h2>
          {/* <p className='benefits__details'>blah blah blah blah</p> */}
        </div>

        {/* Card 4 - [insert] */}
        <div className='benefits__card benefits__card--4'>
          <div className='benefit__bg'>
            <img className='benefit__img' src='./benefit_4.jpg'></img>
          </div>
          <h2 className='benefits__title'>Reviews</h2>
          {/* <p className='benefits__details'>blah blah blah blah</p> */}
        </div>
      </div>
    </div>
  );
}

export default Benefits;
