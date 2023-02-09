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
        { name: 'Tires', done: false },
        { name: 'Lights', done: false },
        { name: 'Brakes', done: false },
        { name: 'Fluids', done: true },
        { name: 'Fumes', done: false },
        { name: 'Mirrors', done: false }
      ],
      carsEntries: [
        {
          entryDate: '01/01/2001',
          deliveryDate: '02/02/2003',
          description: '',
          car: 'mazda',
          plate: 'ggg-111',
          state: 'to revise'
        },
        {
          entryDate: '01/01/2001',
          deliveryDate: '02/02/2003',
          description: '',
          car: 'mazda',
          plate: 'ggg-222',
          state: 'to revise'
        },
        {
          entryDate: '01/01/2001',
          deliveryDate: '02/02/2003',
          description: '',
          car: 'mazda',
          plate: 'ggg-444',
          state: 'to final check'
        },
        {
          entryDate: '01/01/2001',
          deliveryDate: '02/02/2003',
          description: '',
          car: 'mazda',
          plate: 'ggg-555',
          state: 'to final check'
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

    }
  },

  methods: {
    onLoadPage(){
        localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries));
    },
    /************* */
    findCarToChange (index) {
      console.log('CAR', index)
      this.carToChange = this.carsEntries[index]
      //dEPENDIENDO DEL ESTADO DEL CARRO SELECCIONADO, SEABRE UNA VENTANA U OTRA
      console.log('carToChange', this.carToChange)
    },
    changeCarState () {
      //y cambia de un estado a otro:
      switch (this.carToChange.state) {
        case 'To revise':
          break

        case 'In revision':
          break

        case 'Under repair':
          break

        case 'Repaired':
          break

        case 'To final check':
          break

        case 'To deliver':
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

        console.log(this.failures, 'failures')
        this.failureInput = ''
      }
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
      } else {
        alert('The vehicle has been repaired.')
        this.carToChange.state = 'REPAIRED'
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
        console.log(this.carToChange)
      }
    }
  },
  created: function () {
    this.onLoadPage()

    
  }
})

app.mount('#app')
