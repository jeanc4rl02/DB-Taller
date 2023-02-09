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
        { name: 'Tires', done: true },
        { name: 'Lights', done: true },
        { name: 'Brakes', done: true },
        { name: 'Fluids', done: true },
        { name: 'Fumes', done: true },
        { name: 'Mirrors', done: true }
      ],
      carsEntries: [
        {
          entryDate: '01/01/2023',
          deliveryDate: null,
          description: '',
          brand: 'mazda 323',
          model: 2001,
          plate: 'NRO-185',
          state: 'To revise'
        },
        {
          entryDate: '01/04/2001',
          deliveryDate: null,
          description: '',
          brand: 'subaru r12',
          model: 2011,
          plate: 'NSY-578',
          state: 'To revise'
        },
        {
          entryDate: '01/08/2001',
          deliveryDate: null,
          description: '',
          brand: 'bmw e21',
          model: 2012,
          plate: 'SIE-901',
          state: 'To final check'
        },
        {
          entryDate: '01/11/2001',
          deliveryDate: null,
          description: '',
          brand: 'renault sandero',
          model: 2022,
          plate: 'EPG-106',
          state: 'To final check'
        },
        {
          entryDate: '01/11/2001',
          deliveryDate: null,
          description: '',
          brand: 'Toyota MC12',
          model: 2019,
          plate: 'FGA-810',
          state: 'To final check'
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
      status: [
        'To revise',
        'In revision',
        'Under repair',
        'Repaired',
        'To final check',
        'In checking',
        'To deliver'
      ],
      failures: [],
      usedParts: [],
      selectedCar: 'ggg-555',
      failureInput: null,
      partInput: null,
      partQuantityInput: null,
      carToChange: null,
      isRepaired: null,
      //Screens:
      isPendingRevisionsScreen: false,
      isRevisionScreen: false,
      isPartsScreen: false,
      isPreDeliverCheckScreen: false,
      isFactura: false
    }
  },

  methods: {
    openFactura () {
      ;(this.isPendingRevisionsScreen = false),
        (this.isRevisionScreen = false),
        (this.isPartsScreen = false),
        (this.isPreDeliverCheckScreen = false),
        (this.isFactura = true)
    },
    onLoadPage () {
      this.isPendingRevisionsScreen = true
      this.isFactura = true
      if (
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
        localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries))
        localStorage.setItem('failures', JSON.stringify(this.failures))
        localStorage.setItem('usedParts', JSON.stringify(this.usedParts))
      } else {
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
    /************* */
    findCarToChange (car) {
      this.carToChange = this.carsEntries.find(cars => {
        return cars.plate === car.plate
      })
      //dEPENDIENDO DEL ESTADO DEL CARRO SELECCIONADO, SEABRE UNA VENTANA U OTRA
      console.log('carToChange', this.carToChange)
      this.changeCarState()
    },
    updateLocalStorage (where, what) {
      localStorage.setItem(where, JSON.stringify(what))
    },
    changeCarState () {
      //y cambia de un estado a otro:
      switch (this.carToChange.state) {
        case 'To revise':
          console.log('toy aca')
          this.carToChange.state = 'In revision'

          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          this.isPendingRevisionsScreen = false
          this.isRevisionScreen = true
          break

        case 'In revision':
          this.isPendingRevisionsScreen = false
          this.isRevisionScreen = true
          break

        case 'Under repair':
          break

        case 'Repaired':
          break

        case 'To final check':
          this.carToChange.state = 'In checking'
          Object.assign(this.carsEntries, this.carToChange)
          this.updateLocalStorage('carsEntries', this.carsEntries)
          this.isPendingRevisionsScreen = false
          this.isPreDeliverCheckScreen = true
          break

        case 'In checking':
          this.isPendingRevisionsScreen = false
          this.isPreDeliverCheckScreen = true
        case 'To deliver':
          alert(
            `This car is ready to deliver. The deliver date is: ${this.carToChange.deliveryDate}`
          )
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
      console.log('FAILURES', this.failures)

      const currentCarFails = this.failures.filter(fail => {
        return fail.car == plate
      })
      console.log('currentCarFails', currentCarFails)

      let result = currentCarFails.filter(fail => {
        return fail.failure !== toQuit
      })

      console.log('result', result)
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
        alert(
          'The vehicle has not been repaired. The changes will be saved to future repairings'
        )
        // this.isPendingRevisionsScreen=true,
        // this.isRevisionScreen= false,
      } else {
        alert('The vehicle has been repaired.')
        this.carToChange.state = 'To final check'
        Object.assign(this.carsEntries, this.carToChange)
        this.updateLocalStorage('carsEntries', this.carsEntries)
        console.log('ESTADO', this.carToChange)
      }
    },
    finishCheckup () {
      const isFalse = this.checkups.some(checkup => checkup.done === false)

      if (isFalse) {
        alert(
          'SOme checkups are not done yet. Please complete all the checkups to finish'
        )
      } else {
        alert('car ready to deliver')
        this.carToChange.deliveryDate = new Date()
        console.log(
          'this.carToChange.deliveryDate',
          this.carToChange.deliveryDate
        )
        this.carToChange.state = 'To deliver'

        Object.assign(this.carsEntries, this.carToChange)

        console.log(this.carToChange.deliveryDate)
        console.log(this.carToChange)
      }
    }
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount('#app')
