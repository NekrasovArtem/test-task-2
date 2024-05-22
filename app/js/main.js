import { Datepicker } from "vanillajs-datepicker";
import ru from '../../node_modules/vanillajs-datepicker/js/i18n/locales/ru.js';
import Choices from "choices.js";
import Swiper from "swiper/bundle";

Object.assign(Datepicker.locales, ru);

const calendar = document.querySelector('.date__pick');
const select = document.querySelector('.news-category');
const slider = document.querySelector('.article__slider');

// Календарь
if (calendar) {
  const datepicker = new Datepicker(calendar, {
    orientation: 'left bottom',
    language: 'ru',
    prevArrow: '<img src="images/prev-month.svg" alt="" />',
    nextArrow: '<img src="images/next-month.svg" alt="" />',
  }); 
}

// Dropdown-список
if (select) {
  const selectCategory = new Choices(select, {
    searchEnabled: false,
    allowHTML: true,
    itemSelectText: '',
    position: 'bottom',
    classNames: {
        listDropdown: 'choices__dropdown'
    },
})
}

// Слайдер
const articleSlider = new Swiper('.article__slider', {
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
  },
  loop: true,
  allowTouchMove: false,
  effect: 'fade',
  fadeEffect: { 
    crossFade: true 
  },
  navigation: {
    nextEl: '.article__button_prev',
    prevEl: '.article__button_next',
  },
  pagination: {
    el: '.article__pagination',
    clickable: true,
  },
})

const newsSlider = new Swiper('.news__content', {
  a11y: false,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 45,
    }
  }
})
