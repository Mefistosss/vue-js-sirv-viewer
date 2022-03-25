import { shallowMount } from '@vue/test-utils';
import SirvViewer from '@/components/SirvViewer.vue';

const propsFactory = (values = {}) => {
    return shallowMount(SirvViewer, {
        global: {
            stubs: {
                SirvComponent: {
                    template: '<div></div>',
                    shallow: true,
                }
            }
        },

        props: { ...values },
        methods: {
            start() {},
            stop() {}
        }
    });
};

const removeComents = (str) => {
    return str.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g, '');
};

const SRC1 = 'https://example.com/test.jpg';
const SRC2 = 'https://example.com/test.spin';
const SRC3 = 'https://example.com/test.view';

describe('SirvViewer.vue', () => {
    it('simple', () => {
        const slides = [ SRC1, SRC2 ];
        const wrapper = propsFactory({ slides, id: 'test-id' });
        const slide1 = (`<div src="${SRC1}" type="zoom"></div>`);
        const slide2 = (`<div src="${SRC2}" type="spin"></div>`);
        expect(removeComents(wrapper.html())).toBe(
            `<div class="Sirv" data-options="autostart:off" id="test-id">\n  ${slide1}\n  ${slide2}\n  \n</div>`
        );
    });

    it('options', () => {
        const slides = [ SRC1, SRC2 ];
        const options = {
            autostart: 'visible',
            fullscreen: {
                enable: false
            }
        };
        const wrapper = propsFactory({ slides, id: 'test-id', options });
        const slide1 = (`<div src="${SRC1}" type="zoom"></div>`);
        const slide2 = (`<div src="${SRC2}" type="spin"></div>`);
        expect(removeComents(wrapper.html())).toBe(
            `<div class="Sirv" data-options="autostart:visible;fullscreen.enable:false" id="test-id">\n  ${slide1}\n  ${slide2}\n  \n</div>`
        );
    });

    it('view file', () => {
        const slides = [ SRC1, SRC2 ];
        const wrapper = propsFactory({ slides, id: 'test-id', dataSrc: SRC3 });
        expect(removeComents(wrapper.html())).toBe(
            `<div class="Sirv" data-options="autostart:off" id="test-id" data-src="${SRC3}"></div>`
        );
    });

    it('background image', () => {
        const wrapper = propsFactory({ id: 'test-id', dataBgSrc: SRC1 });
        expect(removeComents(wrapper.html())).toBe(
            `<div class="Sirv" data-options="autostart:off" id="test-id" data-bg-src="${SRC1}"></div>`
        );
    });

    it('lazy image', () => {
        const wrapper = propsFactory({ id: 'test-id', dataSrc: SRC1 });
        expect(removeComents(wrapper.html())).toBe(
            `<img class="Sirv" id="test-id" data-src="${SRC1}" data-options="autostart:off">`
        );
    });
});
