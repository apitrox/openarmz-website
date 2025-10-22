/**
 * Open Arms Language Handler
 * Manages multi-language support and translations
 */

(function() {
    'use strict';

    // Language management
    const LanguageManager = {
        currentLang: 'en',
        defaultLang: 'en',

        init: function() {
            // Load saved language preference or default to English
            this.currentLang = localStorage.getItem('openarms_language') || this.defaultLang;
            this.createLanguageSelector();
            this.applyTranslations();
        },

        createLanguageSelector: function() {
            // Find the navigation container
            const desktopNav = document.querySelector('.site-nav ul');
            const mobileNav = document.querySelector('.site-nav ul');
            
            if (!desktopNav) return;

            // Create language selector HTML
            const languageHTML = `
                <li class="language-selector">
                    <button id="language-toggle" class="lang-toggle" aria-label="Select language">
                        <svg class="lang-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                        </svg>
                        <span id="current-language">${translations[this.currentLang].name}</span>
                        <svg class="lang-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="language-dropdown" class="lang-dropdown">
                        ${this.generateLanguageOptions()}
                    </div>
                </li>
            `;

            // Add to nav
            desktopNav.insertAdjacentHTML('beforeend', languageHTML);

            // Add event listeners
            this.attachEventListeners();
        },

        generateLanguageOptions: function() {
            const languages = [
                { code: 'zh', name: '中文 (Chinese)' },
                { code: 'en', name: 'English (English)' },
                { code: 'fr', name: 'Français (French)' },
                { code: 'de', name: 'Deutsch (German)' },
                { code: 'hi', name: 'हिन्दी (Hindi)' },
                { code: 'ru', name: 'Русский (Russian)' },
                { code: 'es', name: 'Español (Spanish)' },
                { code: 'vi', name: 'Tiếng Việt (Vietnamese)' }
            ];

            return languages.map(lang => `
                <button class="lang-option ${lang.code === this.currentLang ? 'active' : ''}" data-lang="${lang.code}">
                    ${lang.name}
                </button>
            `).join('');
        },

        attachEventListeners: function() {
            const self = this;

            // Language toggle
            const languageToggle = document.getElementById('language-toggle');
            const languageDropdown = document.getElementById('language-dropdown');

            if (languageToggle && languageDropdown) {
                languageToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    languageDropdown.classList.toggle('show');
                });

                // Language option click
                document.querySelectorAll('.lang-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const lang = this.getAttribute('data-lang');
                        self.changeLanguage(lang);
                        languageDropdown.classList.remove('show');
                    });
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                        languageDropdown.classList.remove('show');
                    }
                });
            }
        },

        changeLanguage: function(lang) {
            if (!translations[lang]) {
                console.error('Language not supported:', lang);
                return;
            }

            this.currentLang = lang;
            localStorage.setItem('openarms_language', lang);
            
            // Update current language display
            const currentLangDisplay = document.getElementById('current-language');
            
            if (currentLangDisplay) {
                currentLangDisplay.textContent = translations[lang].name;
            }

            // Apply translations
            this.applyTranslations();
        },

        applyTranslations: function() {
            const t = translations[this.currentLang] || translations[this.defaultLang];
            
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (t[key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = t[key];
                    } else {
                        element.innerHTML = t[key];
                    }
                }
            });

            // Update document lang attribute
            document.documentElement.lang = this.currentLang;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            LanguageManager.init();
        });
    } else {
        LanguageManager.init();
    }

    // Expose for external use
    window.LanguageManager = LanguageManager;

})();
