import { shallowMount } from '@vue/test-utils';
import SirvViewer from '../../src/plugins/SirvMediaViewer/components/SirvMediaViewer.vue';

const propsFactory = (values: object = {}) => {
    return shallowMount(SirvViewer, {
        global: {
            stubs: {
                SirvComponent: {
                    template: '<div></div>',
                    shallow: true,
                }
            }
        },

        props: { ...values }
    });
};

const removeComents = (str: string): string => {
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
});
