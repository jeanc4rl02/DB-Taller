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
  }, 
  methods: {
    findClient(){
        let person = this.clients.filter(c => c.id == this.clientEntered);
        this.nameEntered = person[0].name;
      
      if(this.vehicles != null){
        const vehicle = this.vehicles.filter(v => v.id == this.clientEntered);
        this.carsFound = vehicle;
      }
      
      console.log(this.carsFound);
    },
    findVehicle(){
      let car = this.carsFound.filter(c => c.plate == this.selectedVehicle)
      this.makeEntered = car[0].brand +"-"+ car[0].model;
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
      this.newEntry = JSON.parse(localStorage.getItem("entrys")) || []
      this.newEntry.push({
        idClient: this.clientEntered,
        name: this.nameEntered,
        vehicle: this.selectedVehicle,
        date: this.dateEntered,
        description: this.description
      })
      window.location.reload();
    localStorage.setItem("entrys", JSON.stringify(this.newEntry));
      } else {
        this.errorEntry = true;
      }
      
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
      window.location.reload();
    localStorage.setItem("vehicles", JSON.stringify(this.newVehicle));
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
      window.location.reload();
    localStorage.setItem("clients", JSON.stringify(this.clients));
      } else {
        this.errorModalClient = true;
      }
    },
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("name");
      window.location = "./index.html";
    },
  }
});