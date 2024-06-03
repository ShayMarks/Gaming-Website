// אנימציה בעת טעינת הדף
document.addEventListener('DOMContentLoaded', () => {
  const gameItems = document.querySelectorAll('.game-item');
  gameItems.forEach((item, index) => {
      setTimeout(() => {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
      }, index * 200);
  });
});
