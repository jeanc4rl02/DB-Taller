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
        password: "admin123",
      },
      {
        rol: "Vendedor",
        name: "Cristina",
        lastname: "Gómez",
        user: "vendedor",
        password: "admin123",
      },
    ],
    userEntered: "",
    passwordEntered: "",
    error: false,
  },
  methods: {
    verifyUser() {
      const userValidation = this.users.find((u) => u.user == this.userEntered);
      const passwordValidation = this.users.find(
        (u) => u.password == this.passwordEntered
      );

      if (passwordValidation && userValidation) {
        let client = this.users.filter((u) => u.user == this.userEntered);
        localStorage.setItem("name", this.userEntered);
        localStorage.setItem("rol", client[0].rol);
        console.log(localStorage.getItem("rol"));
        this.error = false;
        window.location = "./.html";
      } else {
        this.error = true;
      }
    },
  },
});
