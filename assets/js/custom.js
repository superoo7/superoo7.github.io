document.addEventListener('DOMContentLoaded', function() {
  const aboutCard = document.querySelector('.about');
  const cardFront = document.querySelector('.card-front');
  const cardBack = document.querySelector('.card-back');

  if (cardFront && cardBack) {
    cardFront.addEventListener('click', function(e) {
      // Ignore if clicking on a link or its children
      if (e.target.closest('a')) {
        return;
      }
      e.stopPropagation();
      aboutCard.classList.add('flipped');
    });

    cardBack.addEventListener('click', function(e) {
      if (e.target.closest('a')) {
        return;
      }
      e.stopPropagation();
      aboutCard.classList.remove('flipped');
    });
  }
});


