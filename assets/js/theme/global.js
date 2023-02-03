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
        // this.searchToggle();
    }

    searchToggle() {
        document.getElementById('quick-search-expand').addEventListener('click', (e) => {
            if (window.innerWidth < 801) {
                e.preventDefault();
                document.querySelector('a.mobileMenu-toggle').click();
                if (e.currentTarget.parentElement.classList.contains('hidden')) {
                    e.currentTarget.parentElement.classList.remove('hidden');
                } else {
                    e.currentTarget.parentElement.classList.add('hidden');
                }
            }
        });

        document.querySelector('a.mobileMenu-toggle').addEventListener('click', (e) => {
            const header = document.querySelector('header.header');
            if (!header.classList.contains('is-open')) {
                document.querySelector('li.navUser-item--search').classList.remove('hidden');
            }
        });
    }
}
