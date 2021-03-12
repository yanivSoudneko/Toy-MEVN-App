function load(key) {
    var val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

function store(key, val) {
    val = JSON.stringify(val);
    localStorage.setItem(key, val);
}

export const storageService = {
    load,
    store,
};
