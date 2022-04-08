import { shallowMount } from '@vue/test-utils';
import SirvComponent from '../../src/plugins/SirvMediaViewer/components/SirvComponent.vue';

const propsFactory = (values: object = {}) => {
    return shallowMount(SirvComponent, {
        props: { ...values }
    });
};

const removeComents = (str: string): string => {
    return str.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g, '');
};

const SRC1 = 'https://example.com/test.jpg';
const SRC2 = 'https://example.com/test.spin';

describe('SirvComponent.vue', () => {
    it('zoom', () => {
        const type = 'zoom';
        const src = SRC1;
        const wrapper = propsFactory({ type, src, });
        expect(removeComents(wrapper.html())).toBe(`<div data-type="${type}" data-src="${src}"></div>`);
    });
    it('spin', () => {
        const type = 'spin';
        const src = SRC2;
        const wrapper = propsFactory({ type, src, });
        expect(removeComents(wrapper.html())).toBe(`<div data-src="${src}"></div>`);
    });
    it('image', () => {
        const type = 'image';
        const src = SRC1;
        const wrapper = propsFactory({ type, src, });
        expect(removeComents(wrapper.html())).toBe(`<img data-src="${src}">`);
    });
    it('zoom', () => {
        const type = 'zoom';
        const src = SRC1;
        const wrapper = propsFactory({ type, src, });
        expect(removeComents(wrapper.html())).toBe(`<div data-type="${type}" data-src="${src}"></div>`);
    });
    it('html', () => {
        const type = 'html';
        const src = '<div>Hello world</div>';
        const wrapper = propsFactory({ type, src, });
        expect(removeComents(wrapper.html())).toBe(`<div>\n  ${src}\n</div>`);
    });
    it('Other props', () => {
        const type = 'spin';
        const src = SRC2;
        const id = 'testId';
        const thumbnailImage = SRC1;
        const slideDisabled = true;
        const thumbnailHtml = '<div>Selector</div>';
        const swipeDisabled = true;
        const hiddenSelector = true;

        const wrapper = propsFactory({ type, src, id, thumbnailImage, slideDisabled, thumbnailHtml, swipeDisabled, hiddenSelector });
        expect(removeComents(wrapper.html())).toBe(`<div data-src="${src}" id="${id}" data-thumbnail-image="${thumbnailImage}" data-thumbnail-html="${thumbnailHtml}" data-disabled="${slideDisabled}" data-swipe-disabled="${swipeDisabled}" data-hidden-selector="${hiddenSelector}"></div>`);
    });
});
