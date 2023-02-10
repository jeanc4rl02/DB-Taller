new Vue({
  el: "#app",
  data: {
    clients:[
      { 
        id: 1001,
        name: "Juan",
        lastname: "Pérez",
        phone: 312836,
      },
      { 
        id: 1003,
        name: "Maria",
        lastname: "Pérez",
        phone: 312837,
      },
      { 
        id: 1002,
        name: "Astrid",
        lastname: "Pérez",
        phone: 312838,
      }
    ],
    vehicles:JSON.parse(localStorage.getItem("vehicles")),
    clientEntered: "",
    nameEntered: "",
    makeEntered: "",
    dateEntered: "",
    carsFound: null,
    carSelected: null,
    selectedVehicle: null,
    description: "",
    newEntry: null,
    newVehicle: null,
    showModal: false,
    modalId: "",
    modalPlate: "",
    modalBrand: "",
    modalModel: null,
    error: false,
    errorVehicle: false,
    errorEntry: false,
    errorClient: false
  }, 
  methods: {
    findClient(){
      let person = this.clients.filter(c => c.id == this.clientEntered);
      let vehicle = this.vehicles.filter(v => v.id == this.clientEntered);
      this.nameEntered = person[0].name;
      this.carsFound = vehicle;
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
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("name");
      window.location = "./index.html";
    },
  }
});