import '../../styles/layouts/features.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Features() {
  return (
    <div className='features glass-1'>
      <h1 className='section__header'>
        What Can <span>uPlow</span> Do For You?
      </h1>

      {/* Feature 1 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__img' style={{ backgroundImage: `url(${'feature_home.jpg'})` }}></div>
        </div>
        <div className='feature__content'>
          <h2 className='section__subheader'>Quickly Manage Your Properties & Jobs</h2>
          <ul className='feature__list'>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Create Properties and jobs
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Subscribe workers to your jobs
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Request or cancel service on your jobs
            </h4>
          </ul>
        </div>
      </div>

      {/* Feature 2 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <h2 className='section__subheader'>Easily Compare Plowers, Jobs, & Prices</h2>
          <ul className='feature__list'>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Use the interactive map to find workers and jobs
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Check reviews of workers and jobs
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Check the going rates for each worker and job
            </h4>
          </ul>
        </div>
        <div className='feature__pic'>
          <div className='feature__img' style={{ backgroundImage: `url(${'feature_shovel.jpg'})` }}></div>
        </div>
      </div>

      {/* Feature 3 - [insert] */}
      <div className='feature'>
        <div className='feature__pic'>
          <div className='feature__img' style={{ backgroundImage: `url(${'feature_plowing.jpg'})` }}></div>
        </div>
        <div className='feature__content'>
          <h2 className='section__subheader'>Graphically Track Your Stats</h2>
          <ul className='feature__list'>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; See your work and service history
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Look at graphical trends from your statistics
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; See your rating history to ehance your service
            </h4>
          </ul>
        </div>
      </div>

      {/* Feature 4 - [insert] */}
      <div className='feature'>
        <div className='feature__content'>
          <h2 className='section__subheader'>Instantly Verify And Complete Work</h2>
          <ul className='feature__list'>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Get live updates on your service requests
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Confirm job completions as they finish
            </h4>
            <h4 className='feature__item'>
              <FontAwesomeIcon icon={faSnowflake} />
              &nbsp; Make payments immediately upon job completion
            </h4>
          </ul>
        </div>
        <div className='feature__pic'>
          <div className='feature__img' style={{ backgroundImage: `url(${'feature_skate.jpg'})` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Features;
