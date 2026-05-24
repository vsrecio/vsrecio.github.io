// Simple logic to set the current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Micro-interaction for social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if(this.getAttribute('href') === '#') {
        e.preventDefault();
        // Fallback animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });

  // Micro-interaction for main links
  const linkCards = document.querySelectorAll('.link-card');
  linkCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if(this.getAttribute('href') === '#') {
        e.preventDefault();
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });

  // Logic for share button
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Víctor S. Recio | Arquitecto de Nube y Software',
        text: 'Mira el perfil profesional de Víctor S. Recio, Arquitecto de Nube/Software, Mentor y Conferencista.',
        url: window.location.href
      };
      
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(window.location.href);
          
          // Show checkmark feedback on button
          const originalHTML = shareBtn.innerHTML;
          shareBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
          
          // Create custom toast
          const toast = document.createElement('div');
          toast.textContent = '¡Enlace de perfil copiado!';
          toast.style.position = 'fixed';
          toast.style.bottom = '30px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.background = 'rgba(15, 17, 21, 0.95)';
          toast.style.border = '1px solid var(--accent-blue)';
          toast.style.color = '#fff';
          toast.style.padding = '0.8rem 1.5rem';
          toast.style.borderRadius = '30px';
          toast.style.fontSize = '0.9rem';
          toast.style.fontWeight = '600';
          toast.style.zIndex = '1000';
          toast.style.boxShadow = '0 10px 25px rgba(62, 176, 249, 0.3)';
          toast.style.transition = 'opacity 0.3s ease';
          toast.style.backdropFilter = 'blur(10px)';
          toast.style.webkitBackdropFilter = 'blur(10px)';
          document.body.appendChild(toast);

          setTimeout(() => {
            shareBtn.innerHTML = originalHTML;
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    });
  }
});
