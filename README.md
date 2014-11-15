# Dashboard для BEM-хакатона

- [Разработка](#%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0)
    - [Установка зависимостей](#%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9)
    - [Структура проекта](#%D0%A1%D0%B1%D0%BE%D1%80%D0%BA%D0%B0)
    - [Сборка](#%D0%9A%D0%BE%D0%BD%D1%82%D1%80%D0%B8%D0%B1%D1%8C%D1%8E%D1%82%D0%B8%D0%BD%D0%B3)
    - [Контрибьютинг](#%D0%9A%D0%BE%D0%BD%D1%82%D1%80%D0%B8%D0%B1%D1%8C%D1%8E%D1%82%D0%B8%D0%BD%D0%B3)
- [Написание виджетов](#%D0%9D%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%BE%D0%B2)
    - [Конкретный виджет](#%D0%9A%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D1%8B%D0%B9-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82)
        - [Как виджет попадает на dashboard](#%D0%9A%D0%B0%D0%BA-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82-%D0%BF%D0%BE%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82-%D0%BD%D0%B0-dashboard)
        - [Заготовка виджета](#%D0%97%D0%B0%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B0)
            - [Стили и шаблоны](#%D0%A1%D1%82%D0%B8%D0%BB%D0%B8-%D0%B8-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B)
            - [Изображение виджета](#%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B0)
            - [Зависимости](#%D0%97%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8)
            - [JS реализация](#js-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)
            - [API конфигуратора](#api-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0)
            - [Общение с сервером](#%D0%9E%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%BC)
    - [Базовый виджет](#%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9-%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82)
- [Ссылки на документацию](#%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8E)

## Разработка

### Установка зависимостей

Клонировать `git` репозиторий:
```sh
git clone git@github.com:spbd/dashboard.git dashboard && cd $_
```
Установить `npm` и `bower` зависимости:
```sh
npm i && bower i
```

### Сборка

Проект собирается с помощью **enb**-сборщика.

Собрать проект:
```sh
./node_modules/.bin/enb make
```
Так как у нас всего одна нода, ее можно не указывать (`enb make dashboard`).

От однократной сборки проекта пользы мало. Для комфортной разработки необходимо
запустить сервер:
```sh
./node_modules/.bin/enb server
```
Страница будет доступна по адресу - [localhost:8080](http://localhost:8080/build/dashboard/dashboard.html).
При обновлении страницы сборщик будет выполнять сборку автоматически.

### Контрибьютинг

Рекомендации по именованию веток:

- `widgets/base/<block-name>`
- `widgets/specific/<block-name>`
- `core/<block-name>`
- `core/ui/<block-name>`

Для веток c правками добавляется префикс **fix, refactor, etc** (`fix/core/server`).

Перед тем как сделать **push** ветки, необходимо убедиться, что код соответствует
заданному  **CodeStyle**:
```sh
npm run lint
```

Перед созданием **PR**, следует сделать **rebase** по ветке **master**:
```sh
git rebase master
```

После создания **PR**, запустится процесс сборки и выкладки проекта, результаты которого
будут доступны по адресу `http://spbd.github.io/builds/pr-<PRno>/src`.
Имеет смысл добавить в описание **PR** эту ссылку.

При **push** в ветку **master**, так же запускается процесс сборки и выкладки. Последний **build**
доступен по адресу - http://spbd.github.io/builds/stable.

## Написание виджетов

Макеты к виджетам доступны по адресу: https://github.com/spbd/specs

### Конкретный виджет

#### Как виджет попадает на dashboard

Конкретные виджеты находятся в директории `./widgets.specific`. Для добавления виджета на
**dashboard**, никаких манипуляций проводить не нужно. В процессе сборки произойдет все необходимое.
А именно:

 - Технология `widgets-list` прочитает список директорий (одна директория = один виджет)
 из `./widgets.specific`, и создаст **CommonJS**-модуль, экспортирующий список виджетов и
 **preview** для них:
```js
module.exports = [
    {
        "widget": "simple",
        "image": "simple.preview.png"
    }
];
```

 - Технология `widgets-decl` расширит файл декларации и допишет имена виджетов, чтобы они попали
 в зависимости.
 - Технология `widgets-manifest` создаст **CSS** файл (он приклеится к основному **CSS**), который
 описывает **preview** виджетов:

```css
.widget-name__manifest_preview
{
   background-image: url(path-to-widget/widget-name.preview.png);
   /* ... */
}

```
Эти классы автоматически проставятся к нужным виджетам.

 - Технология `widgets-ym` создаст **ym**-модуль, содержащий список виджетов, чтобы они были доступны
 из клиентского кода:

```
modules.define('widgets-list', function(provide) {
    provide(["widget1", "widget2"]);
});
```

#### Заготовка виджета

##### Стили и шаблоны

Стили можно писать как на **CSS** так и на **Stylus**. В роли шаблонизатора выступает **BH**.

##### Изображение виджета

Виджет обязательно должен включать файл изображения в технологии `preview` - `.preview.{svg,png,jpg,etc}`.
Например: `./widgets.specific/name/name.preview.svg`.

##### Зависимости

Базовым блоком для виджета всегда должен служить блок `widget`, либо блок, который наследует от него.
`name.deps.js`:
```js
({
    shouldDeps: [
        {block: 'widget'}
    ]
});
```

##### JS реализация

Конкретный виджет обязательно должен быть инициализирован (метод `init()`).

```js
modules.define(
    'simple',
    ['i-bem__dom', 'jquery', 'widget'],
    function(provide, BEMDOM, $, Widget) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {

                // Если базовым классом является не `widget`,
                // нужно вызвать родительский конструктор
                //
                // this.__base.apply(this, arguments);

                this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        // Конфигурация виджета
                        // Конфигурация окна настроек
                    })
                    .onSaveSettings(function(controls) {
                        // Сработает, когда будет нажата кнопка
                        // "save" в окне настроеек.
                        //
                        // controls - значение всех элементов окна настроек
                    })
                    .onShowSettings(function() {
                        // Сработает, когда будет нажата кнопка "SET".
                    })
                    .onLoadWidget(function(controls) {
                        // Сработает, когда виджет будет загружен из хранилища
                        // "save" в окне настроеек.
                        //
                        // controls - значение всех элементов окна настроек
                    })
                    .init(); // Инициализировать базовый виджет
            }
        }
    }

}));

});

```

##### API конфигуратора
```js
//...
.configure(function(widget, settings) {
    widget.setProps({
        width: 200,  // ширина виджета по умолчанию
        height: 260  // высота виджета по умолчанию
    });

    settings.setProps({
        width: 200, // ширина окна настроеек
        height: 260 // высота окна настроеек
    })
    .input({    // cоздать input
        placeholder: 'hint', // подсказка
        label: 'Text area',  // метка (опциональное поле)
        handler: this.handle // обработчик состояние change
    })
    .checkbox({ // cоздать checkbox
        text: 'Simple checkbox', // текст перед элементов
        handler: this.handle     // обработчик события change
    })
    .select({   // создать select
        options: [ // элементы
            {val: '1', text: 'text1'},
            {val: '2', text: 'text2', checked: true},
            {val: '3', text: 'text3'}
        ],
        handler: this.handle, // обработчик состояния change
        label: 'Foo select'   // метка (опциональное поле)
    });
    .radioGroup({   // создать radio-group
        options: [ // элементы
            {val: '1', text: 'text1'},
            {val: '2', text: 'text2', checked: true},
            {val: '3', text: 'text3'}
        ],
        handler: this.handle, // обработчик состояния change
        label: 'This is super radio-group'   // метка (опциональное поле)
    });

    // Во все обработчики приходит параметр,
    // содержащий новое состояние элемента
})
//...
```

##### Общение с сервером

Общение с сервером происходит посредством модуля **server**, который общается с реальным сервером через **WebSocket**. Достаточно добавить модуль в зависиомсти и подисаться на события для конкретного виджета.
```js
server.on('widgets/name/event', function(e, data) {
    console.log(data);
});
```
**В данный момент сервер не реализован**. В модуле [server](server) описаны фикстурные данные для разработки.

### Базовый виджет

Базовый виджет отличается от конкретного лишь тем, что в нем не выполняется инициализация
(метод конфигуратора `.init()`). Распологаются такие виджеты в директории `./widgets.base`.

### Ссылки на документацию
- [bem.info](bem.info)
- [enb](https://github.com/enb-make/enb/blob/master/README.md)
- [i-bem.js](http://ru.bem.info/technology/i-bem/2.3.0/i-bem-js/)
- [bh](http://ru.bem.info/technology/bh/)
- [ym](http://ru.bem.info/tools/bem/modules/)
