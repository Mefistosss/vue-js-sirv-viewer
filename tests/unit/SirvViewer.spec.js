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


    // <div class="Sirv"
    //     v-if="!isImage(dataSrc)"
    //     :data-options="stringOptions"
    //     :id="id"
    //     :data-src="dataSrc"
    //     :data-bg-src="dataBgSrc"
    //     :style="$attrs.style"
    // >
    //     <sirv-component
    //         v-for="slide in parsedComponents"
    //         :key="slide.src"
    //         :src="slide.src"
    //         :type="slide.type"
    //         :componentOptions="slide.dataOptions"
    //         :id="slide.id"
    //         :thumbnailImage="slide.dataThumbnailImage"
    //         :thumbnailHtml="slide.dataThumbnailHtml"
    //         :slideDisabled="slide.dataDisabled"
    //         :swipeDisabled="slide.dataSwipeDisabled"
    //         :hiddenSelector="slide.dataHiddenSelector"
    //         :pinned="slide.dataPinned"
    //         :staticImage="slide.staticImage"
    //     />
    //     <slot v-if="parsedComponents.length == 0"></slot>
    // </div>



    // it('spin', () => {
    //     const type = 'spin';
    //     const src = SRC2;
    //     const wrapper = propsFactory({ type, src, });
    //     expect(removeComents(wrapper.html())).toBe(`<div data-src="${src}"></div>`);
    // });
    // it('image', () => {
    //     const type = 'image';
    //     const src = SRC1;
    //     const wrapper = propsFactory({ type, src, });
    //     expect(removeComents(wrapper.html())).toBe(`<img data-src="${src}">`);
    // });
    // it('zoom', () => {
    //     const type = 'zoom';
    //     const src = SRC1;
    //     const wrapper = propsFactory({ type, src, });
    //     expect(removeComents(wrapper.html())).toBe(`<div data-type="${type}" data-src="${src}"></div>`);
    // });
    // it('html', () => {
    //     const type = 'html';
    //     const src = '<div>Hello world</div>';
    //     const wrapper = propsFactory({ type, src, });
    //     expect(removeComents(wrapper.html())).toBe(`<div>\n  ${src}\n</div>`);
    // });
    // it('Other props', () => {
    //     const type = 'spin';
    //     const src = SRC2;
    //     const id = 'testId';
    //     const thumbnailImage = SRC1;
    //     const slideDisabled = true;
    //     const thumbnailHtml = '<div>Selector</div>';
    //     const swipeDisabled = true;
    //     const hiddenSelector = true;

    //     const wrapper = propsFactory({ type, src, id, thumbnailImage, slideDisabled, thumbnailHtml, swipeDisabled, hiddenSelector });
    //     expect(removeComents(wrapper.html())).toBe(`<div data-src="${src}" id="${id}" data-thumbnail-image="${thumbnailImage}" data-thumbnail-html="${thumbnailHtml}" data-disabled="${slideDisabled}" data-swipe-disabled="${swipeDisabled}" data-hidden-selector="${hiddenSelector}"></div>`);
    // });
});
