const track = document.querySelector('.story-track');
const cards = [...document.querySelectorAll('.story-card')];
const arrows = [...document.querySelectorAll('.arrow')];
let slide = 0;

function visibleCards(){ return window.innerWidth <= 900 ? 1 : 2; }
function renderSlider(){
  const gap = 32;
  const width = cards[0].getBoundingClientRect().width + gap;
  const max = Math.max(0, cards.length - visibleCards());
  slide = Math.min(slide, max);
  track.style.transform = `translateX(${-slide * width}px)`;
  arrows[0].disabled = slide === 0;
  arrows[1].disabled = slide === max;
}
arrows.forEach(button => button.addEventListener('click', () => { slide += Number(button.dataset.dir); renderSlider(); }));
window.addEventListener('resize', renderSlider);
renderSlider();
