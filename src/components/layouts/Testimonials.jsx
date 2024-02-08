import '../../styles/layouts/testimonials.css';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSnowflake, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

function Testimonials() {
  useEffect(() => {
    // inits
    let carousel = document.querySelector('.carousel');
    let carouselInner = document.querySelector('.carousel__inner');
    let prev = document.querySelector('.carousel__controls .carousel__prev');
    let next = document.querySelector('.carousel__controls .carousel__next');
    let slides = document.querySelectorAll('.carousel__inner .carousel__item');
    let totalSlides = slides.length;
    let step = 100 / totalSlides;
    let activeSlide = 0;
    let activeIndicator = 0;
    let direction = -1;
    let jump = 1;
    let interval = 5000;
    let time;

    //Init carousel
    carouselInner.style.minWidth = totalSlides * 100 + '%';
    loadIndicators();
    // loop(true);

    //Carousel events
    next.addEventListener('click', () => {
      slideToNext();
    });

    prev.addEventListener('click', () => {
      slideToPrev();
    });

    carouselInner.addEventListener('transitionend', () => {
      if (direction === -1) {
        if (jump > 1) {
          for (let i = 0; i < jump; i++) {
            activeSlide++;
            carouselInner.append(carouselInner.firstElementChild);
          }
        } else {
          activeSlide++;
          carouselInner.append(carouselInner.firstElementChild);
        }
      } else if (direction === 1) {
        if (jump > 1) {
          for (let i = 0; i < jump; i++) {
            activeSlide--;
            carouselInner.prepend(carouselInner.lastElementChild);
          }
        } else {
          activeSlide--;
          carouselInner.prepend(carouselInner.lastElementChild);
        }
      }

      carouselInner.style.transition = 'none';
      carouselInner.style.transform = 'translateX(0%)';
      setTimeout(() => {
        jump = 1;
        carouselInner.style.transition = 'all ease .5s';
      });
      updateIndicators();
    });

    document.querySelectorAll('.carousel__indicators span').forEach((item) => {
      item.addEventListener('click', (e) => {
        let slideTo = parseInt(e.target.dataset.slideTo);

        let indicators = document.querySelectorAll('.carousel__indicators span');

        indicators.forEach((item, index) => {
          if (item.classList.contains('active')) {
            activeIndicator = index;
          }
        });

        if (slideTo - activeIndicator > 1) {
          jump = slideTo - activeIndicator;
          step = jump * step;
          slideToNext();
        } else if (slideTo - activeIndicator === 1) {
          slideToNext();
        } else if (slideTo - activeIndicator < 0) {
          if (Math.abs(slideTo - activeIndicator) > 1) {
            jump = Math.abs(slideTo - activeIndicator);
            step = jump * step;
            slideToPrev();
          }
          slideToPrev();
        }
        step = 100 / totalSlides;
      });
    });

    // carousel.addEventListener('mouseover', () => {
    //   loop(false);
    // });

    // carousel.addEventListener('mouseout', () => {
    //   loop(true);
    // });

    function loadIndicators() {
      slides.forEach((slide, index) => {
        if (index === 0) {
          document.querySelector(
            '.carousel__indicators'
          ).innerHTML += `<span data-slide-to="${index}" class="active"></span>`;
        } else {
          document.querySelector('.carousel__indicators').innerHTML += `<span data-slide-to="${index}"></span>`;
        }
      });
    }

    function updateIndicators() {
      if (activeSlide > totalSlides - 1) {
        activeSlide = 0;
      } else if (activeSlide < 0) {
        activeSlide = totalSlides - 1;
      }
      document.querySelector('.carousel__indicators span.active').classList.remove('active');
      document.querySelectorAll('.carousel__indicators span')[activeSlide].classList.add('active');
    }

    function slideToNext() {
      if (direction === 1) {
        direction = -1;
        carouselInner.prepend(carouselInner.lastElementChild);
      }

      carousel.style.justifyContent = 'flex-start';
      carouselInner.style.transform = `translateX(-${step}%)`;
    }

    function slideToPrev() {
      if (direction === -1) {
        direction = 1;
        carouselInner.append(carouselInner.firstElementChild);
      }
      carousel.style.justifyContent = 'flex-end';
      carouselInner.style.transform = `translateX(${step}%)`;
    }

    // function loop(status) {
    //   if (status === true) {
    //     time = setInterval(() => {
    //       slideToNext();
    //     }, interval);
    //   } else {
    //     clearInterval(time);
    //   }
    // }
  }, []);

  //Carousel functions

  return (
    <div className='testimonials glass-1'>
      <h1 className='section__header'>
        What Others Say About <span>uPlow</span>
      </h1>
      <div className='carousel'>
        {/* SLIDES */}
        <div className='carousel__inner'>
          <div className='carousel__item'>
            <div className='carousel__quote'>
              <FontAwesomeIcon
                className='carousel__quotation--left'
                icon={faQuoteLeft}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
              <h1>
                uPlow saved me when a huge storm hit and my original snow-plower had a breakdown. I was able to find
                another plower in minutes!
              </h1>
              <FontAwesomeIcon
                className='carousel__quotation--right'
                icon={faQuoteRight}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
            </div>
          </div>
          <div className='carousel__item'>
            <div className='carousel__quote'>
              <FontAwesomeIcon
                className='carousel__quotation--left'
                icon={faQuoteLeft}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
              <h1>
                I own multiple businesses across town, and uPlow helps me keep everything organized, and I can make sure
                that all of my properties are serviced for the next business day!
              </h1>
              <FontAwesomeIcon
                className='carousel__quotation--right'
                icon={faQuoteRight}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
            </div>
          </div>
          <div className='carousel__item'>
            <div className='carousel__quote'>
              <FontAwesomeIcon
                className='carousel__quotation--left'
                icon={faQuoteLeft}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
              <h1>
                I've been able to run a successful side-job using uPlow to gain more business. I even quit my day job!
              </h1>
              <FontAwesomeIcon
                className='carousel__quotation--right'
                icon={faQuoteRight}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
            </div>
          </div>
          <div className='carousel__item'>
            <div className='carousel__quote'>
              <FontAwesomeIcon
                className='carousel__quotation--left'
                icon={faQuoteLeft}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
              <h1>
                Its so easy to know exactly when my plower will begin working on my drive-way because of the
                live-updating capabilities of the app! I LOVE IT!
              </h1>
              <FontAwesomeIcon
                className='carousel__quotation--right'
                icon={faQuoteRight}
                size='5x'
                style={{ color: 'rgba(22, 22, 22, 0.75)' }}
              />
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className='carousel__controls'>
          <span className='carousel__prev'>
            <FontAwesomeIcon icon={faArrowLeft} size='3x' style={{ color: '#161616' }} />
          </span>
          <span className='carousel__next'>
            <FontAwesomeIcon icon={faArrowRight} size='3x' style={{ color: '#161616' }} />
          </span>
        </div>

        {/* INDICATORS */}
        <div className='carousel__indicators'></div>
        <FontAwesomeIcon
          className='carousel__snowflake snowflake--top'
          icon={faSnowflake}
          size='5x'
          style={{ color: 'rgba(255, 255, 255, 0.75)' }}
        />
        <FontAwesomeIcon
          className='carousel__snowflake snowflake--bottom'
          icon={faSnowflake}
          size='5x'
          style={{ color: 'rgba(255, 255, 255, .75)' }}
        />
      </div>
    </div>
  );
}

export default Testimonials;
