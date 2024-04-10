interface SMVSlider {
    isReady: () => boolean;
    items: (settings: any) => any;
    disableItem: (index: number | string) => boolean;
    enableItem: (index: number | string) => boolean;
    enableGroup: (group: string | [string]) => boolean;
    disableGroup: (group: string | [string]) => boolean;
    switchGroup: (group: string | [string]) => boolean;
    insertItem: (item: any, index: any) => boolean;
    removeItem: (index: number | string) => boolean;
    removeAllItems: () => boolean;
    jump: (index: number | string) => boolean;
    itemsCount: (settings: any) => number;
    next: () => boolean;
    prev: () => boolean;
    isFullscreen: () => boolean;
    fullscreen: () => boolean;
    child: (index: number | string) => any;
    play: () => boolean;
    pause: () => boolean;
    sortItems: (settings: any) => void
}

export default SMVSlider;
