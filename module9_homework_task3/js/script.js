// Нода для вставки результата запроса
const resultNode = document.querySelector(".result");
// Нода для кнопки
const button = document.querySelector(".button");

// Функция -обертка над XMLHttpRequest 
// возвращает объект из url и вызывает callback-функцию 
function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log(`Статус ответа: ${xhr.status}`)
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log(`Ошибка! Статус ответа: ${xhr.status}`)
    };

    xhr.send();
};

// функция перебирает apiData, и выводит на экран новые карточки (добавляет html)
// apiData - результат запроса(объект) из успешного выполения функции useRequest
function displayResult(apiData) {
    let cards = "";

    apiData.forEach(element => {
        let cardBlok = `
            <div class="card">
                <img
                    src="${element.download_url}"
                    class="card_img"
                >
                <span>${element.author}</span>
            </div>
        `;
        cards = cards + cardBlok;
    });

    resultNode.innerHTML = cards;
};

// обработчки для кнопки
button.addEventListener("click", () => {
    let userValue = +document.querySelector(".input").value;
    // console.log(userValue)
    if (userValue >= 1 && userValue <= 10) {
        useRequest(`https://picsum.photos/v2/list/?limit=${userValue}`, displayResult);
        document.querySelector(".error").style.opacity = "0";
    } else {
        document.querySelector(".error").style.opacity = "1";
    }
});



