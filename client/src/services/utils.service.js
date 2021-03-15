export const utilService = {
    historyModeFix,
};

function historyModeFix() {
    const url = window.location.pathname.split('/');
    return url.slice(-1)[0];
}
