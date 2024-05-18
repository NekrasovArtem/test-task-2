import { Datepicker } from "vanillajs-datepicker";
import ru from '../../node_modules/vanillajs-datepicker/js/i18n/locales/ru.js';

Object.assign(Datepicker.locales, ru);

import Choices from "choices.js";

const select = document.querySelector('.news-category');
const calendar = document.querySelector('.date__pick');

const datepicker = new Datepicker(calendar, {
  orientation: 'left bottom',
  language: 'ru',
  prevArrow: '<img src="images/prev-month.svg" alt="" />',
  nextArrow: '<img src="images/next-month.svg" alt="" />',
}); 

const selectCategory = new Choices(select, {
    searchEnabled: false,
    itemSelectText: '',
    position: 'bottom',
    classNames: {
        listDropdown: 'choices__dropdown'
    },
})