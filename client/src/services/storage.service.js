function load(key) {
    var val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

function store(key, val) {
    val = JSON.stringify(val);
    localStorage.setItem(key, val);
}

function remove(key) {
    localStorage.removeItem(key);
}

export const storageService = {
    load,
    store,
    remove,
};
