# 日期格式

- order: 1

使用 `format` 属性，可以自定义你需要的日期显示格式，如 `yyyy/MM/dd`。

---

````jsx
var Calendar = require('uxcore-calendar');

ReactDOM.render(
  <Calendar value="2015/01/01" format="yyyy/MM/dd" />
, document.getElementById('components-calendar-demo-formatter'));
````
