
/*-------- Consumindo Json Carrossel -------*/

$(function(){

  $.getJSON("produtos.json", function(data, status) {

      if(status == "success"){

          const all = data.produtos;

          for (let i = 0; i < all.length; i++) {

          function calc(count, centavos) {
                  
              if(centavos == false){

                  let valor = all[i].avista.replace(',','.');

                  let res = (valor / count).toString();

                  let real = res.split(".");

                  return real[0];
                  
              } else {

                  var valor = all[i].avista.replace(',','.');

                  var res = (valor / count).toFixed(2).toString();

                  var centavo = res.split(".");

                  return centavo[1];

              }


              }

              var template = ` 

              <div class="mySlides fade">
               
               <a target="_blank" href="${all[i].url}" class="produto">

                   <figure>
                       <img src="${all[i].image}" alt="">
                       <figcaption>${all[i].description}</figcaption>
                   </figure>

                   <div class="valor-1">
                       <p> <span uper >${all[i].semjuros}</span>X<sup>R$</sup> <span uper >${calc(all[i].semjuros, false)}</span> <sup>,<span>${calc(all[i].semjuros, true)}</span></sup>
                           <span block>sem juros <sup>1</sup></sub>
                       </p>
                       <img src="assets/img/visa-mastercard.jpg" width="100" alt="">
                   </div>
                   
                   <div class="valor-2">
                       <p> <span uper >${all[i].semjuros2}</span>X<sup>R$</sup> <span uper ></span>${calc(all[i].semjuros2, false)}</span> <sup>,<span>${calc(all[i].semjuros2, true)}</span></sup>
                           <span block>sem juros <sup>2</sup></sub>
                       </p>
                       <sup avista >
                           ou R$ <span>${all[i].avista}</span> à vista
                       </sup>
                   </div>
                   
               </a>

               </div>
              
              `;

              document.getElementById("produtos").insertAdjacentHTML("afterbegin", template);
            
          }

      } else {

          alert('Houve algum problema no carregamento dos produtos.')

      }

      plusSlides(1)

  });

});


/*------- Intereção do Carrossel ------*/

 var slideIndex = 1;
 showSlides(slideIndex);
 
 function plusSlides(n) {
   showSlides(slideIndex += n);
 }
 
 function currentSlide(n) {
   showSlides(slideIndex = n);
 }
 
 function showSlides(n) {
   
   var i;
   var slides = document.getElementsByClassName("mySlides");

   if (n > slides.length) {slideIndex = 1}    
   if (n < 1) {slideIndex = slides.length}
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
   }

   slides[slideIndex-1].style.display = "block";  
 }