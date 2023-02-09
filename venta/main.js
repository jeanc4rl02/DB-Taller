const app = new Vue({
    el: '#app',
    data:{
      cliente: undefined,
      repuestos: [],  
      factura: [],
    },
    methods:{
     
        
    },
    created(){
        this.repuestos.push(
            {
                "id": 0,
                "nombre": "Filtro Aire",
                "valor": 90,
                "imagen": "https://yamaha-mundoyamaha.com/wp-content/uploads/2021/03/FILTRO-AIRE-FZ15.png",
                "cantidad": 100
            },
            {
                "id": 1,
                "nombre": "Bujias",
                "valor": 50,
                "imagen": "https://cdn-images.motor.es/image/m/694w/fotos-diccionario/2019/11/bujia-tipos-averias-mantenimiento_1573747483.jpg",
                "cantidad": 60
            },
            {
                "id": 2,
                "nombre": "Amortiguadores",
                "valor": 120,
                "imagen": "https://ragmotos.com.co/wp-content/uploads/2019/10/29184-Cb-110-Honda-2-1.jpg",
                "cantidad": 300
            },
            {
                "id": 3,
                "nombre": "Pastillas de freno",
                "valor": 40,
                "imagen": "https://amortiguadorescarcenter.com/wp-content/uploads/2019/03/pastillas-de-freno-600x474.jpg",
                "cantidad": 50
            },
            {
                "id": 4,
                "nombre": "Correa",
                "valor": 70,
                "imagen": "https://noticias.coches.com/wp-content/uploads/2019/03/Correa-de-Distribuci%C3%B3n-2.jpg",
                "cantidad": 150
            },
            {
                "id": 5,
                "nombre": "Bateria",
                "valor": 70,
                "imagen": "https://unibaterias.com.co/wp-content/uploads/2018/09/171-Bateria-para-carro-MAC-GOLD-PLUS-42IST-900MG.jpg",
                "cantidad": 200
            },
            {
                "id": 6,
                "nombre": "Liquido Frenos",
                "valor": 30,
                "imagen": "https://frenosandinos.com/wp-content/uploads/2021/11/COFRE-DOT-5.1-500CC_1.jpg",
                "cantidad": 100
            },
            {
                "id": 7,
                "nombre": "Aceite",
                "valor": 40,
                "imagen": "https://www.autoplanet.com.co/wp-content/uploads/2020/09/600089AM_1_wjdahi.png",
                "cantidad": 300
            },
            {
                "id": 8,
                "nombre": "Neumaticos",
                "valor": 300,
                "imagen": "https://www.eluniverso.com/resizer/EmU7BmQQfCE9-HX7HCdtBgqeA9w=/740x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/6OMBHHVNTVBWFO7DVPEXZZY4RA.jpg",
                "cantidad": 200
            },
        )
    },
    computed:{

    }
})