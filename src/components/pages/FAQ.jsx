import '../../styles/pages/faq.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function FAQ() {
  const faqExpand = (e) => {
    const clicked = e.target.closest('.faq');
    document.querySelectorAll('.faq').forEach((faq) => {
      if (faq !== clicked) {
        faq.classList.remove('expand');
      }
    });
    clicked.classList.toggle('expand');
  };

  return (
    <div className='page__container'>
      <div className='page__section'>
        <div className='faq__container'>
          <h1 className='section__header'>
            Frequently asked <span>uPlow</span> Questions
          </h1>
          <div className='faqs '>
            {/* QUESTION */}
            <div className='feaq '>
              <div className='faq__question glass-1'>
                <h1>What if a customer wont pay?</h1>
                <button className='faq__btn' onClick={(e) => faqExpand(e)}>
                  <FontAwesomeIcon icon={faChevronDown} size='2x' style={{ color: 'rgb(238, 238, 238)' }} />
                </button>
              </div>
              <div className='faq__answer glass-2'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Vitae justo eget magna fermentum. Vitae ultricies leo integer malesuada nunc vel.
                </p>
              </div>
            </div>

            {/* QUESTION */}
            <div className='faq'>
              <div className='faq__question glass-1'>
                <h1>Can I have mutliple jobs associated with one property?</h1>
                <button className='faq__btn' onClick={(e) => faqExpand(e)}>
                  <FontAwesomeIcon icon={faChevronDown} size='2x' style={{ color: 'rgb(238, 238, 238)' }} />
                </button>
              </div>
              <div className='faq__answer glass-2'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Vitae justo eget magna fermentum. Vitae ultricies leo integer malesuada nunc vel.
                </p>
              </div>
            </div>

            {/* QUESTION */}
            <div className='faq'>
              <div className='faq__question glass-1'>
                <h1>How do I delete my account?</h1>
                <button className='faq__btn' onClick={(e) => faqExpand(e)}>
                  <FontAwesomeIcon icon={faChevronDown} size='2x' style={{ color: 'rgb(238, 238, 238)' }} />
                </button>
              </div>
              <div className='faq__answer glass-2'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Vitae justo eget magna fermentum. Vitae ultricies leo integer malesuada nunc vel.
                </p>
              </div>
            </div>

            {/* QUESTION */}
            <div className='faq '>
              <div className='faq__question glass-1'>
                <h1>Can I be a plower and a customer?</h1>
                <button className='faq__btn' onClick={(e) => faqExpand(e)}>
                  <FontAwesomeIcon icon={faChevronDown} size='2x' style={{ color: 'rgb(238, 238, 238)' }} />
                </button>
              </div>
              <div className='faq__answer glass-2'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Vitae justo eget magna fermentum. Vitae ultricies leo integer malesuada nunc vel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
