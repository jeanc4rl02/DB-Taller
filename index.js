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
        { name: 'tires', done: null },
        { name: 'tires', done: null },
        { name: 'tires', done: null },
        { name: 'tires', done: null },
        { name: 'tires', done: null },
        { name: 'tires', done: null }
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
      failures: [],
      usedParts: [],
      selectedCar: 'ggg-555',
      failureInput: null,
      partInput: null,
      partQuantityInput: null,
      carToChange: null,
      isRepaired: null
    }
  },

  methods: {
    findCarToChange () {
      this.carToChange = this.carsEntries.find(car => {
        return car.plate === this.selectedCar
      })

      console.log('carToChange', this.carToChange)
      //dEPENDIENDO DEL ESTADO DEL CARRO SELECCIONADO, SEABRE UNA VENTANA U OTRA:
     
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
        this.carToChange.state='REPAIRED'
        console.log("ESTADO",this.carToChange)
      }
    }
  },
  created: function () {}
})

app.mount('#app')
