import SMVSlider from './SMVSlider';

interface SMV {
    getInstance: (query?: string) => SMVSlider;
    start: (query?: string) => void;
    stop: (query?: string) => void;
    on: (eventName: string, fn: (event: object) => void) => () => void;
    off: (eventName: string, fn: (event: object) => void) => void;
}

export default SMV;
