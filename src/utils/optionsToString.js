const optionsToString = (opt, subStr) => {
    if (typeof opt === 'object' && opt !== null) {
        let arr = [];
        Object.entries(opt).forEach((values) => {
            const str = subStr ? subStr + '.' + values[0] : values[0];
            arr.push(optionsToString(values[1], str));
        });
        return arr.join(';');
    } else {
        return subStr + ':' + opt;
    }
};

export default optionsToString;
