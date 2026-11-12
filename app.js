/**
 * your.site — Multi-Theme Engine & Interaction
 * Cycles through 8 distinct modern design aesthetics on each refresh or click.
 */

const THEMES = [
  {
    id: 'neobrutalism',
    name: 'Neo-Brutalism (Стикерний / Поп-контрастний)',
    index: 1,
    desc: 'Товсті чорні обводки, жорсткі тіні, стикери та яскравий поп-фон'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk HUD (Неоновий Sci-Fi / Кібер-кути)',
    index: 2,
    desc: 'Чорний фон, неоновий циан, зрізані кібер-кути та термінальний шрифт'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism (Apple Cupertino Aurora Glass)',
    index: 3,
    desc: 'Глибокі кольорові градієнти, розмиття скла, пігулкові форми'
  },
  {
    id: 'bento_dark',
    name: 'Dark Bento SaaS (Стиль Linear & Vercel)',
    index: 4,
    desc: 'Темний модульний Bento-інтерфейс, фіолетове світіння, hi-tech'
  },
  {
    id: 'editorial',
    name: 'Editorial Luxury (Шик Awwwards / Золоті акценти)',
    index: 5,
    desc: 'Паперовий фон, вишукана антиква Playfair Display, преміальні золоті деталі'
  },
  {
    id: 'terminal',
    name: 'Retro Matrix Terminal (Зелений фосфорний монітор)',
    index: 6,
    desc: 'Монохромний зелений термінал, матричні ефекти та моноширинний код'
  },
  {
    id: 'minimalism',
    name: 'Swiss Bauhaus (Швейцарський гротеск / Червоний маркер)',
    index: 7,
    desc: 'Білий мінімалізм, чітка геометрія, швейцарський гротеск, червоні плашки'
  },
  {
    id: 'y2k_retro',
    name: 'Y2K Windows 2000 (Ретро-пастелі / Бабл 90-х)',
    index: 8,
    desc: 'Пастельні палітри, округлі бабл-кнопки та легкий ретро-вайб'
  }
];

// DOM Elements
const bodyEl = document.body;
const themeSelect = document.getElementById('themeSelect');
const randomThemeBtn = document.getElementById('randomThemeBtn');
const heroTryStyleBtn = document.getElementById('heroTryStyleBtn');
const currentThemeNameEl = document.getElementById('currentThemeName');
const styleCounterEl = document.getElementById('styleCounter');
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');
const currentYearEl = document.getElementById('currentYear');

// Current theme state
let currentThemeIndex = 0;

/**
 * Apply a theme by ID
 */
function applyTheme(themeId, saveToStorage = true) {
  const foundIndex = THEMES.findIndex(t => t.id === themeId);
  if (foundIndex === -1) return;

  currentThemeIndex = foundIndex;
  const theme = THEMES[currentThemeIndex];

  // Apply to body
  bodyEl.setAttribute('data-theme', theme.id);

  // Update controller UI
  if (currentThemeNameEl) {
    currentThemeNameEl.textContent = theme.name;
  }
  if (styleCounterEl) {
    styleCounterEl.textContent = `Стиль ${theme.index} з ${THEMES.length}`;
  }
  if (themeSelect) {
    themeSelect.value = theme.id;
  }

  // Save state
  if (saveToStorage) {
    sessionStorage.setItem('lastThemeId', theme.id);
  }
}

/**
 * Switch to the next theme in sequence
 */
function nextTheme() {
  let nextIndex = (currentThemeIndex + 1) % THEMES.length;
  applyTheme(THEMES[nextIndex].id);
}

/**
 * Pick next theme on page reload so each refresh transforms the site
 */
function initThemeOnLoad() {
  const lastThemeId = sessionStorage.getItem('lastThemeId');
  let chosenIndex;

  if (lastThemeId) {
    const lastIndex = THEMES.findIndex(t => t.id === lastThemeId);
    chosenIndex = (lastIndex + 1) % THEMES.length;
  } else {
    chosenIndex = Math.floor(Math.random() * THEMES.length);
  }

  applyTheme(THEMES[chosenIndex].id);
}

// Event Listeners
if (randomThemeBtn) {
  randomThemeBtn.addEventListener('click', nextTheme);
}

if (heroTryStyleBtn) {
  heroTryStyleBtn.addEventListener('click', nextTheme);
}

if (themeSelect) {
  themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });
}

// Dynamic Year
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Order Form Handler
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const contact = document.getElementById('clientContact').value.trim();
    const siteType = document.getElementById('siteType').value;
    const message = document.getElementById('clientMessage').value.trim();
    const activeTheme = THEMES[currentThemeIndex].name;

    const subject = encodeURIComponent(`Заявка на швидкий сайт від ${name}`);
    const bodyContent = encodeURIComponent(
      `Ім'я: ${name}\n` +
      `Контакт: ${contact}\n` +
      `Обраний формат: ${siteType}\n` +
      `Вподобаний стиль сайту: ${activeTheme}\n` +
      `Коментар/Ніша: ${message || 'Не вказано'}\n`
    );

    const mailtoUri = `mailto:sanshshevchuk@gmail.com?subject=${subject}&body=${bodyContent}`;

    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `
        ✓ <strong>Дякуємо, ${name}!</strong><br>
        Заявку сформовано. Якщо пошта не відкрилась автоматично, напишіть нам на <strong>sanshshevchuk@gmail.com</strong>
      `;
      formStatus.style.display = 'block';
    }

    window.location.href = mailtoUri;

    setTimeout(() => {
      orderForm.reset();
    }, 1500);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeOnLoad);
