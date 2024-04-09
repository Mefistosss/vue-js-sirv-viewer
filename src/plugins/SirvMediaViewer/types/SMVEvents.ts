// interface SMVVideoEvents {
//     'video:ready'?: () => void
//     'video:play'?: () => void
//     'video:pause'?: () => void
//     'video:resume'?: () => void
//     'video:end'?: () => void
//     'video:seek'?: () => void
//     'video:fullscreenIn'?: () => void
//     'video:fullscreenOut'?: () => void
// }

// interface SMVZoomEvents {
//     'zoom:ready'?: () => void
//     'zoom:zoomIn'?: () => void
//     'zoom:zoomOut'?: () => void
// }

// interface SMVSpinEvents {
//     'spin:init'?: () => void
//     'spin:ready'?: () => void
//     'spin:zoomIn'?: () => void
//     'spin:zoomOut'?: () => void
//     'spin:rotate'?: () => void
// }

interface SMVEvents {
    'viewer:ready'?: () => void
    'viewer:fullscreenIn'?: () => void
    'viewer:fullscreenOut'?: () => void
    'viewer:beforeSlideIn'?: () => void
    'viewer:beforeSlideOut'?: () => void
    'viewer:afterSlideIn'?: () => void
    'viewer:afterSlideOut'?: () => void
    'viewer:enableItem'?: () => void
    'viewer:disableItem'?: () => void

    'spin:init'?: () => void
    'spin:ready'?: () => void
    'spin:zoomIn'?: () => void
    'spin:zoomOut'?: () => void
    'spin:rotate'?: () => void

    'zoom:ready'?: () => void
    'zoom:zoomIn'?: () => void
    'zoom:zoomOut'?: () => void

    'video:ready'?: () => void
    'video:play'?: () => void
    'video:pause'?: () => void
    'video:resume'?: () => void
    'video:end'?: () => void
    'video:seek'?: () => void
    'video:fullscreenIn'?: () => void
    'video:fullscreenOut'?: () => void

    'image:ready'?: () => void
}

export default SMVEvents;
