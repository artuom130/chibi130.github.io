const Modal = (function () {
  let isOpen = false;

  // const makeDiv = function (card) {
  //   const width = card.offsetWidth;
  //   const height = card.offsetHeight;
  //   let div = document.createElement('div');
  //   const cardProps = card.getBoundingClientRect();
  //   div.id = 'modal__temp';
  //   div.style.width = 628.35 + 'px';
  //   div.style.height = 313.375 + 'px';
  //   div.style.left = window.innerWidth / 2 - 628.35 / 2 + 'px';
  //   div.style.top = window.innerHeight / 2 - 313.375 / 2 + 'px';
  //   document.body.appendChild(div);
  //   return div;
  // }
  // const showDiv = function (div, transforms) {
  //   div.style.transform = transforms;
  //   document.body.classList.toggle('modal-opened');
  // } 
  const showModal = function (modal) {
    modal.classList.toggle('modal--active');
    document.body.classList.toggle('modal-opened');
    
    modal.style.transform = 'translate(-50%, -50%)';
  }
  const hideModal = function (modal, transforms) {
    modal.style.transform = transforms;
    window.setTimeout(function() {
      window.requestAnimationFrame(function() {
        modal.classList.toggle('modal--active');
        document.body.classList.toggle('modal-opened');
      });
    }, 300);
  }
  const open = function (card, modalType) {

    const m = document.querySelector(`.modal--${modalType}`);

    const cardProps = card.getBoundingClientRect();
    const mProps = m.getBoundingClientRect();

    let transX, transY, scaleX, scaleY;
    const xc = window.innerWidth / 2;
    const yc = window.innerHeight / 2;
    
    scaleX = (cardProps.width / mProps.width).toFixed(3);
    scaleY = (cardProps.height / mProps.height).toFixed(3);

    // transX = Math.round(cardProps.left - (xc - (mProps.width / 2) * scaleX));
    // transY = Math.round(cardProps.top - (yc - (mProps.height / 2) * scaleY));
    mLeftScaled =  xc + mProps.width / 2  - (mProps.width / 2) * scaleX;
    mTopScaled =  yc + mProps.height / 2  - (mProps.height / 2) * scaleY;
    transX = Math.round(cardProps.left - mLeftScaled);
    transY = Math.round(cardProps.top - mTopScaled);

    mTransforms = `translate(${transX}px, ${transY}px) scale(${scaleX}, ${scaleY})`
    m.style.transform = mTransforms;

    m.addEventListener('click', (e) => {
      if(!e.target.classList.contains('modal-btn')) return;
      window.setTimeout(function() {
        window.requestAnimationFrame(function() {
          hideModal(m, mTransforms)
        });
        console.log('hideModal');
      }, 50);
    });
    // window.setTimeout(function() {
		// 	window.requestAnimationFrame(function() {
		// 		showDiv(tempDiv, transforms);
		// 	});
    // }, 1000);
    window.setTimeout(function() {
			window.requestAnimationFrame(function() {
				showModal(m);
			});
    }, 100);
    



    // content.addEventListener('transitionend', hideDiv, false);

    // isOpen = true;

    // function hideDiv() {
    //   // fadeout div so that it can't be seen when the window is resized
    //   div.style.opacity = '0';
    //   content.removeEventListener('transitionend', hideDiv, false);
    // }
  };

  let close = function (event) {

    event.preventDefault();
    event.stopImmediatePropagation();

    let target = event.target;
    let div = document.getElementById('modal__temp');

    /**
     * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
     * inside the modal and have it close.
     */

    if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {

      // make the hidden div visible again and remove the transforms so it scales back to its original size
      div.style.opacity = '1';
      div.removeAttribute('style');

			/**
			* iterate through the modals and modal contents and triggers to remove their active classes.
      * remove the inline css from the trigger to move it back into its original position.
			*/

      for (let i = 0; i < len; i++) {
        modals[i].classList.remove('modal--active');
        content[i].classList.remove('modal__content--active');
        trigger[i].style.transform = 'none';
        trigger[i].style.webkitTransform = 'none';
        trigger[i].classList.remove('modal__trigger--active');
      }

      // when the temporary div is opacity:1 again, we want to remove it from the dom
      div.addEventListener('transitionend', removeDiv, false);

      isOpen = false;

    }

    function removeDiv() {
      setTimeout(function () {
        window.requestAnimationFrame(function () {
          // remove the temp div from the dom with a slight delay so the animation looks good
          div.remove();
        });
      }, contentDelay - 50);
    }

  };

  return {
    open: open
  };

}());
