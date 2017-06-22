const OK_CODE = 200;

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('fortune-cookie');
    if (wrapper) {
        wrapper.style.opacity = 0;
    }

    fetch('/api/fortune').then((response) => {
        if (response.status !== OK_CODE) {
            return Promise.reject(new Error(response.statusText));
        }

        return response.json();
    }).
    then((message) => {
        if (!message || typeof message !== 'object' || !message.fortune) {
            return;
        }

        const placeholder = document.getElementById('fortune-cookie-content');
        if (placeholder) {
            placeholder.innerHTML = message.fortune;
        }

        if (wrapper) {
            wrapper.style.opacity = 1;
        }
    }).
    catch(() => {
        // Fail silently
        // console.error(error);
    });
}, false);
