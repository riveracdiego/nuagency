/* Seleccionamos los elementos del DOM */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const categoryLink = document.getElementById('category-link');
const closeLightbox = document.getElementById('close-lightbox');
const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item')); // Convertido a Array para usar indexOf

// Nuevos botones de navegación
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0; // Guardamos la posición de la imagen abierta

/* --- 1. LÓGICA DEL MENÚ DE HAMBURGUESA --- */
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('is-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

/* --- 2. LÓGICA DE ACTUALIZACIÓN DE CONTENIDO --- */
const updateLightboxContent = (index) => {
    const item = portfolioItems[index];
    const imgSrc = item.querySelector('img').src;
    const categoryName = item.getAttribute('data-category');
    
    // Pequeño fundido al cambiar entre imágenes
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        categoryLink.href = `${categoryName}.html`;
        lightboxImg.style.opacity = '1';
    }, 150);
    
    currentIndex = index;
};

/* --- 3. ABRIR LIGHTBOX --- */
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateLightboxContent(index);
        
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    });
});

/* --- 4. NAVEGACIÓN (FLECHAS) --- */
const showNext = (e) => {
    if (e) e.stopPropagation(); // Evita que el clic cierre el lightbox
    currentIndex = (currentIndex + 1) % portfolioItems.length;
    updateLightboxContent(currentIndex);
};

const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightboxContent(currentIndex);
};

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

/* --- 5. CERRAR LIGHTBOX --- */
const closeBox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 350);
    document.body.style.overflow = 'auto';
};

closeLightbox.addEventListener('click', closeBox);

// Cerrar al hacer clic en el fondo oscuro
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBox();
});

/* --- 6. SOPORTE PARA TECLADO --- */
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeBox();
});