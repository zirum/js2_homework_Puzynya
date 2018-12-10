function Container() {
	this.id = "";
	this.className = "";
	this.htmlCode = "";
};

Container.prototype.render = function() {
	return this.htmlCode;
};
/////////начало добавлено задание №1
Container.prototype.remove = function() {
	console.log("удаляю контейнер у которого id = " + this.id);
	document.getElementById(this.id).remove();
};
/////////конец добавлено задание №1

function Menu(my_id, my_class, my_items, my_name) {
	Container.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;	
	this.name = my_name;	
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
	let result = '<ul class="' + "dropdown" + '" id="' + this.id + '">';

	for(let item in this.items) {
		if(this.items[item] instanceof MenuItem){
			result += this.items[item].render();
		};
	};

	result += '</ul>'
	return result;
};

function MenuItem(my_href, my_name, my_id) {//правка добавил в параметры my_id
	Container.call(this);
	this.id = my_id;//правка
	this.className = "dropdown";
	this.href = my_href;
	this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
	return '<li class=' 
	+ this.className 
	+ ' id= ' 
	+ this.id 
	+ '><a href = ' 
	+ this.href 
	+ ' >' + this.name 
	+ '</a></li>';
	//return '<li class=' + this.className + ' id= ' + this.id + '>' + this.name + '</li>';
};


//////////////////начало добавлено задание №2
function SubMenu(my_id, my_class, my_items) {
	Menu.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;	
};

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;
SubMenu.prototype.render = function() {
	let result = '<ul class="' + this.className + '" id="' + this.id + '">';//добавлено id

	for(let item in this.items) {
		if(this.items[item] instanceof MenuItem){
			//console.log("MenuItem");
			result += this.items[item].render();
		};
		if(this.items[item] instanceof Array){
			result += "<ul>";//this.items[item].render();
			for(let a_item in this.items[item]) {
				result += this.items[item][a_item].render();
			}
			result += "</ul>";
			//console.log("Array");
		};
		if(this.items[item] instanceof Menu){
			result += "<li class = " + this.items[item].className + "> " + this.items[item].name;//this.items[item].render();
			
			result += this.items[item].render();
			
			result += "</li>";
			//console.log("Menu");
		};
	};

	result += '</ul>'
	return result;
};
//////////////////конец добавлено задание №2

/*
let m_item1 = new MenuItem("/", "Главная", "item_1");///везде для MenuItem добавлено id последним аргументом
let m_item2 = new MenuItem("/catalogue", "Каталог", "item_2");
let m_item3 = new MenuItem("/gallery", "Галерея", "item_3");
let m_items = {0: m_item1, 1: m_item2, 2: m_item3};

//начало добавлено задание 2
let m_item4 = new MenuItem("/", "Главная", "item_4");
let m_item5 = new MenuItem("/catalogue", "Каталог", "item_5");
let m_item6 = new MenuItem("/gallery", "Галерея", "item_6");
let m_item7 = new MenuItem("/gallery", "А меня удаляем", "item_7");
let sub_m_items = {0: m_item1, 1: [m_item5, m_item6, m_item7]};
//конец добавлено задание 2

let menu = new Menu("my_menu", "menu_class", m_items);
let subMenu = new SubMenu("my_sub_menu", "subMenu_class", sub_m_items);//добавлено - 2
document.write(menu.render());
document.write(subMenu.render());//добавлено - 2

m_item7.remove();//добавлено - 1
*/


function fillMenuContents(xhr) {
	
	//if(xhr.readyState < 4)return;
	
	let m_items1 = {};
	let m_items2 = {};
	let m_items3 = {};

	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			let items = JSON.parse(xhr.responseText);

			//for (let currentitem of items.menu_items) {
			let currentitem;
			for (let i=0; i<3; i++) {
				currentitem = items.menu_items[i];
				m_items1[i] = new MenuItem(currentitem.href, currentitem.title, currentitem.id);
			}
			for (let i=3; i<6; i++) {
				currentitem = items.menu_items[i];
				m_items2[i] = new MenuItem(currentitem.href, currentitem.title, currentitem.id);
			}
			for (let i=6; i<9; i++) {
				currentitem = items.menu_items[i];
				m_items3[i] = new MenuItem(currentitem.href, currentitem.title, currentitem.id);
			}
			let menu1 = new Menu("my_menu1", "root", m_items1, "Меню");		
			let menu2 = new Menu("my_menu2", "root", m_items2, "Телевизоры");	
			let menu3 = new Menu("my_menu3", "root", m_items3, "Телефоны");	
			
			let sub_menu = new SubMenu("my_sub_menu", "sub_menu_class", {0: menu1, 1: menu2, 3:menu3});
			
			//console.log(sub_menu);
			//console.log(menu2);
			//console.log(menu3); 
			
			document.write(sub_menu.render());
			//document.write(menu2.render());
			//document.write(menu3.render());

		}
	} else {
		alert("Ошибка выполнения запроса! readyState = " + xhr.readyState + "; status = " + xhr.status);
		//пока сработает выдает ошибку 3 раза с xhr.readyState = 1, 2, 3
		//хотелось бы коментарии на эту тему (строка 110 - выход?)
	}
};

let xhr;

if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	if (window.overrideMimeType) {
		xhr.overrideMimeType('application/json');
	}
} else if (window.ActiveXObject) {
	xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

if (!xhr) {
	console.log("Невозможно создать запрос!");
}

xhr.onreadystatechange = function() { fillMenuContents(xhr); };
xhr.ontimeout = function() { console.log("Превышено время ожидания запроса!"); };
xhr.open('GET', 'menu.json', true);
xhr.send(null);