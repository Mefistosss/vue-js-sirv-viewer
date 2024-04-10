const isModel = (src = ''): boolean => {
    return /\.(glb|gltf)$/.test(src);
};

export default isModel;
