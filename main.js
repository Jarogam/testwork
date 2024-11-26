const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});

window.addEventListener("resize", () => {
   if (window.innerWidth > 768) {
      if (navbarMenu.classList.contains("is-active")) {
         navbarMenu.classList.remove("is-active");
      }
   }
});


let swiper = new Swiper(".mySwiper", {
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

const translations = {
    en: {
        formTitle: "Registration",
        nameLabel: "Name",
        emailLabel: "Email",
        passwordLabel: "Password",
        submitButton: "Register"
    },
    uk: {
        formTitle: "Реєстрація",
        nameLabel: "Ім'я",
        emailLabel: "Електронна пошта",
        passwordLabel: "Пароль",
        submitButton: "Зареєструватися"
    },
    es: {
        formTitle: "Registro",
        nameLabel: "Nombre",
        emailLabel: "Correo electrónico",
        passwordLabel: "Contraseña",
        submitButton: "Registrarse"
    }
};

const languageSelector = document.getElementById('languageSelector');
languageSelector.addEventListener('change', () => {
    const selectedLang = languageSelector.value;
    const texts = translations[selectedLang];

    document.getElementById('formTitle').textContent = texts.formTitle;
    document.getElementById('nameLabel').textContent = texts.nameLabel;
    document.getElementById('emailLabel').textContent = texts.emailLabel;
    document.getElementById('passwordLabel').textContent = texts.passwordLabel;
    document.getElementById('submitButton').textContent = texts.submitButton;
});


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    fetch('server-endpoint.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('responseMessage');
        if (data.success) {
            messageElement.textContent = 'Submission successful!';
        } else {
            messageElement.textContent = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = 'Failed to submit the form.';
    });
});

