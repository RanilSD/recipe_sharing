const slides = document.querySelectorAll('.sliding-div');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('current');
        } else {
            slide.classList.remove('current');
        }
    });
}


var setTestimonial = setInterval(function() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    }
    else {
        currentIndex = 0;
    }
    showSlide(currentIndex);
    }, 5000);

const prevBtn = document.getElementById("left-arrow");
const nextBtn = document.getElementById("right-arrow");
const cardContent1 = document.querySelector(".card1");
const cardContent2 = document.querySelector(".card2");
const cardContent3 = document.querySelector(".card3");
const cardContent4 = document.querySelector(".card4");
const cardContent5 = document.querySelector(".card5");

const contentArray = [
    {desc:"Chicken <br> Cheese Salad"},
    {desc:"Chicken <br> Cheese Salad"},
    {desc:"Chicken <br> Cheese Salad"},
    {desc:"Chicken <br> Cheese Salad"},
    {desc:"Chicken <br> Cheese Salad"}
]

let curIndex = 0;
function updateCardContent(cardNumber) {
    const {desc} = contentArray[curIndex];
    var cardSelector = document.querrySelector(".card" + cardNumber);
    cardSelector.innerHTML = `
    <div class="pcard${cardNumber}">
    <img src="scroll-pic${cardNumber}.png" alt="Scroll Pic ${cardNumber}">
</div>
<div class="tcard${cardNumber}">${desc}</div>
    `;
}
