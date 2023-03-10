new Vue({
  el: "#app",
  data: {
    clients:JSON.parse(localStorage.getItem("clients")),
    vehicles:JSON.parse(localStorage.getItem("vehicles")),
    clientEntered: "",
    nameEntered: "",
    makeEntered: "",
    dateEntered: "",
    carsFound: null,
    carSelected: null,
    selectedVehicle: null,
    description: null,
    newEntry: null,
    newVehicle: null,
    showModal: false,
    showModal1: false,
    modalId: "",
    modalPlate: "",
    modalBrand: "",
    modalModel: null,
    error: false,
    errorVehicle: false,
    errorEntry: false,
    errorClient: false,
    errorModalClient: false,
    inputId: null,
    inputName: null,
    inputLastName: null,
    inputPhone: null,
    modelEntry: null,
    brandEntry: null
  }, 
  methods: {
    findClient(){
      this.dateEntered = ""
      this.makeEntered = ""
      this.nameEntered = "" 
      if(this.clients){
        const person = this.clients.filter(c => c.id == this.clientEntered);
        this.nameEntered = person[0].name;
      } else {
        this.error = true;
      }
      this.vehicles = JSON.parse(localStorage.getItem("vehicles"))
      if(this.vehicles != null){
        const vehicle = this.vehicles.filter(v => v.id == this.clientEntered);
        this.carsFound = vehicle;
      }
      this.modalId =  this.clientEntered
      console.log(this.carsFound);
    },
    findVehicle(){
      let car = this.carsFound.filter(c => c.plate == this.selectedVehicle)
      this.modelEntry = car[0].model;
      this.brandEntry = car[0].brand
      this.makeEntered = this.brandEntry +"-"+ this.modelEntry;
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      this.dateEntered = day+"/"+month+"/"+year;
      console.log(car);
    },
    generateEntry(){
      if(this.clientEntered != null && this.nameEntered != null && this.selectedVehicle != null && this.dateEntered != null && this.description != null){
        this.newEntry = [];
        this.newEntry = JSON.parse(localStorage.getItem("carsEntries")) || []
        this.newEntry.push({
        idClient: this.clientEntered,
        name: this.nameEntered,
        plate: this.selectedVehicle,
        brand: this.brandEntry,
        model: this.modelEntry,
        entryDate: this.dateEntered,
        description: this.description,
        deliveryDate: null,
        state: "Sin revisar",
        detalle: []
      })
        localStorage.setItem("carsEntries", JSON.stringify(this.newEntry));
      } else {
        this.errorEntry = true;
      }
      window.location.reload();
    },
    generateNewVehicle(){
      if(this.modalId != null && this.modalPlate != null && this.modalBrand != null && this.modalModel != null){
        this.newVehicle = [];
        this.newVehicle = JSON.parse(localStorage.getItem("vehicles")) || []
        this.newVehicle.push({
          id: this.modalId,
          plate: this.modalPlate,
          brand: this.modalBrand,
          model: this.modalModel,
      })
      localStorage.setItem("vehicles", JSON.stringify(this.newVehicle));
      this.modalId = this.clientEntered 
      this.findClient() 
      this.onLoadPage()
      this.showModal = false 
      //window.location.reload();
      } else {
        this.errorVehicle = true;
      }
    },
    generateNewClient(){
      if(this.inputId != null && this.inputName != null && this.inputLastName != null && this.inputPhone != null){
        this.clients = [];
        this.clients = JSON.parse(localStorage.getItem("clients")) || []
        this.clients.push({
          id: this.inputId,
          name: this.inputName,
          lastname: this.inputLastName,
          phone: this.inputPhone,
      })
      localStorage.setItem("clients", JSON.stringify(this.clients));
      this.clientEntered = this.inputId 
      this.modalId = this.inputId 
      this.findClient()
      this.showModal1 = false
      //window.location.reload();
      } else {
        this.errorModalClient = true;
      }
    },
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("name");
      window.location = "../index.html";
    },
    onLoadPage () {
      this.isPendingRevisionsScreen = true
      // this.assignWorker()
      if (
        //currentLogged:
        localStorage.getItem('vehicles') === null ||
        localStorage.getItem('vehicles') === undefined ||
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
          'vehicles',
          JSON.stringify(this.vehicles)
        )
        ///localStorage.setItem('carsEntries', JSON.stringify(this.carsEntries))
        localStorage.setItem('failures', JSON.stringify(this.failures))
        localStorage.setItem('usedParts', JSON.stringify(this.usedParts))
      } else {
        //vehicles:
        localStorage.setItem(
          'vehicles',
          localStorage.getItem('vehicles')
        )
        const toUpdateLocalVehicles = JSON.parse(
          localStorage.getItem('vehicles')
        )
        this.vehicles = toUpdateLocalVehicles
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
  },
  updated() { 
     this.onLoadPage()
  },
});