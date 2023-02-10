let vm = new Vue({
  el: "#app",
  data: {
    users: [
      {
        rol: "Admin",
        name: "Juan",
        lastname: "Perez",
        user: "admin",
        password: "admin123",
      },
      {
        rol: "Mecánico",
        name: "María",
        lastname: "Pérez",
        user: "mecanico",
        password: "a",
      },
      {
        rol: "Vendedor",
        name: "Cristina",
        lastname: "Gómez",
        user: "vendedor",
        password: "v",
      },
    ],
    userEntered: "",
    passwordEntered: "",
    error: false,
  },
  methods: {
    verifyUser() {
      const userValidation = this.users.find((u) => u.user == this.userEntered);
      console.log("USER",userValidation)
      const passwordValidation = this.users.find(
        (u) => u.password == this.passwordEntered
      );

      if (passwordValidation && userValidation) {
        let client = this.users.filter((u) => u.user == this.userEntered);
        localStorage.setItem("name", this.userEntered);
        localStorage.setItem("rol", client[0].rol);
        console.log(localStorage.getItem("rol"));
        this.error = false;

       switch(this.userEntered){
        case 'mecanico':
          window.location = "./Mecanico/index.html";
        break
        case 'admin':
          window.location = "";
        break
        case 'vendedor':
          window.location = "./venta/index.html";
        break
       }
        
      } else {
        this.error = true;
      }
    },
  },
});
