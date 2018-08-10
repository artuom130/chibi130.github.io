const Modal = (function () {
  let isOpen = false;
  let mTransforms;
  let m;
  const showModal = function () {
    m.classList.toggle('modal--active');
    document.body.classList.toggle('modal-opened');
    
    m.style.transform = 'translate(-50%, -50%)';
  }

  const hideModal = function () {
    m.style.transform = mTransforms;
    m.removeEventListener('click', handlerHideModal);
    document.body.classList.toggle('modal-opened');
    setTimeout(function() {
      window.requestAnimationFrame(function() {
        m.style.opacity = '0';
      });
    }, 100);
    setTimeout(function() {
      window.requestAnimationFrame(function() {
        m.style.opacity = '';
        m.classList.toggle('modal--active');
      });
    }, 350);
    setTimeout(function() {
      m.style.transform = '';
    }, 500);
  }

  const handlerHideModal = function (e) {
    if(!e.target.classList.contains('modal-btn')) return;
    if(isOpen) {
      hideModal();
    }
  }
  const open = function (card, modalType) {

    m = document.querySelector(`.modal--${modalType}`);

    const cardProps = card.getBoundingClientRect();
    const mProps = m.getBoundingClientRect();

    let transX, transY, scaleX, scaleY;
    const xc = window.innerWidth / 2;
    const yc = window.innerHeight / 2;
    
    scaleX = (cardProps.width / mProps.width).toFixed(3);
    scaleY = (cardProps.height / mProps.height).toFixed(3);


    mLeftScaled =  xc + mProps.width / 2  - (mProps.width / 2) * scaleX;
    mTopScaled =  yc + mProps.height / 2  - (mProps.height / 2) * scaleY;

    transX = Math.round(cardProps.left - mLeftScaled);
    transY = Math.round(cardProps.top - mTopScaled);

    mTransforms = `translate(${transX}px, ${transY}px) scale(${scaleX}, ${scaleY})`;
    m.style.transform = mTransforms;

    m.addEventListener('click', handlerHideModal);
    
    setTimeout(function() {
			window.requestAnimationFrame(function() {
        showModal();
        isOpen = true;
			});
    }, 100);
  };

  return {
    open: open
  };

}());


