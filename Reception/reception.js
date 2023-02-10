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
      if(this.clients){
        const person = this.clients.filter(c => c.id == this.clientEntered);
        this.nameEntered = person[0].name;
      } else {
        this.error = true;
      }
      if(this.vehicles != null){
        const vehicle = this.vehicles.filter(v => v.id == this.clientEntered);
        this.carsFound = vehicle;
      }
      
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
      window.location.reload();
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
      window.location.reload();
      } else {
        this.errorModalClient = true;
      }
    },
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("name");
      window.location = "../index.html";
    },
  }
});