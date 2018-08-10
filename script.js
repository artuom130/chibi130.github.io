let mainPS, devicesPS, scenariosPS;

const devicesHeadControls = document.querySelector('.content-devices .content-head-controls');
const devicesCards = document.querySelector('.content-devices__cards');
document.addEventListener("DOMContentLoaded", function () {
  setScrolls();
  //попытка убрать адресную строку
  if (navigator.userAgent.match(/Android/i) != null) {
    document.documentElement.style.height = window.outerHeight + 'px';
    setTimeout(window.scrollTo(0, 1), 0);
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
  if (window.innerWidth > 770) {
    mainPS = new PerfectScrollbar('.content-main__cards', {
      suppressScrollX: true,
    });
    devicesPS = new PerfectScrollbar(devicesCards);
  }
  if (window.innerWidth > 600 && window.innerWidth < 1150) {
    scenariosPS = new PerfectScrollbar('.content-scenarios__cards', {
      suppressScrollX: true,
    });
  }
  if(devicesPS) {
    devicesCards.addEventListener('ps-x-reach-end', function() {
      devicesHeadControls.lastElementChild.setAttribute('disabled', true);
    })
    devicesCards.addEventListener('ps-x-reach-start', function() {
      devicesHeadControls.firstElementChild.setAttribute('disabled', true);
    })
    const stepLeft = (i) => {
      if(i < 10) {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            devicesCards.scrollLeft += 10;
          });
        }, 20);
      }
    } 
    devicesHeadControls.addEventListener('click', function(e) {
      if(e.target.classList.contains('btn--next')) {
        devicesHeadControls.firstElementChild.removeAttribute('disabled');
        devicesCards.scrollLeft += 100;
        let i = 0;
        for(let i = 0; i < 10; i++) {
          setTimeout(function() {
            window.requestAnimationFrame(function() {
              devicesCards.scrollLeft += 10;
            });
          }, i*10);
        }
      }
      if(e.target.classList.contains('btn--prev')) {
        devicesHeadControls.lastElementChild.removeAttribute('disabled');
        devicesCards.scrollLeft -= 100;
      }
    });
  }
}


(function () {

  const infoTemperature = document.querySelector('.modal--temperature .modal-info__temperature');
  const rangeTemperature = document.getElementById('rangeTemperature');
  const rangeLight = document.getElementById('rangeLight');

  rangeTemperature.addEventListener('change', function () {
    infoTemperature.innerHTML = this.value > 0 ? '+' + this.value : this.value;
  });

  document.addEventListener('click', function (e) {
    //мобильное меню
    if (e.target.closest('.nav-toggle')) {
      document.body.classList.toggle('nav-opened');
    }
    //открытие модалки
    if (e.target.closest('.card')) {
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
