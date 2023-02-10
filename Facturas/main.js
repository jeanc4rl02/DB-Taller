const app = new Vue({
    el: '#app',
    data:{
      cliente: undefined,
      repuestos: [],  
      facturas: [],
      total: 0,
      cliente: undefined,
      detalle: [],
      showModal: false
    },
    methods:{
        verFactura(index){
            
            this.detalle  = this.facturas[index].detalle 
            this.cliente = this.facturas[index].cliente  
            this.total = this.facturas[index].total 
            this.showModal= true
        }
        
    },
    created(){
         
        let Facturas = JSON.parse(localStorage.getItem('facturas'));
        let Detalle = JSON.parse(localStorage.getItem('detalle'));


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
        
        
    },
    computed:{
        
    },
    
})