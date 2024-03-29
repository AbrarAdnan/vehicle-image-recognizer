// Design by Catalin V. (@hiskio https://twitter.com/hiskio) 
// https://dribbble.com/shots/3408986-Info-Card-Daily-UI-045

const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
let inProgress = false;
const goToSlide = (slideElements, index) => {
  if (!inProgress) {
    inProgress = true;
    $('.active').addClass('exit');
    $('.active').removeClass('active');
    slideElements.forEach(elem => {
      $(`${elem}:nth-child(${index})`).addClass('active');
    });
    const evenSlide = index % 2 === 0;
    if (evenSlide) $('.content__ping').addClass('content__ping--right');else $('.content__ping').removeClass('content__ping--right');
    $('.content__ping--noanimation').removeClass('content__ping--noanimation');
    setTimeout(() => $('.exit').removeClass('exit'), 1000);
    setTimeout(() => inProgress = false, 2000);
  }
};
$('.content__slide:nth-child(1) .button').on('click', () => goToSlide(slideElements, 2));
$('.content__slide:nth-child(2) .button').on('click', () => goToSlide(slideElements, 1));


// NEW STUFF FROM HERE

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
      var output = document.getElementById('preview');
      output.src = reader.result;
      document.getElementById('select-message').style.display = 'none';
      document.getElementById('submit-button').style.display = 'block';
    }
    if (event.target.files.length === 0) {
      document.getElementById('select-message').style.display = 'block';
      document.getElementById('submit-button').style.display = 'none';
    } else {
      reader.readAsDataURL(event.target.files[0]);
    }
  

        const preview = URL.createObjectURL(event.target.files[0]);
        const slide = document.querySelector('.card__slide:nth-child(1)');
        const image = slide.querySelector('.image');
        image.style.backgroundImage = `url(${preview})`;
  }

    // detect upload working
    // function previewImage(event) {
    //     var reader = new FileReader();
    //     reader.onload = function() {
    //       var output = document.getElementById('preview');
    //       output.src = reader.result;
    //       document.getElementById('select-message').style.display = 'none';
    //     }
    //     if (event.target.files.length === 0) {
    //       document.getElementById('select-message').style.display = 'block';
    //       document.getElementById('submit-button').disabled = true;
    //     } else {
    //       reader.readAsDataURL(event.target.files[0]);
    //       document.getElementById('submit-button').disabled = false;
    //     }

    //     const preview = URL.createObjectURL(event.target.files[0]);
    //     const slide = document.querySelector('.card__slide:nth-child(1)');
    //     const image = slide.querySelector('.image');
    //     image.style.backgroundImage = `url(${preview})`;
    //   }
// setTimeout(() => goToSlide(slideElements, 1), 6000);

// let amount = 0;
// let slide = 0;

// const progress = () => {
//   amount++
//   $('.active .progress').css('transform', `scaleX(${amount/400})`)
//   if (amount >= 400){
//     amount = 0;
//     $('.active .progress').css('transform', `scaleX(${amount/400})`)
//     slide = (slide + 1) % 2 ;
//     goToSlide(slideElements, slide + 1);
//     clearInterval(progressInterval);
//     setTimeout(()=>{ 
//       progressInterval = setInterval(progress,20); 
//       $('.back__slide:not(.active) .progress').css('transform', 'scaleX(0)')
//     }, 2000);
//   }
// }

// let progressInterval = setInterval(progress,20);