declare interface Sirv {
    getInstance: (query?: string) => any
    start: (query?: string) => any
    stop: (query?: string) => any
}

export default Sirv;
