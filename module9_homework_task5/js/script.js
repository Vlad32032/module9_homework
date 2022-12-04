// нода для вставки результата запроса
const resultNode = document.querySelector(".result");
// нода для кнопки
const button = document.querySelector(".button");
// переменная для проверки значения из localStorage
let myJSON = localStorage.getItem('myJSON');

// вызываем функию при загрузке страницы, которая проверяет localStorage и выводит блоки с картинками
onload(myJSON); 

// создаем обработчик для кнопки
button.addEventListener("click", () => {
    // сохраняем в переменные значения из input
    let userValue1 = document.querySelector("#num_input").value;
    let userValue2 = document.querySelector("#num_input2").value;

    // проверяем уловия ввода
    if ((userValue1 >= 1 && userValue1 <= 10) && (userValue2 >= 1 && userValue2 <= 10)) {
        fetch(`https://picsum.photos/v2/list?page=${userValue1}&limit=${userValue2}`)
            .then((response) => {return response.json();})
            .then((data) => {
                // сохраняем в localStorage полученный JSON в виде строки
                localStorage.setItem('myJSON', JSON.stringify(data));
                // вызываем функцию displayResult, которая добавляет код в HTML
                displayResult(data);
            })
            .catch(() => {
                // выводим в консоль сообщение
                console.log('error')
            });
        // скрываем запись про ошибку, если вдруг она до этого выводилась
        document.querySelector(".error").style.opacity = "0";
    //проверяем правильность первого значения
    }  else if ((userValue1 < 1 || userValue1 > 10) && (userValue2 >= 1 || userValue2 <= 10)) {
        // добавляем ошибку и меням текст ошибки 
        document.querySelector(".error").style.opacity = "1";
        document.querySelector(".error").innerHTML = "Номер страницы вне диапазона от 1 до 10";
    //проверяем правильность второго значения
    } else if ((userValue1 >= 1 || userValue1 <= 10) && (userValue2 < 1 || userValue2 > 10)) {
        // добавляем ошибку и меням текст ошибки 
        document.querySelector(".error").style.opacity = "1";
        document.querySelector(".error").innerHTML = "Лимит вне диапазона от 1 до 10";
    } else {
        // добавляем ошибку и меням текст ошибки 
        document.querySelector(".error").style.opacity = "1";
        document.querySelector(".error").innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    }
});

// объявляем функцию, которая проверяет localStorage и создает HTML код
function onload (myJSON) {
    if (myJSON !== null) {
        // преобразуем строку JSON в объект и передаем ее аргументом функции
        displayResult(JSON.parse(myJSON));
    }
}

// объявляем функцию которая создает карточки с картинками для HTML
function displayResult(apiData) {
    // переменная для HTML кода
    let cards = "";
    // с помощью метода .forEach проходим по каждому элементу массива, получем Url картинок, добовляем их в HTML код и плюсуем в переменную cards
    apiData.forEach(element => {
        let cardBlok = `
            <div class="card">
                <img
                    src="${element.download_url}"
                    class="card_img"
                >
            </div>
        `;
        cards = cards + cardBlok;
    });
    // добавляем сформированный HTML код в содержимое тега с class="result"
    resultNode.innerHTML = cards;
};