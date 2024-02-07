import '../../styles/layouts/benefits.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faBoltLightning, faGamepad } from '@fortawesome/free-solid-svg-icons';

function Benefits() {
  return (
    <div className='benefits'>
      <h1 className='section__header'>
        How Does <span>uPlow</span> Help You?
      </h1>

      <div className='benefits__cards'>
        <div className='benefit__card-container'>
          <div className='benefit__card'>
            <div className='benefit__front glass-1' style={{ border: '5px solid #00ff77' }}>
              <FontAwesomeIcon icon={faPiggyBank} size='10x' style={{ color: '#00ff77' }} />
            </div>
            <div className='benefit__back glass-2'>
              <h1>Reduce Cost</h1>
              <h3>Find the best prices that can help you save money</h3>
            </div>
          </div>
        </div>

        <div className='benefit__card-container'>
          <div className='benefit__card'>
            <div className='benefit__front glass-1' style={{ border: '5px solid #d0cd02' }}>
              <FontAwesomeIcon icon={faBoltLightning} size='10x' style={{ color: '#d0cd02' }} />;
            </div>
            <div className='benefit__back glass-2'>
              <h1>Fast Response Times</h1>
              <h3>Find workers as soon as you need it and request immediate service</h3>
            </div>
          </div>
        </div>

        <div className='benefit__card-container'>
          <div className='benefit__card'>
            <div className='benefit__front glass-1' style={{ border: '5px solid #d07702' }}>
              <FontAwesomeIcon icon={faGamepad} size='10x' style={{ color: '#d07702' }} />
            </div>
            <div className='benefit__back glass-2'>
              <h1>Total Control</h1>
              <h3>You can control every aspect of the plowing process</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
