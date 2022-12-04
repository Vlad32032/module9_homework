// нода для вставки результата запроса
const resultNode = document.querySelector(".result");
// нода для кнопки
const button = document.querySelector(".button");

// создаем обработчик для кнопки
button.addEventListener("click", () => {
    // сохраняем в переменные значения из input
    let userValue1 = document.querySelector("#num_input").value;
    let userValue2 = document.querySelector("#num_input2").value;

    // проверяем уловия ввода
    if ((userValue1 >= 100 && userValue1 <= 300) && (userValue2 >= 100 && userValue2 <= 300)) {
        fetch(`https://picsum.photos/${userValue1}/${userValue2}`)
            .then((response) => { 
                // выводим в консоль url картинки (не обязательно, просто захотелось)
                console.log("response", response.url)
                // сохраняем в переменную HTML код и добавляем url для картинки 
                let cards = `
                    <div class="card">
                    <img
                        src="${response.url}"
                        class="card_img"
                    >
                    </div>
                `;
                // добавляем наш код из переменной в cards HTML
                resultNode.innerHTML = cards; 
                })
            .catch(() => { console.log('error') });
        // скрываем запись про ошибку, если вдруг она до этого выводилась
        document.querySelector(".error").style.opacity = "0";
    } else {
        // выводим ошибку
        document.querySelector(".error").style.opacity = "1";
    }
});
