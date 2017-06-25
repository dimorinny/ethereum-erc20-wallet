export default function () {
    return new Promise(function (resolve, _) {
        if (document.readyState === 'complete') return resolve();
        window.onload = resolve;
    });
}
