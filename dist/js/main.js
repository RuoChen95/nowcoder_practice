// 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。
var obj = {a: 'Custom'};

// 声明一个变量，并将该变量作为全局对象 window 的属性。
var a = 'Global';

function f() {
  console.log(this.a);
  return this.a;  // this 的值取决于函数被调用的方式
}

f();          // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
// f.call(obj);  // 'Custom' 因为函数中的 this 被设置为obj
// f.apply(obj); // 'Custom' 因为函数中的 this 被设置为obj

// console.log(this.a);


// 封装函数 f，使 f 的 this 指向指定的对象

var k = f.bind(obj);
k();



let sUrl = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";
let sKey = "key";

let params = (new URL(sUrl)).searchParams;
let key = params.getAll(sKey);

console.log(key.join());

function getUrlParam(sUrl, sKey) {
  let params = (new URL(sUrl)).searchParams;
  let key = params.getAll(sKey);
  return key;

}

function abc () { var a = getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe', 'key'); return a.join('') === '1234'; }

console.log(abc());


let oNode1 = document.getElementById("1");
let oNode2 = document.getElementById("2");

function commonParentNode(oNode1, oNode2) {
  if (oNode1.contains(oNode2)) {
    return oNode1;
  } else {
    return commonParentNode(oNode1.parentNode, oNode2);
  }
}

console.log(commonParentNode(oNode1, oNode2));

let oNamespace = {
  a: {
    test: 1,
    b: 2,
  }
};

let sPackage = "a.b.c.d";

function namespace(oNamespace, sPackage) {
  let sP_a = sPackage.split(".");
  let nO = oNamespace;
  for (let i = 0; i < sP_a.length; i++) {
    if (!nO.hasOwnProperty(sP_a[i]) || typeof nO[sP_a[i]] !== "object") {
      nO[sP_a[i]] = {};
    }
    nO = nO[sP_a[i]];
  }

  return oNamespace;
}

console.log(namespace(oNamespace, sPackage));


// 数组去重
let arr = [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN];

Array.prototype.uniq = function () {
  let result = [];
  let flag = true;
  for (let i = 0; i < this.length; i++) {
    if (result.indexOf(this[i]) == -1) {
      if (this[i] != this[i]) {
        if (flag) {
          result.push(this[i]);
          flag = false;
        }
      } else {
        result.push(this[i]);
      }
    }
  }

  return result;
};

console.log(arr.uniq());


function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1)
  }
}

console.log(fibonacci(2));



function formatDate(date, formate) {

  let o = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear()%100,
    MM: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth(),
    M: date.getMonth() + 1,
    dd: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    d: date.getDate(),
    HH: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    H: date.getHours(),
    hh: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    h: date.getHours(),
    mm: date.getMinutes(),
    m: date.getMinutes(),
    ss: date.getSeconds(),
    s: date.getSeconds(),
    w: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
  };

  for (let i in o) {
    formate = formate.replace(i, o[i]);
  }

  return formate
}

console.log(formatDate(new Date(1409894060000), 'yy-M-d hh:m:s 星期w'));


function strLength(s, bUnicode255For1) {
  if (bUnicode255For1) return s.length;
  else {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 255) {
        result = result + 2;
      } else {
        result = result + 1
      }
    }

    return result;
  }
}

console.log(strLength('hello world, 牛客', false));



function isAvailableEmail(sEmail) {
  let reg = /^[\w\.]+\@\w+\.\w+/;

  return reg.test(sEmail);
}

console.log(isAvailableEmail('frontend.com@nowcoder.com'));



function rgb2hex(sRGB) {
  let reg = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;

  if (!reg.test(sRGB)) return sRGB;


  return sRGB.replace(reg, function($0, $1, $2, $3) {
    if ($1 > 255 || $2 > 255 || $3 > 255) {
      return sRGB
    }
    return "#" + to16($1) + to16($2) + to16($3)
  });

}

