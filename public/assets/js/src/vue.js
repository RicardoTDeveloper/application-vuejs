Vue.component('componente', {
    template: ` 
    <div class="slideshow-container"> 
    <div :[Slides1]="Slides1" ref="Teste" class="mySlides fade" v-for="(produto, index) in produtos" :key="index">
    <a target="_blank" :href="produto.url" class="produto">

        <figure>
            <img :src="produto.image" alt="">
            <figcaption>{{produto.description}}</figcaption>
        </figure>

        <div class="valor-1">
            <p> <span uper >{{produto.semjuros}}</span>X<sup>R$</sup> <span uper >{{ calc(produto.semjuros, false, produto.avista) }}</span> <sup>,<span>{{ calc(produto.semjuros, true, produto.avista) }}</span></sup>
                <span block>sem juros <sup>1</sup></span>
            </p>
            <img src="assets/img/visa-mastercard.jpg" width="100" alt="">
        </div>
        
        <div class="valor-2">
            <p> <span uper >{{produto.semjuros2}}</span>X<sup>R$</sup> <span uper >{{ calc(produto.semjuros2, false, produto.avista) }}</span></span> <sup>,<span>{{ calc(produto.semjuros2, true, produto.avista) }}</span></sup>
                <span block>sem juros <sup>2</sup></span>
            </p>
            <sup avista >
                ou R$ <span>{{produto.avista}}</span> à vista
            </sup>
        </div>
        
    </a>
    </div>

    <a class="prev" @click="plusSlides(-1)">&#10094;</a>
    <a class="next" @click="plusSlides(1)">&#10095;</a>

    </div>
    `,

    data: function () {
        return {
            produtos: [],
            slideIndex: 1,
            Slides1: 'Slides1'
        }
    },

    methods: {
        calc: function (count, centavos, avista) {

            if (centavos == false) {

                let valor = avista.replace(',', '.');

                let res = (valor / count).toString();

                let real = res.split(".");

                return (real[0] || "");

            } else {

                var valor = avista.replace(',', '.');

                var res = (valor / count).toFixed(2).toString();

                var centavo = res.split(".");

                return (centavo[1] || "");

            }
        },

        showSlides: function (n) {
            
            var i;
            var slides = this.$el.querySelectorAll("[" + this.Slides1 + "]");

            if (n > slides.length) {
                this.slideIndex = 1
            }
            if (n < 1) {
                this.slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slides[this.slideIndex - 1].style.display = "block";
        },

        plusSlides: function (n) {
            this.showSlides(this.slideIndex += n);
        },

        currentSlide: function (n) {
            this.showSlides(this.slideIndex = n);
        },

        getProdutos: function () {

            var self = this;

            axios.get('/public/produtos.json')
                .then(function (response) {
                    // handle success
                    self.produtos = response.data.produtos
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                })

        }

    },

    created() {
        this.getProdutos()

        setTimeout(() => {
            this.plusSlides(-1)
        }, 250);
    },

    mounted() {

    },

})

const vm = new Vue({
    el: '#app'
})

const vm2 = new Vue({
    el: '#app2'
})