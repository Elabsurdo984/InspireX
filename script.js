document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Basic email validation
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('¡Gracias por suscribirte! Pronto recibirás novedades de ThinkLab.');
                this.reset();
            } else {
                alert('Por favor, introduce un correo electrónico válido.');
            }
        });
    }

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Simple testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let currentTestimonial = 0;
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial-card');
        
        function rotateTestimonials() {
            // Hide all testimonials
            testimonials.forEach(t => t.style.display = 'none');
            
            // Show current testimonial
            testimonials[currentTestimonial].style.display = 'block';
            
            // Move to next testimonial
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }

        // Initial setup
        rotateTestimonials();
        
        // Rotate testimonials every 5 seconds
        setInterval(rotateTestimonials, 5000);
    }

    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';

    // Add mobile menu toggle functionality for smaller screens
    function setupMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navLinks.style.display = 'none';

            mobileMenuToggle.addEventListener('click', () => {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.zIndex = '1000';
                    navLinks.style.padding = '1rem';
                } else {
                    navLinks.style.display = 'none';
                }
            });
        } else {
            mobileMenuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }

    // Add mobile menu toggle to the page
    const header = document.querySelector('header nav');
    header.insertBefore(mobileMenuToggle, header.firstChild);

    // Initial mobile menu setup and respond to window resize
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // Course details modal (placeholder functionality)
    const courseDetailButtons = document.querySelectorAll('.btn-course');
    courseDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            alert(`Próximamente: Más detalles sobre el curso de ${courseName}. ¡Mantente atento!`);
        });
    });

    // Scroll-based animations
    function checkScroll() {
        const scrollAnimations = document.querySelectorAll('.course-card, .advantage-card');
        
        scrollAnimations.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);

    // Button to trigger registration modal
    const botonRegistro = document.querySelector('.cta .btn.btn-large');
    if (botonRegistro) {
        botonRegistro.addEventListener('click', function() {
            openAuthModal();
        });
    }

    // Authentication Modal Logic
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const profileSection = document.getElementById('profile-section');
    const loginButtons = document.querySelectorAll('.btn-login, .btn-signup');
    const closeModalBtn = document.querySelector('.close-modal');

    // Form elements
    const loginFormSubmit = document.getElementById('login-form-submit');
    const registerFormSubmit = document.getElementById('register-form-submit');
    const logoutBtn = document.getElementById('logout-btn');

    // Form switch links
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');

    // Authentication State Management
    function updateAuthButtons() {
        const isLoggedIn = getCurrentUser();
        const authButtons = document.querySelectorAll('.btn-login, .btn-signup');
        
        if (isLoggedIn) {
            authButtons.forEach(btn => {
                btn.textContent = 'Mi Perfil';
                btn.addEventListener('click', openProfileModal);
            });
        } else {
            authButtons.forEach(btn => {
                btn.textContent = btn.classList.contains('btn-login') ? 'Iniciar Sesión' : 'Registrarse';
                btn.addEventListener('click', openAuthModal);
            });
        }
    }

    // Open Authentication Modal
    function openAuthModal() {
        authModal.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        profileSection.style.display = 'none';
    }

    // Open Profile Modal
    function openProfileModal() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            authModal.style.display = 'block';
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            profileSection.style.display = 'block';
            
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `
                <p><strong>Nombre:</strong> ${currentUser.name}</p>
                <p><strong>Correo:</strong> ${currentUser.email}</p>
                <p><strong>Fecha de Registro:</strong> ${currentUser.registrationDate}</p>
            `;
        }
    }

    // Close Modal
    function closeModal() {
        authModal.style.display = 'none';
    }

    // Form Switching
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // User Registration
    registerFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('thinklab-users') || '[]');
        const userExists = existingUsers.some(user => user.email === email);

        if (userExists) {
            alert('Ya existe un usuario con este correo electrónico');
            return;
        }

        // Create new user
        const newUser = {
            name,
            email,
            password,
            registrationDate: new Date().toLocaleDateString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('thinklab-users', JSON.stringify(existingUsers));
        localStorage.setItem('thinklab-current-user', JSON.stringify(newUser));

        alert('Registro exitoso');
        updateAuthButtons();
        closeModal();
    });

    // User Login
    loginFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('thinklab-users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('thinklab-current-user', JSON.stringify(user));
            alert('Inicio de sesión exitoso');
            updateAuthButtons();
            closeModal();
        } else {
            alert('Correo o contraseña incorrectos');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('thinklab-current-user');
        updateAuthButtons();
        closeModal();
        alert('Sesión cerrada exitosamente');
    });

    // Helper function to get current user
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('thinklab-current-user'));
    }

    // Initial setup
    updateAuthButtons();
});
