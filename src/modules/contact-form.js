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
        const lang2 = document.documentElement.lang === 'ms' ? 'ms' : 'en';
        btn.textContent = TRANSLATIONS[lang2]['js.send'];
        btn.disabled = false;
        alert(TRANSLATIONS[lang2]['js.error']);
      }
    });
  }
}
