const app = Vue.createApp({
  data () {
    return {
      autoParts: [
        { name: 'repuesto1', price: 100, quantity: 700 },
        { name: 'repuesto2', price: 200, quantity: 600 },
        { name: 'repuesto3', price: 300, quantity: 500 },
        { name: 'repuesto4', price: 400, quantity: 400 },
        { name: 'repuesto5', price: 500, quantity: 300 },
        { name: 'repuesto6', price: 600, quantity: 200 },
        { name: 'repuesto7', price: 700, quantity: 100 }
      ],
      checkups: [
        { name: 'Llantas', done: false },
        { name: 'Luces', done: false },
        { name: 'Frenos', done: false },
        { name: 'Liquidos', done: false },
        { name: 'Gases', done: false },
        { name: 'Espejos', done: false }
      ],
      carsEntries: [],
      cars: [
        { plate: 'ghj-132', brand: 'mazda', model: 2001 },
        { plate: 'ghj-132', brand: 'mazda', model: 2001 }
      ],

      mechanics: [
        { fullName: 'pedro Hernandez', phone: '3015102356' },
        { fullName: 'Maria suarez', phone: '3014567832' },
        { fullName: 'Luis Sanchez', phone: '3028964132' },
        { fullName: 'martha perez', phone: '3147852032' }
      ],
      assignedWorker: null,
      failures: [],
      usedParts: [],
      selectedCar: 'ggg-555',
      failureInput: null,
      partInput: null,
      partQuantityInput: null,
      carToChange: null,
      isRepaired: false,
      //Screens:
      isPendingRevisionsScreen: false,
      isRevisionScreen: false,
      isPartsScreen: false,
      isPreDeliverCheckScreen: false,
      isFactura: false,
      currentLogged: null,
      showModal: false,
      repuestos: [],
      detalle: []
    }
  },

  methods: {
    onLoadPage () {
      this.isPendingRevisionsScreen = true
      // this.assignWorker()

      if (
        localStorage.getItem('carsEntries') === null ||
        localStorage.getItem('carsEntries') === undefined
      ) {
        //localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries))
      } else {
        localStorage.setItem('carsEntries', localStorage.getItem('carsEntries'))
        const toUpdateLocalCarsEntries = JSON.parse(
          localStorage.getItem('carsEntries')
        )
        this.carsEntries = toUpdateLocalCarsEntries
      }

      if (
        //currentLogged:
        localStorage.getItem('currentLogged') === null ||
        localStorage.getItem('currentLogged') === undefined ||
        //carsEntries:

        //failures:
        localStorage.getItem('failures') === null ||
        localStorage.getItem('failures') === undefined ||
        //usedParts:
        localStorage.getItem('usedParts') === null ||
        localStorage.getItem('usedParts') === undefined
      ) {
        localStorage.setItem(
          'currentLogged',
          JSON.stringify(this.assignedWorker)
        )
        //localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries))
        localStorage.setItem('failures', JSON.stringify(this.failures))
        localStorage.setItem('usedParts', JSON.stringify(this.usedParts))
      } else {
        //currentLogged:
        localStorage.setItem(
          'currentLogged',
          localStorage.getItem('currentLogged')
        )
        const toUpdateLocalCurrentLogged = JSON.parse(
          localStorage.getItem('currentLogged')
        )
        this.currentLogged = toUpdateLocalCurrentLogged
        //carsEntries:

        //failures:
        localStorage.setItem('failures', localStorage.getItem('failures'))
        const toUpdateLocalFailures = JSON.parse(
          localStorage.getItem('failures')
        )
        this.failures = toUpdateLocalFailures
        //usedParts:
        localStorage.setItem('usedParts', localStorage.getItem('usedParts'))
        const toUpdateLocalUsedParts = JSON.parse(
          localStorage.getItem('usedParts')
        )
        this.usedParts = toUpdateLocalUsedParts
      }
    },
    assignWorker () {
      let randNumber = Math.round(Math.random() * this.mechanics.length)
      console.log('randNumebr', randNumber)

      this.assignedWorker = this.mechanics[randNumber]
      console.log('this.assignedWorker', this.assignedWorker)
    },
    /************* */
    findCarToChange (car) {
      this.assignWorker()
      this.carToChange = this.carsEntries.find(cars => {
        return cars.plate === car.plate
      })
      console.log('carToChange', this.carToChange)
      this.changeCarState()
    },
    updateLocalStorage (where, what) {
      localStorage.setItem(where, JSON.stringify(what))
    },
    changeCarState () {
      switch (this.carToChange.state) {
        case 'Sin revisar':
          console.log('toy aca')
          this.carToChange.state = 'En revisi??n'

          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          this.isPendingRevisionsScreen = false
          this.isRevisionScreen = true
          break

        case 'En revisi??n':
          this.isPendingRevisionsScreen = false
          this.isRevisionScreen = true
          break
        case 'Para chequeo':
          this.carToChange.state = 'En chequeo'
          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          this.isPendingRevisionsScreen = false
          this.isPreDeliverCheckScreen = true
          break

        case 'En chequeo':
          this.isPendingRevisionsScreen = false
          this.isPreDeliverCheckScreen = true
          break
        case 'Para entrega':
          // alert(
          //   `Este veh??culo est?? listo para entrega. La fecha de entrega es: ${this.carToChange.deliveryDate}`
          // )
          Swal.fire({
            icon: 'success',
            title: '??Este veh??culo est?? listo para entrega!',
            text: `La fecha de entrega es: ${this.carToChange.deliveryDate}`,
          })
          break
      }
    },

    addFailure () {
      if (
        this.failureInput === '' ||
        this.failureInput === undefined ||
        this.failureInput === null
      ) {
        alert('You must fill the field')
      } else {
        this.failures.push({
          car: this.carToChange.plate,
          failure: this.failureInput
        })
        this.updateLocalStorage('failures', this.failures)
        console.log(this.failures, 'failures')
        this.failureInput = ''
      }
    },
    quitFailure (fail, plate) {
      const toQuit = fail
      console.log('quit', toQuit)
      console.log('plate', plate)
      console.log('FAILURES', this.failures)

      const updatedCarFails = this.failures.filter(car => {
        return car.car === plate && car.failure === toQuit ? null : car
      })
      console.log('updatedCarFails', updatedCarFails)

      this.failures = updatedCarFails
      this.updateLocalStorage('failures', this.failures)
    },
    addPart () {
      if (
        this.partInput === '' ||
        this.partInput === undefined ||
        this.partInput === null
      ) {
        alert('You must fill the field')
      } else {
        this.usedParts.push({
          car: this.carToChange.plate,
          part: this.partInput,
          quantity: this.partQuantityInput
        })

        this.updateLocalStorage('usedParts', this.usedParts)

        console.log(this.usedParts, 'usedParts')
        this.partInput = ''
      }
    },
    finishRevision () {
      console.log(this.isRepaired, 'isRepaired')
      if (
        this.isRepaired === false ||
        this.isRepaired === null ||
        this.isRepaired === undefined
      ) {
        // alert(
        //   'El veh??culo no ha sido reparado. Los cambios ser??n guardados para pr??ximas reparaciones'
        // )
        Swal.fire({
          icon: 'warning',
          title: '??El veh??culo no ha sido reparado!',
          text: 'Los cambios ser??n guardados para pr??ximas reparaciones',
        })
        ;(this.isPendingRevisionsScreen = true), (this.isRevisionScreen = false)
      } else {
        const isFailAdded = this.failures.some(
          fail => fail.car === this.carToChange.plate
        )
        /** */  
        console.log('isFailAdded', isFailAdded)
        if (isFailAdded) {
          this.detalle.push(
            {
              "id": 9,
              "nombre": "Mano Obra",
              "valor": 30 * this.failures.length, 
              "cantidad": 1
            },
            {
              "id": 10,
              "nombre": "Chequeo",
              "valor": 45,
              "cantidad": 1
            },
          )
          this.carToChange.detalle = this.detalle 
          localStorage.setItem('catalogo', JSON.stringify(this.repuestos))
            /** */  
          this.carToChange.state = 'Para chequeo'
          Object.assign(this.carsEntries, this.carToChange) 
          this.updateLocalStorage('carsEntries', this.carsEntries)
          console.log('ESTADO', this.carToChange)
          // alert('El veh??culo ha sido reparado')
          Swal.fire({
            icon: 'success',
            title: '??El veh??culo ha sido reparado!'
          })
          this.isRevisionScreen = false
          this.isPendingRevisionsScreen = true
        } else {
          // alert(
          //   'Por favor inserte las fallas del veh??culo antes de terminar la reparaci??n'
          // )
          Swal.fire({
            icon: 'warning',
            title: '??Inserte fallas!',
            text: 'Por favor inserte las fallas del veh??culo antes de terminar la reparaci??n',
          })
        }
      }
    },
    finishCheckup () {
      const isFalse = this.checkups.some(checkup => checkup.done === false)

      if (isFalse) {
        // alert(
        //   'Alguno chequeos no se han realizado todav??a. Por favor complete todos los chequeos para finalizar'
        // )
        Swal.fire({
          icon: 'error',
          title: '??Alguno chequeos no se han realizado todav??a!',
          text: 'Por favor complete todos los chequeos para finalizar',
        })
      } else {
        this.carToChange.deliveryDate = new Date()
        console.log(
          'this.carToChange.deliveryDate',
          this.carToChange.deliveryDate
        )
        this.carToChange.state = 'Para entrega'

        Object.assign(this.carsEntries, this.carToChange)
        this.updateLocalStorage('carsEntries', this.carsEntries)
        console.log(this.carToChange.deliveryDate)
        console.log(this.carToChange)
        // alert(`Veh??culo listo para entrega el ${this.carToChange.deliveryDate}. Por favor continue a facturaci??n`)
        Swal.fire({
          icon: 'success',
          title: `Veh??culo listo para entrega el ${this.carToChange.deliveryDate}`,
          text: 'Por favor continue a facturaci??n',
        })
        this.isPreDeliverCheckScreen = false
        this.isPendingRevisionsScreen = true
      }
    },

    agregar(id){
      let rep = false
      console.log(id)
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
   },
   facturar(car){
    this.detalle = car.detalle
    localStorage.setItem('detalle', JSON.stringify(this.detalle))
    localStorage.setItem('catalogo', JSON.stringify(this.repuestos))
    localStorage.setItem('cliente', JSON.stringify(this.carToChange.idClient)) 
    
    this.carToChange.state='Finalizado'
    Object.assign(this.carsEntries,this.carToChange)
    this.updateLocalStorage('carsEntries', this.carsEntries)
    window.open("../venta/index.html", "_self")

   },

   aumentar(id, index){
      if(  this.repuestos[id].cantidad > 0){ 
          this.detalle[index].cantidad++
          this.repuestos[id].cantidad-- 
          this.detalle[index].valor = this.detalle[index].cantidad * this.repuestos[id].valor
          
      }else{
          alert("El producto ya no tienen stock disponible")
      } 
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
   },
   logout() {
    localStorage.removeItem("rol");
    localStorage.removeItem("name");
    window.location = "../index.html";
  },
  },
 

  created: function () {
    this.onLoadPage()

    let catalogo = JSON.parse(localStorage.getItem('catalogo'));
    let Detalle = JSON.parse(localStorage.getItem('detalle'));

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
              "nombre": "Buj??as",
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
              "nombre": "Bater??a",
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
              "nombre": "Neum??ticos",
              "valor": 300,
              "imagen": "https://www.eluniverso.com/resizer/EmU7BmQQfCE9-HX7HCdtBgqeA9w=/740x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/6OMBHHVNTVBWFO7DVPEXZZY4RA.jpg",
              "cantidad": 200
          },
      )

  }else{
      this.repuestos = catalogo;
  }
  },
  
})

app.mount('#app')
