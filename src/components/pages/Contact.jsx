import '../../styles/pages/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    <container className='page__container'>
      <container className='page__section'>
        <div className='contact__container'>
          <div className='contact__methods'>
            {/* PHONE */}
            <div className='contact__method glass-1'>
              <div className='contact__icon'>
                <FontAwesomeIcon icon={faPhone} size='3x' />
              </div>
              <div className='contact__content'>
                <div className='contact__title'>
                  <h2>Phone Number</h2>
                </div>
                <div className='contact__detail'>
                  <p>(555)-555-5555</p>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className='contact__method glass-1'>
              <div className='contact__icon'>
                <FontAwesomeIcon icon={faEnvelope} size='3x' />
              </div>
              <div className='contact__content'>
                <div className='contact__title'>
                  <h2>Email</h2>
                </div>
                <div className='contact__detail'>
                  <p>contactus@uplow.com</p>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className='contact__method glass-1'>
              <div className='contact__icon'>
                <FontAwesomeIcon icon={faLocationDot} size='3x' />
              </div>
              <div className='contact__content'>
                <div className='contact__title'>
                  <h2>Address</h2>
                </div>
                <div className='contact__detail'>
                  <p>1550 Digitcal Dr #400</p>
                  <p>Lehi, UT 84043</p>
                </div>
              </div>
            </div>

            {/* FAX */}
            <div className='contact__method glass-1'>
              <div className='contact__icon'>
                <FontAwesomeIcon icon={faFax} size='3x' />
              </div>
              <div className='contact__content'>
                <div className='contact__title'>
                  <h2>Fax Number</h2>
                </div>
                <div className='contact__detail'>
                  <p>(555)-555-5555</p>
                </div>
              </div>
            </div>
          </div>
          <div className='contact__form'>
            <form className='form--contact glass-1'>
              <h1 className='form__header'>Send Us A Message!</h1>
              <container className='form__column glass-2'>
                {/* NAME */}
                <container className='form__row'>
                  <label className='form__label' htmlFor='name'>
                    Name:&emsp;
                  </label>
                  <input
                    className='form__input'
                    id='name'
                    name='name'
                    required
                    autoFocus
                    // defaultValue={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </container>

                {/* EMAIL */}
                <container className='form__row'>
                  <label className='form__label' htmlFor='email'>
                    Email:&emsp;
                  </label>
                  <input
                    className='form__input'
                    id='email'
                    name='email'
                    required
                    // defaultValue={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </container>

                {/* Details */}
                <container className='form__row'>
                  <label className='form__label' htmlFor='details'>
                    details:&emsp;
                  </label>
                  <textarea
                    className='form__input'
                    id='details'
                    name='details'
                    required
                    // defaultValue={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  ></textarea>
                </container>
              </container>

              {/* BUTTON */}
              <container className='form__row form__row--btn'>
                <button className='btn btn--md btn__success' type='submit'>
                  Submit
                </button>
              </container>
            </form>
          </div>
        </div>
      </container>
    </container>
  );
}

export default Contact;
