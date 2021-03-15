export const utilService = {
    historyModeFix,
};

function historyModeFix(num) {
    var url = window.location.pathname;
    if (num) {
        const queryParams = [];
        url = window.location.pathname.split('/');

        for (let i = 0; i < num; i++) {
            const lastItem = url.pop();
            queryParams.push(lastItem);
        }
        return queryParams;
    }
    url = window.location.pathname.split('/');
    return url.pop();
}