function to16(i) {
  let output = parseInt(i).toString(16);

  return output.length == 1 ? '0' + output : output
}

console.log(rgb2hex('rgb(0, 0, 0)'));


function cssStyle2DomStyle1(sName) {
  let sArr = sName.split('-');
  let result = "";
  for (let i = 0; i < sArr.length; i++) {
    let font = sArr[i];
    if (i == 0 || (i == 1 && sArr[0] == "")) result += font;
    else result += DomStyle(font);
  }
  return result;
}

function DomStyle(font) {
  let result = "";
  for (let i = 0; i < font.length; i++) {
    if (i == 0) result = font[i].toUpperCase();
    else result += font[i]
  }
  return result;
}

console.log(cssStyle2DomStyle1(
  '-webkit-border-image'));



function cssStyle2DomStyle(sName) {
  let reg = /-\w/g;

  return sName.replace(reg, function(match, index) {
    if (index == 0) {
      return match.replace('-', '');
    } else {
      return match.replace('-','').toUpperCase();
    }
  })
}

console.log(cssStyle2DomStyle(
  'webkit-border-image'));


function count(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] == undefined) obj[str[i]] = 1;
    else { obj[str[i]]++;}
  }
  return obj;
}

console.log(count('hello world'));

function indexOf(arr, item) {
  return arr.indexOf(item);
}

console.log(indexOf(
  [ 1, 2, 3, 4 ], 3));

function sum(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}


function remove(arr, item) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== item) {
      result.push(arr[i]);
    }
  }
  return result;
}

function removeWithoutCopy(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      arr.splice(i, 1);
      i--
    }
  }

  return arr;
}

console.log(removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2));


function append(arr, item) {
  let arr2 = [...arr];
  arr2.push(item);
  return arr2;
}

console.log(append([1,2,3,4], 10));


function truncate(arr) {
  let arr2 = [...arr];
  arr2.pop();
  return arr2;
}

function prepend(arr, item) {
  return arr2 = [item, ...arr]
}


function curtail(arr) {
  let arr2 = [...arr];
  arr2.splice(0, 1);
  return arr2;
}


function insert(arr, item, index) {
  let arr2 = [...arr];

  arr2.splice(index, 0, item);

  return arr2;
}

console.log(insert([1, 2, 3, 4], 'z', 2));

function count(arr, item) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    if(item === arr[i]) {
      num++;
    }
  }
  return num;
}

function duplicates(arr) {
  let arr1 = arr.filter(function(item, index, array){
    return array.indexOf(item) !== array.lastIndexOf(item)
  });
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (result.indexOf(arr1[i]) === -1) result.push(arr1[i]);
  }
  return result
}

console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]));

let myObject = {
  name: 'Alan'
};
function globals() {
  let myObject = {
    name : 'Jory'
  };

  return myObject;
}

console.log(globals());

function functions(flag) {
  if (flag) {
    getValue = function() { return 'a'; }
  } else {
    getValue = function() { return 'b'; }
  }

  return getValue();
}

console.log(functions(true));


function parse2Int(num) {
  return parseInt(num, 10);
}
console.log(parse2Int('12'), parse2Int('12px'), parse2Int('0x12'));


function count(start, end) {
  console.log(start);

  let timer = setInterval(function() {
    start++;
    if (start <= end) {
      console.log(start)
    } else {
      clearInterval(timer)
    }
  }, 100);

  return {
    cancel: function() {
      clearInterval(timer);
    }
  }
}

// count(1,3);

function speak(fn, obj) {
  return fn.bind(obj)();
}

function test() { return speak(function () {return this.greeting + ', ' + this.name + '!!!';}, {greeting: 'Hello', name: 'Rebecca'}) }

console.log(test());


function functionFunction(str) {
  let f = function(s){
    return str+", "+s;
  };
  return f;
}

console.log(
  functionFunction('Hello')('world')
);

