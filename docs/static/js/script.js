const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
const submitButton = document.getElementById('submit-button');
let inProgress = false;
const goToSlide = (slideElements, index) => {
  console.log(index);
  // check if slideIndex is 1
  if (index === 1){
    submitButton.textContent = 'Submit';
  }
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
    // Add the following line to make the card slide active
    $('.card__slide:nth-child(' + 1 + ')').addClass('active');
  }
};
// $('.content__slide:nth-child(1) .button').on('click', () => goToSlide(slideElements, 2));
$('.content__slide:nth-child(2) .button').on('click', () => goToSlide(slideElements, 1));
$('.content__slide:nth-child(1) .button').on('click', function() {
  goToSlide(slideElements, 2);
});


// NEW STUFF FROM HERE
submitButton.addEventListener('click', function() {
  submitButton.textContent = 'Please wait';
});

function previewImage(event) {
  console.log("Image Preview");
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

  const form = document.getElementById("image-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior
  
    const imageInput = document.querySelector('input[type="file"]');
    const imageFile = imageInput.files[0];
  
    if (!imageFile) {
      const selectMessage = document.getElementById("select-message");
      selectMessage.style.display = "block";
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
  
    reader.onload = () => {
      const imageData = reader.result.split(",")[1];
  
      fetch("https://abrar-adnan-vehicle-recognizer.hf.space/run/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [`data:image/png;base64,${imageData}`],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // handle response data
          console.log(data['data'][0]['confidences']);
          const topThree = data['data'][0].confidences.slice(0, 3);

          const label1 = topThree[0].label;
          const confidence1 = topThree[0].confidence;

          const label2 = topThree[1].label;
          const confidence2 = topThree[1].confidence;

          const label3 = topThree[2].label;
          const confidence3 = topThree[2].confidence;

          console.log(`Top three labels: ${label1}, ${label2}, ${label3}`);
          console.log(`Confidences: ${confidence1}, ${confidence2}, ${confidence3}`);
          const label1Element = document.getElementById('label1');
          label1Element.innerText = label1;
          const output = document.getElementById('output');
          if (confidence1 >= 0.3) {
            output.innerHTML = `The picture was identified of ${label1} with confidence score of ${(confidence1*100).toFixed(2)}%`;
            if (confidence2 >= 0.3) {
              output.innerHTML += `<br>It also identifies the picture as of ${label2} with confidence score of ${(confidence2*100).toFixed(2)}%`;
            }
            if (confidence3 >= 0.3) {
              output.innerHTML += `<br>And ${label3} with confidence score of ${(confidence3*100).toFixed(2)}%`;
            }
          } else {
            output.innerHTML = "The picture could not be identified.";
          }
          // output.innerHTML = `The picture was identified of ${label1} with confidence score of ${(confidence1*100).toFixed(2)}% <br>
          // it also identifies the picture as of ${label2} with confidence score of ${(confidence2*100).toFixed(2)}% <br> and ${label3} with confidence score of ${(confidence3*100).toFixed(2)}%`;
          goToSlide(slideElements, 2);
          
        })
        .catch((error) => {
          console.error(error);
        });
    };
  });



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