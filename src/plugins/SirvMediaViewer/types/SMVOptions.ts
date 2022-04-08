interface Spin {
    initialize?: string
    swapSides?: boolean
    wheel?: boolean
    freeDrag?: boolean

    thumbnail?: {
        type?: string
        gifParams?: string
    }

    zoom?: {
        enable?: boolean
        ratio?: number
        tiles?: boolean
        pan?: boolean
    }

    inactivity?: number
    autospin?: {
        enable?: boolean
        type?: string
        duration?: number
        resume?: number
    }
    hint?: {
        message?: {
            enable?: boolean
            text?: string
        }
        onStart?: {
            enable?: boolean
            effect?: string
        }
        onVisible?: {
            enable?: boolean
            effect?: string
        }
        onInactive?: {
            enable?: boolean
            effect?: string
        }
    }
    row?: {
        start?: number
        loop?: boolean
        increment?: number
        reverse?: boolean
        sensitivity?: number
    }
    column?: {
        start?: number
        loop?: boolean
        increment?: number
        reverse?: boolean
        sensitivity?: number
    }
}

interface Zoom {
    mode?: string
    margin?: number
    width?: string | number
    height?: string | number
    pan?: boolean
    ratio?: number
    wheel?: boolean
    tiles?: boolean
    trigger?: string
    hint?: {
        enable?: boolean
        text?: {
            hover?: string
            click?: string
            dblclick?: string
        }
    }
    map?: {
        enable?: boolean
        size?: number
    }
}

interface Video {
    autoplay?: boolean
    loop?: boolean
    volume?: number
    thumbnail?: boolean | string | number
    preload?: boolean

    quality?: {
        min?: number
        max?: number
    }

    controls?: {
        enable?: boolean
        volume?: boolean
        speed?: boolean
        quality?: boolean
    }
}

interface Viewer {
    orientation?: string
    arrows?: boolean
    loop?: boolean
    autostart?: string
    threshold?: number
    quality?: number
    hdQuality?: number
    itemsOrder?: string[]
    slide?: {
        first?: number
        delay?: number
        preload?: boolean
        autoplay?: boolean
        animation?: {
            type?: string
            duration?: number
        }
    }
    thumbnails?: {
        enable?: boolean
        size?: number | string
        position?: string
        type?: string
        always?: boolean
        target?: boolean | string
        watermark?: boolean | string
    }
    fullscreen?: {
        enable?: boolean
        always?: boolean
        native?: boolean
        thumbnails?: {
            enable?: boolean
            size?: number | string
            position?: string
            type?: string
            always?: boolean
            autohide?: boolean
            watermark?: boolean | string
        }
    }
    contextmenu?: {
        enable?: boolean
        text?: {
            zoom?: {
                in?: boolean | string
                out?: boolean | string
            }
            fullscreen?: {
                enter?: boolean | string
                exit?: boolean | string
            }
            download?: boolean | string
        }
    }
    spin?: Spin
    zoom?: Zoom
    video?: Video
}

interface LazyImage {
    resize?: boolean
    threshold?: number
    quality?: number
    hdQuality?: number
    autostart?: string
    fit?: string
}

interface SMVOptions {
    viewer?: Viewer
    lazyImage?: LazyImage
}

export { SMVOptions, Viewer, LazyImage, Spin, Zoom, Video }
export default SMVOptions
