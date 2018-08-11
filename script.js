let mainPS, devicesPS, scenariosPS;
const devicesHeadControls = document.querySelector('.content-devices .content-head-controls');
const devicesCards = document.querySelector('.content-devices__cards');
const mainCards = document.querySelector('.content-main__cards');
document.addEventListener("DOMContentLoaded", function () {
  setScrolls();
  if(mainCards) {
    mainCards.addEventListener('ps-scroll-down', function() {
      if(mainCards.scrollTop > 10 &&  mainCards.classList.contains('content-main__cards--in')) {
        console.log('scrolldonw');
        mainCards.classList.remove('content-main__cards--in');
        mainCards.classList.add('content-main__cards--out');
      }
    });
    mainCards.addEventListener('ps-y-reach-start', function() {
      console.log('reach-start');
      mainCards.classList.remove('content-main__cards--out');
      mainCards.classList.add('content-main__cards--in');
    });
  }
  if(devicesPS) {
    devicesCards.addEventListener('ps-x-reach-end', function() {
      devicesHeadControls.lastElementChild.setAttribute('disabled', true);
    })
    devicesCards.addEventListener('ps-x-reach-start', function() {
      devicesHeadControls.firstElementChild.setAttribute('disabled', true);
    })
    
    const smoothScroll = function(offset) {
      if(Math.abs(offset) < 20) {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            devicesCards.scrollLeft += offset;
          });
        }, 10);
        return;
      }
      if(offset > 0) {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            devicesCards.scrollLeft += 20;
          });
          smoothScroll(offset - 20);
        }, 10);
      } else {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            devicesCards.scrollLeft -= 20;
          });
          smoothScroll(offset + 20);
        }, 10);
      }
    } 

    devicesHeadControls.addEventListener('click', function(e) {
      if(e.target.classList.contains('btn--next')) {
        devicesHeadControls.firstElementChild.removeAttribute('disabled');
        smoothScroll(215);
      }
      if(e.target.classList.contains('btn--prev')) {
        devicesHeadControls.lastElementChild.removeAttribute('disabled');
        smoothScroll(-215);
      }
    });
  }
});


function setScrolls() {
  if (mainPS) {
    mainPS.destroy();
    mainPS = null;
    devicesPS.destroy();
    devicesPS = null;
  }
  if (scenariosPS) {
    scenariosPS.destroy();
    scenariosPS = null;
  }
  if (window.matchMedia("(min-width: 900px)").matches) {
    mainPS = new PerfectScrollbar('.content-main__cards', {
      suppressScrollX: true,
    });
    devicesPS = new PerfectScrollbar(devicesCards);
  }
  if (window.matchMedia("(min-width: 900px) and (max-width: 1150px)").matches) {
    scenariosPS = new PerfectScrollbar('.content-scenarios__cards', {
      suppressScrollX: true,
    });
  }
  //обработчики кнопок
  
}


(function () {

  const infoTemperature = document.querySelector('.modal--temperature .modal-info__temperature');
  const rangeTemperature = document.getElementById('rangeTemperature');
  const rangeLight = document.getElementById('rangeLight');

  rangeTemperature.addEventListener('change', function () {
    infoTemperature.innerHTML = this.value > 0 ? '+' + this.value : this.value;
  });
  console.log(screenfull);
  document.addEventListener('click', function (e) {
    //мобильное меню
    if (e.target.closest('.nav-toggle')) {
      document.body.classList.toggle('nav-opened');
    }
    //открытие модалки
    if (e.target.closest('.card')) {
      if (screenfull.enabled && window.matchMedia("(max-width: 900px)").matches) {
        screenfull.request();
      }
      const curCard = e.target.closest('.card');
      const modalType = curCard.getAttribute('data-modal-type');
      if (modalType) {
        Modal.open(curCard, modalType);
      }
    }
    //режимы модалки
    if (e.target.classList.contains('menu-radioOptions__radio')) {
      setRange(e.target.value);
    }
  });

  const setRange = function (value) {
    switch (value) {
      case 'manually':
        rangeTemperature.value = 20;
        rangeTemperature.removeAttribute('disabled');
        break;
      case 'cold':
        rangeTemperature.value = 15;
        rangeTemperature.setAttribute('disabled', true);
        infoTemperature.innerHTML = '+' + 15;
        break;
      case 'heat':
        rangeTemperature.value = 23;
        rangeTemperature.setAttribute('disabled', true);
        infoTemperature.innerHTML = '+' + 23;
        break;
      case 'hot':
        rangeTemperature.value = 28;
        rangeTemperature.setAttribute('disabled', true);
        infoTemperature.innerHTML = '+' + 28;
        break;
      //light range 
      case 'l-manually':
        rangeLight.value = 50;
        rangeLight.removeAttribute('disabled');
        break;
      case 'daylight':
        rangeLight.value = 80;
        rangeLight.setAttribute('disabled', true);
        break;
      case 'eveninglight':
        rangeLight.value = 60;
        rangeLight.setAttribute('disabled', true);
        break;
      case 'dawn':
        rangeLight.value = 30;
        rangeLight.setAttribute('disabled', true);
        break;
      default:
        rangeLight.removeAttribute('disabled');
        rangeTemperature.removeAttribute('disabled');
    }
  }
})();


// функция с MDN
var optimizedResize = (function () {
  var callbacks = [],
    running = false;
  function resize() {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }
  function runCallbacks() {
    callbacks.forEach(function (callback) {
      callback();
    });
    running = false;
  }
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }
  return {
    // public method to add additional callback
    add: function (callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  }
}());
// start process
optimizedResize.add(function () {
  setScrolls();
});
