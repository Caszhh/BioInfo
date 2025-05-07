// script.js

// Adding navigation scroll effect
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission handler
document.querySelector('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
});
