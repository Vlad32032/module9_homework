/* Задание 1.

Вам дана заготовка и результат, который вы должны получить.
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

XML:

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>

JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
} */

// Создаем экземпляр класса DOMParse, который будет парсить XML
const parser = new DOMParser();

// XML в виде строки
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Переменная для обращения к тегу <student>
const studentNode = xmlDOM.querySelectorAll("student");

// Создаем массив "list"
const list = [];

// Создаем объекты для каждого тега <student> и добавляем их в массив "list"
studentNode.forEach(node => {
  list.push({
    name: `${node.querySelector("first").textContent} ${node.querySelector("second").textContent}`, 
    age: Number(`${node.querySelector("age").textContent}`),
    prof: `${node.querySelector("prof").textContent}`,
    lang: `${node.querySelector("name").getAttribute("lang")}`
  })
});

// Создаем объект "result" и добвляем массив "list"
const result = {
  list: list
}

// Проверяем резульат парсинга XML
console.log(result)