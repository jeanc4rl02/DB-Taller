const app = new Vue({
    el: '#app',
    data:{
      cliente: undefined,
      repuestos: [],  
      facturas: [],
      total: 0, 
      detalle: [],
      
    },
    methods:{
     agregar(id){
        let rep = false
        if(  this.repuestos[id].cantidad > 0){

            this.detalle.map( producto => {
                if(producto.id === id){
                    rep = true
                    producto.cantidad++
                    this.repuestos[id].cantidad-- 
                    producto.valor = this.repuestos[id].valor * producto.cantidad
                }
            })
             
            if(rep === false){
                this.repuestos[id].cantidad-- 
                this.detalle.push(
                    {
                        "id": this.repuestos[id].id,
                        "nombre": this.repuestos[id].nombre,
                        "valor": this.repuestos[id].valor,
                        "cantidad": 1
                    }
                ) 
            }

        }else{
            alert("El producto ya no tienen stock disponible")
        }
        this.calcular()
     },

     aumentar(id, index){
        if(  this.repuestos[id].cantidad > 0){ 
            this.detalle[index].cantidad++
            this.repuestos[id].cantidad-- 
            this.detalle[index].valor = this.detalle[index].cantidad * this.repuestos[id].valor
            
        }else{
            alert("El producto ya no tienen stock disponible")
        }
        this.calcular()
     },

     restar(id,index){
        if(  this.detalle[index].cantidad > 0){ 
            this.repuestos[id].cantidad++
            if(this.detalle[index].cantidad === 1){  
                 
                this.detalle.splice(index, 1)
            }else{
                this.detalle[index].cantidad--
                this.detalle[index].valor = this.detalle[index].cantidad * this.repuestos[id].valor
                
            }
            
        } 
        this.calcular()
     },

    calcular(){
        this.total= 0
        if(this.detalle != null){
            this.detalle.map(producto => {
                this.total += producto.valor 
            })
        }else{
            this.total= 0
        }
    },
    guardar(){
        if(this.cliente != undefined && this.detalle != null){
            this.facturas.push({
                "cliente": this.cliente,
                "detalle": this.detalle,
                "total": this.total
            })
            
            localStorage.setItem('facturas', JSON.stringify(this.facturas))
            this.cliente = undefined
            this.detalle = []
            this.total = 0
            localStorage.setItem('detalle', JSON.stringify(this.detalle))
            localStorage.setItem('catalogo', JSON.stringify(this.repuestos))
            localStorage.setItem("cliente", JSON.stringify(undefined));
            alert("Venta completada exitosamente")
             //
            let rol = localStorage.getItem('rol')
            if(rol === 'Mecánico'){
                window.open("../Mecanico/index.html", "_self")
            }

        }else{
            alert("Campo de cliente o factura vacia")
        }

    },
    logout() {
     localStorage.removeItem("rol");
     localStorage.removeItem("name");
     window.location = "../index.html";
   }
  
    },
    created(){
        let catalogo = JSON.parse(localStorage.getItem('catalogo'));
        let Facturas = JSON.parse(localStorage.getItem('facturas'));
        let Detalle = JSON.parse(localStorage.getItem('detalle')); 
        let Cliente = JSON.parse(localStorage.getItem('cliente'));  

        console.log(Cliente)
        if(Cliente === undefined){
            this.cliente = undefined
        }else{
            this.cliente = Cliente
            console.log(this.cliente)
        }

        //se guardan todas las facturas
        if(Facturas === null){
            this.facturas = []
        }else{
            this.facturas = Facturas
        }
        //guardamos el detalle de la venta o ingreso
        //desde ventas no se altera el detalle, pero si desde ingreso
        if(Detalle === null){
            this.detalle = []
        }else{
            this.detalle = Detalle
        }
        
        //guarda el catalogo 
        if(catalogo === null){
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
                    "nombre": "Bujías",
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
                    "nombre": "Batería",
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
                    "nombre": "Neumáticos",
                    "valor": 300,
                    "imagen": "https://www.eluniverso.com/resizer/EmU7BmQQfCE9-HX7HCdtBgqeA9w=/740x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/6OMBHHVNTVBWFO7DVPEXZZY4RA.jpg",
                    "cantidad": 200
                },
            )

        }else{
            this.repuestos = catalogo;
        }

        this.calcular()
    },
    computed:{
        
    },
    
})