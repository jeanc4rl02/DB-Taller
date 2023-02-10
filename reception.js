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
    vehicles:[
      {
        id: 1001,
        plate: "FUN-212",
        brand: "Nissan",
        model: 2021,
        entry: ""
      },
      {
        id: 1002,
        plate: "RAR-212",
        brand: "Kia",
        model: 2015,
        entry: ""
      },
      {
        id: 1003,
        plate: "SUN-212",
        brand: "BMW",
        model: 2023,
        entry: ""
      },
      {
        id: 1003,
        plate: "RUN-212",
        brand: "Audi",
        model: 2023,
        entry: ""
      }
    ],
    clientEntered: "",
    nameEntered: "",
    makeEntered: "",
    dateEntered: "",
    carsFound: null,
    carSelected: null,
    selectedVehicle: null,
    description: "",
    newEntry: null,
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
    }
  }
});