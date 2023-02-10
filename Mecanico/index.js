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
        { name: 'Luces', done: true },
        { name: 'Frenos', done: true },
        { name: 'Liquidos', done: true },
        { name: 'Gases', done: true },
        { name: 'Espejos', done: true }
      ],
      carsEntries: [
        {
          entryDate: '01/01/2023',
          deliveryDate: null,
          description: '',
          brand: 'mazda 323',
          model: 2001,
          plate: 'NRO-185',
          state: 'Sin revisar'
        },
        {
          entryDate: '01/04/2001',
          deliveryDate: null,
          description: '',
          brand: 'subaru r12',
          model: 2011,
          plate: 'NSY-578',
          state: 'Sin revisar'
        },
        {
          entryDate: '01/08/2001',
          deliveryDate: null,
          description: '',
          brand: 'bmw e21',
          model: 2012,
          plate: 'SIE-901',
          state: 'Sin revisar'
        },
        {
          entryDate: '01/11/2001',
          deliveryDate: null,
          description: '',
          brand: 'renault sandero',
          model: 2022,
          plate: 'EPG-106',
          state: 'Sin revisar'
        },
        {
          entryDate: '01/11/2001',
          deliveryDate: null,
          description: '',
          brand: 'Toyota MC12',
          model: 2019,
          plate: 'FGA-810',
          state: 'Sin revisar'
        }
      ],
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
      currentLogged: null
    }
  },

  methods: {
    onLoadPage () {
      this.isPendingRevisionsScreen = true
      // this.assignWorker()
      if (
        //currentLogged:
        localStorage.getItem('currentLogged') === null ||
        localStorage.getItem('currentLogged') === undefined ||
        //carsEntries:
        localStorage.getItem('carsEntries') === null ||
        localStorage.getItem('carsEntries') === undefined ||
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
        localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries))
        localStorage.setItem('failures', JSON.stringify(this.failures))
        localStorage.setItem('usedParts', JSON.stringify(this.usedParts))
      } else {
        //currentLogged:
        localStorage.setItem(
          'currentLogged',
          localStorage.getItem('currentLogged')
        )
        const toUpdateLocalCurrentLogged = JSON.parse(
          localStorage.getItem('carsEntries')
        )
        this.currentLogged = toUpdateLocalCurrentLogged
        //carsEntries:
        localStorage.setItem('carsEntries', localStorage.getItem('carsEntries'))
        const toUpdateLocalCarsEntries = JSON.parse(
          localStorage.getItem('carsEntries')
        )
        this.carsEntries = toUpdateLocalCarsEntries
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
          this.carToChange.state = 'En revisión'

          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          this.isPendingRevisionsScreen = false
          this.isRevisionScreen = true
          break

        case 'En revisión':
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
          //   `Este vehículo está listo para entrega. La fecha de entrega es: ${this.carToChange.deliveryDate}`
          // )
          Swal.fire({
            icon: 'success',
            title: '¡Este vehículo está listo para entrega!',
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
        //   'El vehículo no ha sido reparado. Los cambios serán guardados para próximas reparaciones'
        // )
        Swal.fire({
          icon: 'warning',
          title: '¡El vehículo no ha sido reparado!',
          text: 'Los cambios serán guardados para próximas reparaciones',
        })
        ;(this.isPendingRevisionsScreen = true), (this.isRevisionScreen = false)
      } else {
        const isFailAdded = this.failures.some(
          fail => fail.car === this.carToChange.plate
        )

        console.log('isFailAdded', isFailAdded)
        if (isFailAdded) {
          this.carToChange.state = 'Para chequeo'
          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          console.log('ESTADO', this.carToChange)
          // alert('El vehículo ha sido reparado')
          Swal.fire({
            icon: 'success',
            title: '¡El vehículo ha sido reparado!'
          })
          this.isRevisionScreen = false
          this.isPendingRevisionsScreen = true
        } else {
          // alert(
          //   'Por favor inserte las fallas del vehículo antes de terminar la reparación'
          // )
          Swal.fire({
            icon: 'warning',
            title: '¡Inserte fallas!',
            text: 'Por favor inserte las fallas del vehículo antes de terminar la reparación',
          })
        }
      }
    },
    finishCheckup () {
      const isFalse = this.checkups.some(checkup => checkup.done === false)

      if (isFalse) {
        // alert(
        //   'Alguno chequeos no se han realizado todavía. Por favor complete todos los chequeos para finalizar'
        // )
        Swal.fire({
          icon: 'error',
          title: '¡Alguno chequeos no se han realizado todavía!',
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

        console.log(this.carToChange.deliveryDate)
        console.log(this.carToChange)
        // alert(`Vehículo listo para entrega el ${this.carToChange.deliveryDate}. Por favor continue a facturación`)
        Swal.fire({
          icon: 'success',
          title: `Vehículo listo para entrega el ${this.carToChange.deliveryDate}`,
          text: 'Por favor continue a facturación',
        })
        this.isPreDeliverCheckScreen = false
        this.isPendingRevisionsScreen = true
      }
    }
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount('#app')
