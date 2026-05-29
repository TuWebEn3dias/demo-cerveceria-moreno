(() => {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // Intersection Observer for animations
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade, .animate-slide-up').forEach(el => {
    observer.observe(el);
  });

  // Form → WhatsApp
  const form = document.getElementById('reservas-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const fecha = document.getElementById('fecha').value;
      const personas = document.getElementById('personas').value;
      const telefono = document.getElementById('telefono').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if (!nombre || !fecha || !personas || !telefono) return;

      const fechaFmt = new Date(fecha + 'T12:00:00').toLocaleDateString('es-AR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      let text = `Hola! Quiero reservar en Cervecería Moreno.\n\n`;
      text += `👤 Nombre: ${nombre}\n`;
      text += `📅 Fecha: ${fechaFmt}\n`;
      text += `👥 Personas: ${personas}\n`;
      text += `📞 Mi teléfono: ${telefono}`;
      if (mensaje) text += `\n💬 ${mensaje}`;

      const waUrl = `https://wa.me/5491165167057?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }
})();