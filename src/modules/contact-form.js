import { TRANSLATIONS } from './i18n.js'

export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const lang = document.documentElement.lang === 'ms' ? 'ms' : 'en';
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = TRANSLATIONS[lang]['js.sending'];
      btn.disabled = true;
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.innerHTML = `<div class="form-success">
            <p>${TRANSLATIONS[lang]['js.success']}</p>
          </div>`;
        } else {
          throw new Error('server error');
        }
      } catch {
        btn.textContent = TRANSLATIONS[lang]['js.send'];
        btn.disabled = false;
        alert(TRANSLATIONS[lang]['js.error']);
      }
    });
  }
}