function makeClosures(arr, fn) {
  let result = [];
  arr.forEach(function (n) {
    result.push(function() {
      return fn(n)
    })
  });

  return result;
}

console.log(makeClosures([1,2,3], function(x) {return x*x}));



function partial(fn, str1, str2) {

  let result = function(parameter) {
    return fn(str1, str2, parameter)
  };

  return result;
}

let sayIt = function(greeting, name, punctuation) {
  return greeting + ', ' + name + (punctuation || '!'); };

console.log(partial(sayIt, 'Hello', 'Ellie')('!!!'));

function useArguments() {
  let result = 0;
  for (let i in arguments) {
    result += arguments[i];
  }
  return result;
}

console.log(useArguments(1,2,3,4));


function callIt(fn) {
  let arr = [];
  for (let i in arguments) {
    if (i != 0) arr.push(arguments[i]);
  }

  return fn.apply(null, arr)
}

let fn = function(a, b, c) {
  return a+b+c
};

function partialUsingArguments(fn) {
  let [tmp, ...arr1] = arguments;

  return function() {
    return fn.call(null, ...arr1, ...arguments)
  }

}


let fn2 = function (a, b, c) {return a + b + c};

function curryIt(fn) {
  return function(a) {
    return function (b) {
      return function (c) {
        return fn.call(null, a, b, c)
      }
    }
  }
}

console.log(curryIt(fn2)(1)(2)(3));


var o = createModule('hello', 'matt');

function createModule(str1, str2) {
  return {
    greeting: str1,
    name: str2,
    sayIt: function() {
      return this.greeting + ', ' +this.name;
    }
  }
}

console.log( o.sayIt());

function valueAtBit(num, bit) {
  let s = num.toString(2);
  return s[s.length - bit]
}

console.log(valueAtBit(128, 8))

function base10(str) {
  return parseInt(str, 2)
}

function convertToBinary(num) {
  let s = num.toString(2);

  let k = "";
  if (s.length < 8) {
    for (let i = 0; i < 8 - s.length; i++) {
      k += "0";
    }
  }


  return k + s;
}

console.log(convertToBinary(65));

function multiply(a, b) {
  return b * (a / b) * a / ( a / b) + '  ' + a * b;
}

console.log(multiply(4, 0.0001));


var C = function(name) {this.name = name; return this;};
var obj1 = new C('Rebecca');
function alterObjects(constructor, greeting) {
  return constructor.prototype.greeting = greeting
}
alterObjects(C, 'What\'s up');
console.log('FED53:', obj1.greeting);


function iterate(obj) {
  let result = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      result.push(i + ": " + obj[i]);
    }
  }
  return result;
}

function containsNumber(str) {
  let reg = /\d/;

  return reg.test(str);
}

console.log(containsNumber('abc'));


function containsRepeatingLetter(str) {
  let reg = /\d/;
  for (let i = 0; i < str.length - 1; i++) {

    if (!reg.test(str[i]) && str[i] == str[i+1]) {
      return true;
    }
  }
  return false;
}

console.log(containsRepeatingLetter('l33t'));

function endsWithVowel(str) {
  let vowel = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];



  if (vowel.indexOf(str[str.length - 1]) != -1) {
    return true;
  } else {
    return false;
  }
}

function captureThreeNumbers(str) {
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) == (Number(str[i+1]) + 1) && Number(str[i+1]) == (Number(str[i+2]) + 1)) {
      return str[i] + str[i+1] + str[i+2]
    }
    if (Number(str[i]) == (Number(str[i+1]) - 1) && Number(str[i+1]) == (Number(str[i+2]) - 1)) {
      return str[i] + str[i+1] + str[i+2]
    }
  }

  return false;
}

console.log(captureThreeNumbers('98765432'));


function matchesPattern(str) {
  let reg = /^\d{3}-\d{3}-\d{4}$/;
  return reg.test(str);
}

console.log(matchesPattern('800-555-1212'));

