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
        this.featuredCategories();
        this.threeColumn();
        this.featuredCardsCarousel();
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


        let headerHeight = header.offsetHeight;
        let headerRegionHeight = document.querySelector('div[data-content-region=header_top--global]').offsetHeight;
        let calculatedHeight = headerHeight - headerRegionHeight;
        if (window.innerWidth > 1023) {
            document.querySelector('#main-content').style.marginTop = `0px`;
        } else {
            document.querySelector('#main-content').style.marginTop = `${calculatedHeight}px`;
        }
        window.addEventListener('resize', () => {
            console.log('==> ', window.innerWidth);
            headerHeight = document.querySelector('header.header').offsetHeight;
            headerRegionHeight = document.querySelector('div[data-content-region=header_top--global]').offsetHeight;
            calculatedHeight = headerHeight - headerRegionHeight;
            if (window.innerWidth > 1023) {
                document.querySelector('#main-content').style.marginTop = `0px`;
            } else {
                document.querySelector('#main-content').style.marginTop = `${calculatedHeight}px`;
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

    equalHeights(selector) {
        // custom equal heights function for blog articles
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
            elms[x].style.height = tallest + 'px';
        }

        const debounce = (callback, wait) => {
            let timeout;
            return (...args) => {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(context, args), wait);
            };
        };

        const debounceResize = debounce(() => {
            this.equalHeights(selector);
        }, 250);

        window.addEventListener('resize', debounceResize);

        window.dispatchEvent(new Event('resize'));
    }


    department() {
        if (document.querySelectorAll('li.subcategoryCard').length) {
            this.equalHeights('li.subcategoryCard');
        }
    }

    featuredCategories() {
        if (document.querySelectorAll('li.featuredCategory-item').length) {
            this.equalHeights('li.featuredCategory-item');
            $('ul.featuredCategory-list').slick({
                "dots": false,
                "infinite": true,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "mobileFirst": true,
                "responsive": [
                    {
                        "breakpoint": 1261,
                        "settings": {
                            "slidesToShow": 5,
                            "slidesToScroll": 5,
                        }
                    },
                    {
                        "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 4,
                            "slidesToScroll": 4,
                        }
                    },
                    {
                        "breakpoint": 801,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 3,
                        }
                    },
                    {
                        "breakpoint": 551,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 2
                        }
                    },
                    {
                        "breakpoint": 300,
                        "settings": {
                            "slidesToShow": 1,
                            "slidesToScroll": 1
                        }
                    }
                ]
            });
            document.querySelector('h2.featuredCategory-title').classList.add('loaded');
        }
    }

    threeColumn() {
        const threeColumn = document.querySelector('div.threeColumn');
        if (threeColumn !== null) {
            const items = document.querySelectorAll('li.threeColumn-item');
            items.forEach((item, index) => {
                item.addEventListener('mouseover', (e) => {
                    items.forEach((item, index) => {
                        if (item.classList.contains('is-active')) {
                            item.classList.remove('is-active');
                        }
                    });
                    item.classList.add('is-active');
                });
            });
        }
    }

    featuredCardsCarousel() {
        const featuredCardsArr = $('.featuredCards');
        if (featuredCardsArr.length) {
            featuredCardsArr.each((index, el) => {
                if ($(el).hasClass('carousel')) {
                    $(el).find('ul').slick({
                        dots: false,
                        infinite: true,
                        autoplay: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        responsive: [
                            {
                                breakpoint: 1261,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            },
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 801,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 551,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }
            });
        
        
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
                equalHeights('.featuredCards-item img');
            }, 250);
            window.addEventListener('resize', debounceResize);
            window.dispatchEvent(new Event('resize'));
        }
    }
}