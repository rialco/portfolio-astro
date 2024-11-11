const getDeviceType = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
        return 'Mobile';
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}

const getCurrentSlideNum = () => {
    switch (getDeviceType()) {
        case 'Mobile':
            return 1;
        case 'Tablet':
            return 2;
        case 'Desktop':
            return 3;
    }
}

function debounce(func, delay = 300) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

export class Carousel {
    carousel = undefined;
    items = undefined;
    next = undefined;
    back = undefined;
    desktopSlidesNum = 3;
    tableSlidesNum = 2;
    mobileSlidesNum = 1;

    itemWidth = 0;
    currentSlidesNum = 0;
    touchStartX = 0;
    touchEndX = 0;
    carouselPos = 0;
    carouselTotalWidth = 0;


    constructor(carousel, items, next, back) {
        this.carousel = carousel;
        this.items = items;
        this.next = next;
        this.back = back;

        this.currentSlidesNum = getCurrentSlideNum();
        this.itemWidth = this.carousel.getBoundingClientRect().width / this.currentSlidesNum;

        this.next.addEventListener('click', () => {
            this.scrollNext();
        });

        this.back.addEventListener('click', () => {
            this.scrollPrev();
        });

        this.carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.checkDirection();
        });

        window.addEventListener('resize', () => {
            this.debouncedResize();
        })
    }

    setItemSize = () => {
        this.carouselTotalWidth = 0;
        this.itemWidth = this.carousel.getBoundingClientRect().width / this.currentSlidesNum;
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].style.width = `${this.itemWidth}px`;
            if (i < this.items.length - 1) this.carouselTotalWidth += this.itemWidth;
        }
    }

    scrollNext = () => {
        if (this.carouselPos === this.carouselTotalWidth / this.currentSlidesNum) return;
        this.next.disabled = true;
        this.back.disabled = true;

        this.scroll(1);

        setTimeout(() => {
            if (this.carouselPos < this.carouselTotalWidth / this.currentSlidesNum) this.next.disabled = false;
            this.back.disabled = false;
        }, 300);
    }

    scrollPrev = () => {
        if (this.carouselPos === 0) return;
        this.next.disabled = true;
        this.back.disabled = true;

        this.scroll(-1);

        setTimeout(() => {
            this.next.disabled = false;
            if (this.carouselPos < this.carouselTotalWidth && this.carouselPos > 0) this.back.disabled = false;
        }, 300);

    }

    checkDirection = () => {
        if (this.touchEndX < this.touchStartX) this.scrollNext();
        if (this.touchEndX > this.touchStartX) this.scrollPrev();
    }

    scroll = (dir) => {
        if (this.carousel && dir === 1) {
            this.carouselPos += this.itemWidth;
            this.carousel.scrollBy({ left: this.itemWidth, behavior: 'smooth' });
        }
        if (this.carousel && dir === -1) {
            this.carouselPos -= this.itemWidth;
            this.carousel.scrollBy({ left: -this.itemWidth, behavior: 'smooth' });
        }
    };

    debouncedResize = debounce(() => {
        this.carousel.scrollBy({ left: -40000, behavior: 'smooth' })
        this.carouselPos = 0;

        this.currentSlidesNum = getCurrentSlideNum();
        this.setItemSize();
    }, 200)
}