function isUSD(str) {
  let reg = /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/;

  return reg.test(str)

}

console.log(isUSD(
  '$20,933,209.93'));


function add(items) {
  let tbody = document.getElementsByTagName('tbody')[0];

  for (let i = 0; i < items.length; i++) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${items[i].name}</td><td>${Number(items[i].price).toFixed(2)}</td><td><a href="javascript:void(0);">删除</a></td>
  `;
    tbody.appendChild(tr);
  }

  updateNumber()
}

function bind() {
  let delete_button = document.querySelectorAll("a");
  for (let child of delete_button) {
    child.addEventListener("click", function() {
      this.parentNode.parentNode.remove();
      updateNumber();
    })
  }
}

function updateNumber() {
  let price = 0;
  let number = 0;
  let tr2 = document.querySelector("tbody").children;

  for (let child of tr2) {
    price += Number(child.children[1].textContent);
    number ++;
  }

  price = Number(price).toFixed(2);

  document.querySelector("tfoot td").textContent = `${price}(${number}件商品)`;
}

add([{name: 1, price: 1.11}, {name: 2, price: 2.22}]);
bind();


function sort(type, order) {
  let obj = {
    "id": 0,
    "price": 1,
    "sales": 2,
  };

  let index = obj[type];
  let arr = [];


  for (let tr of document.querySelectorAll("tbody#jsList tr")) {
    arr.push(tr);
  }

  arr.sort(function(a,b) {
    if (order == 'asc') {
      return a.children[index].innerText - b.children[index].innerText;
    } else {
      return b.children[index].innerText - a.children[index].innerText;
    }
  });

  let jsList = document.querySelector("#jsList");
  arr.forEach( n => {
    jsList.appendChild(n)
  })
}

sort('sales', 'asc');


function link() {
  let jsContainer = document.querySelector("#jsContainer");

  let text = jsContainer.innerText;

  let reg = /((http(s)?\:\/\/)|(www\.))[\w\.\?\=\&#%]+/g;
  let reg2 = /^www\./;

  text = text.replace(reg, function(match, index) {
    if (reg2.test(match)) {
      return `<a href="http://${match}" target="_blank">${match}</a>`
    } else {
      return `<a href="${match}" target="_blank">${match}</a>`
    }
  });

  jsContainer.innerHTML = text;
}


function test() {     var content = ' www.testhaha.com ';     var div = document.getElementById('jsContainer');     div.innerHTML = content;     link();     var aLink = div.getElementsByTagName('a') || [];     var result = aLink.length === 1 && aLink[0].getAttribute('href') === 'http://www.testhaha.com' && aLink[0].getAttribute('target') === '_blank' && aLink[0].innerHTML === 'www.testhaha.com';     return result; }

console.log(test());


function second(second) {
  let obj = {
    day: 0,
    hour: 0,
    min: 0,
    second: 0,
  };

  while (second > 59) {
    second = second - 60;
    obj.min++;
    if (obj.min == 60) {
      obj.hour++;
      obj.min = 0;
    }
    if (obj.hour == 24) {
      obj.day++;
      obj.hour = 0;
    }
  }
  obj.second = second;

  return obj;
}

function render(data) {

  let jsCountdown = document.querySelector("#jsCountdown");

  if (data.hour < 10) {
    data.hour = '0' + data.hour
  }

  if (data.min < 10) {
    data.min = '0' + data.min
  }

  if (data.second < 10) {
    data.second = '0' + data.second
  }

  if (data.day < 10) {
    data.day = '0' + data.day
  }

  if (data.day == 0) {
    jsCountdown.innerHTML =`
      <span class="hide">${data.day}1天</span>
    `
  } else {
    jsCountdown.innerHTML =`
      <span>${data.day}天</span>
    `
  }

  jsCountdown.innerHTML +=`
    <span>${data.hour}:</span>
    <span>${data.min}:</span>
    <span>${data.second}</span>
  `
}


function jsCountdown() {     var data = second(59);   render(data);  console.log(data);var result = data.day === 0 && data.hour === 0 && data.min === 0 && data.second === 59;     return result;}

console.log(jsCountdown());

function randomFn() {
  // 33->6
  // 16->1
  let arr = [];
  let result = '';
  while (arr.length < 6) {
    let number = Math.floor(Math.random() * 33) + 1;
    if (arr.indexOf(number) == -1) {
      arr.push(number)
    }
  }
  arr.sort(function(a,b) {
    return Number(a) - Number(b);
  });

  let b = document.querySelectorAll('.red .balls-wp b');
  let new_b_list = [];
  for (let index in b) {
    if (arr.indexOf(Number(index) + 1) !== -1) {
      b[index].classList.add('active');

      new_b_list.push(b[index])
    }
  }

  for (let index in b) {
    if (arr.indexOf(Number(index) + 1) == -1) {
      new_b_list.push(b[index])
    }
  }


  new_b_list.forEach(function (n) {
    if (typeof n == "object") {
      document.querySelector('.red .balls-wp').appendChild(n)
    }
  });


  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 10) {
      arr[i] = '0' + arr[i];
    }
    if (i != 0) result += ',';
    result += arr[i];
  }

  let number = Math.floor(Math.random() * 16) + 1;
  let b2 = document.querySelectorAll('.blue .balls-wp b');
  let new_b2_list = [];
  for (let index in b2) {
    if (Number(index)+1 == number) {
      new_b2_list.push(b2[index]);
      b2[index].classList.add('active');
    }
  }

  for (let index in b2) {
    if (Number(index)+1 != number) {
      new_b2_list.push(b2[index])
    }
  }
  new_b2_list.forEach(function (n) {
    if (typeof n == "object") {
      document.querySelector('.blue .balls-wp').appendChild(n);
    }
  });

  if (number < 10) number = '0' + number;

  return result + '|' + number

}

console.log(randomFn());


function suggest(items) {
  document.querySelector('.js-suggest').classList.add('hide');


  items.forEach(n=> {
    let item = document.createElement('li');
    item.innerText = n;

    document.querySelector('.search .js-suggest ul').appendChild(item);
  });

  let inputDom = document.querySelector('input.js-input');

  inputDom.addEventListener('input', function() {
    let text = document.querySelector('input.js-input').value.trim().split('').join(".*?");
    let reg = new RegExp(text + '.*?');

    let li = document.querySelectorAll('.search .js-suggest ul li');

    let tag = 0;
    for (let child of li) {
      let child_text = child.innerText;

      if (reg.test(child_text)) {
        child.classList.remove('hide');
        document.querySelector('.js-suggest').classList.remove('hide');
      } else {
        child.classList.add('hide');
        tag++;
      }

    }
    if (tag == li.length || text == "") {
      document.querySelector('.js-suggest').classList.add('hide');
    }


  });


}


function output(str) {
  // 3. 每次输出制定字符串前，删除其它节点
  let sp = document.querySelectorAll('div.content span.word');
  for (let child of sp) child.remove();

  let arr = str.split('');
  let jsBink = document.querySelector('#jsBlink');
  let dom = []

  arr.forEach(n=> {
    if (n != '\n') {
      let span = document.createElement('span');
      n = n.toString();
      if (n == " ") {
        n = "&nbsp;"
      }
      if (n == "<") {
        n = "&lt;"
      }
      if (n == ">") {
        n = "&gt;"
      }
      span.innerText = n;

      span.classList.add('word');
      let number = Math.floor(Math.random()*24) + 1;

      span.classList.add('color' + number);
      dom.push(span);
    } else {
      let br = document.createElement('br');
      dom.push(br);
    }


  });

  let i = 0;
  let id = setInterval(function() {
    jsBink.before(dom[i]);
    i++;
    if (i == dom.length) {
      clearInterval(id)
    }
  }, 200);

}


output('12345<');
