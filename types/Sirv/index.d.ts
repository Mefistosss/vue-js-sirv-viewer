import SMVSlider from '../SMVSlider';

declare const off: () => void;
declare const event: any;

declare interface Sirv {
    getInstance: (query?: string) => SMVSlider;
    start: (query?: string) => void;
    stop: (query?: string) => void;
    on: (eventName: string, fn: (event: event) => void) => off;
    off: (eventName: string, fn: (event: event) => void) => void;
}

export default Sirv;
