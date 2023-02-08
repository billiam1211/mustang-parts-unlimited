import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import { css } from 'jquery';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
        this.search();
        this.stickyHeaderManager();
        this.department();
    }

    stickyHeaderManager() {
        const header = document.querySelector('header.header');
        window.addEventListener('scroll', () => {
            if (header.offsetHeight < window.pageYOffset) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    search() {
        const quickSearch = document.getElementById('quickSearch');
        const navToggle = document.querySelector('a.mobileMenu-toggle');
        const header = document.querySelector('header.header');
        const quickSearchToggle = document.getElementById('quick-search-expand');

        quickSearchToggle.addEventListener('click', (e) => {
            if (quickSearch.classList.contains('is-open')) {
                e.currentTarget.classList.add('is-open');
                if (navToggle.classList.contains('is-open')) {
                    navToggle.click();
                    e.currentTarget.click();
                }
            } else {
                e.currentTarget.classList.remove('is-open');
            }
        });

        navToggle.addEventListener('click', (e) => {
            if (header.classList.contains('is-open')) {
                if (quickSearch.classList.contains('is-open')) {
                    quickSearchToggle.click();
                }
            }
        });
    }

    department() {
        console.log('department', );
        if (document.querySelectorAll('li.subcategoryCard').length) {
            console.log('1', );
            // custom equal heights function for blog articles
            const equalHeights = (selector) => {
                const elms = document.querySelectorAll(selector);
                const len = elms.length;
                let tallest = 0;
                // eslint-disable-next-line one-var
                let elm,
                    elmHeight,
                    x;
        
                for (x = 0; x < len; x++) {
                    elms[x].style.height = 'auto';
                }
        
                for (x = 0; x < len; x++) {
                    elm = elms[x];
                    elmHeight = elm.offsetHeight;
                    tallest = (elmHeight > tallest) ? elmHeight : tallest;
                }
        
                for (x = 0; x < len; x++) {
                    // eslint-disable-next-line prefer-template
                    elms[x].style.height = tallest + 'px';
                }
            };
            const debounce = (callback, wait) => {
                let timeout;
                return (...args) => {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => callback.apply(context, args), wait);
                };
            };
            const debounceResize = debounce(() => {
                equalHeights('li.subcategoryCard');
            }, 250);
            window.addEventListener('resize', debounceResize);
            window.dispatchEvent(new Event('resize'));
        }
    }
}
