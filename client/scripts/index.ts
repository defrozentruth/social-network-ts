"use strict";
$(document).ready(function () {
    $(document).on('submit', '#edit-user-form', async function (event) {
        const url = window.location.href;
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        const number = parseInt(lastPart, 10);
        event.preventDefault();
        event.preventDefault();
        let formData = $(this).serialize();
        await fetch(`/api/user/${number}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    location.href = '/user';
                }
                else {
                    alert('Произошла ошибка при обновлении данных пользователя.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при обновлении данных пользователя.');
            });
    });
});
//# sourceMappingURL=index.js.map