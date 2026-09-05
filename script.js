// Cal.com element-click embed for test-drive bookings.
(function (C, A, L) {
  const p = function (a, ar) { a.q.push(ar); };
  const d = C.document;
  C.Cal = C.Cal || function () {
    const cal = C.Cal;
    const ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement('script')).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ['initNamespace', namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, 'https://app.cal.com/embed/embed.js', 'init');

Cal('init', 'uulzalt', { origin: 'https://app.cal.com' });
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns.uulzalt('ui', { hideEventTypeDetails: false, layout: 'month_view' });

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
