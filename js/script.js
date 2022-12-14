function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});;

//===========================ibg==========================
function ibg() {
   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}
ibg();
//===========================headerImageHover==========================
let headerImageHover = document.querySelector(".header__image-hover");
headerImageHover.addEventListener("click", function () {
   let submenuHeader = document.querySelector(".submenu-header");
   submenuHeader.classList.toggle("active");
});
document.documentElement.addEventListener("click", function (e) {
   let submenuHeader = document.querySelector(".submenu-header");
   if (!(e.target.closest(".header__hover"))) {
      submenuHeader.classList.remove("active");
   }
})
//===========================burger==========================
let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");
burger.addEventListener("click", function (e) {
   burger.classList.toggle("active");
   menu.classList.toggle("active");
   document.querySelector("body").classList.toggle("active");
})

//==============slider==================
if (document.querySelector(".slider")) {
   $(document).ready(function () {
      $(".slider").slick({
         slidesToShow: 1,
         arrows: true,
         appendArrows: $('.footer-slider__wrapper'),
      })
   })
}

//==============slider-lots==================
if (document.querySelector(".slider-lots")) {
   $(document).ready(function () {
      $(".slider-lots").slick({
         slidesToShow: 3,
         infinite: true,
         arrows: true,
         appendArrows: $('.switch-lots-body'),
         responsive: [
            {
               breakpoint: 880,
               settings: {
                  slidesToShow: 2,
               },
            },
            {
               breakpoint: 640,
               settings: {
                  slidesToShow: 1,
               }
            }
         ],
      })
   })
}

//==============slider-quotes==================
if (document.querySelector(".quotes__row")) {
   $(document).ready(function () {
      $(".quotes__row").slick({
         slidesToShow: 1,
         infinite: true,
         arrows: true,
         appendArrows: $('.switch-quotes__leaf'),
         fade: true,
      })
   })
}

//<==============???????????????????????? ??????????????==================
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
   this.type = type;
}

DynamicAdapt.prototype.init = function () {
   const _this = this;
   // ???????????? ????????????????
   this.??bjects = [];
   this.daClassname = "_dynamic_adapt_";
   // ???????????? DOM-??????????????????
   this.nodes = document.querySelectorAll("[data-da]");

   // ???????????????????? ??bjects ????????????????
   for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      //* ?????????? ?? ??????: const data = node.getAttribute("data-da").trim();
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const ??bject = {};
      ??bject.element = node;
      ??bject.parent = node.parentNode;
      //! ???????????????????????? ????????????: ??bject.destination = document.querySelector(dataArray[0].trim());
      ??bject.destination = dataArray[0].trim();
      ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.??bjects.push(??bject);
   }

   this.arraySort(this.??bjects);

   // ???????????? ???????????????????? ??????????-????????????????
   this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
   }, this);
   this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
   });

   // ?????????????????????? ?????????????????? ???? ??????????-????????????
   // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
   for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
      const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
         return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
         _this.mediaHandler(matchMedia, ??bjectsFilter);
      });
      this.mediaHandler(matchMedia, ??bjectsFilter);
   }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
   if (matchMedia.matches) {
      for (let i = 0; i < ??bjects.length; i++) {
         const ??bject = ??bjects[i];
         ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
         this.moveTo(??bject.place, ??bject.element, ??bject.destination);
      }
   } else {
      for (let i = 0; i < ??bjects.length; i++) {
         const ??bject = ??bjects[i];
         if (??bject.element.classList.contains(this.daClassname)) {
            this.moveBack(??bject.parent, ??bject.element, ??bject.index);
         }
      }
   }
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
   element.classList.add(this.daClassname);
   if (place === 'last' || place >= destination.children.length) {
      //+++++++++++++++++++++++++++++++++++++++++++
      //! ???????????????????????? ????????????: destination.insertAdjacentElement('beforeend', element);
      document.querySelector(`.${destination}`).insertAdjacentElement('beforeend', element);
      return;
   }
   if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
   }
   destination.children[place].insertAdjacentElement('beforebegin', element);
}

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
   element.classList.remove(this.daClassname);
   if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
   } else {
      parent.insertAdjacentElement('beforeend', element);
   }
}

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
   if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return -1;
            }

            if (a.place === "last" || b.place === "first") {
               return 1;
            }

            return a.place - b.place;
         }

         return a.breakpoint - b.breakpoint;
      });
   } else {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return 1;
            }

            if (a.place === "last" || b.place === "first") {
               return -1;
            }

            return b.place - a.place;
         }

         return b.breakpoint - a.breakpoint;
      });
      return;
   }
};

const da = new DynamicAdapt("max");
da.init();
//==============???????????????????????? ??????????????==================>



