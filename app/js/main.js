const elem = document.querySelector('input[name="date-picker"]');
const datepicker = new Datepicker(elem, {
  language: 'ru',
  prevArrow: '<img src="images/prev-month.svg" alt="" />',
  nextArrow: '<img src="images/next-month.svg" alt="" />',
}); 