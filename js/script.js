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

function Menu(my_id, my_class, my_items) {
	Container.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;	
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
	let result = '<ul class="' + this.className + '" id="' + this.id + '">';

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
	this.className = "menu-item";
	this.href = my_href;
	this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
	return '<li class=' + this.className + ' id= ' + this.id + '>' + this.name + '</li>';
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
			result += this.items[item].render();
		};
		if(this.items[item] instanceof Array){
			result += "<ul>";//this.items[item].render();
			for(let a_item in this.items[item]) {
				result += this.items[item][a_item].render();
			}
			result += "</ul>";
		};
	};

	result += '</ul>'
	return result;
};
//////////////////конец добавлено задание №2


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

// а над дополнительным заданием возможно подумаю завтра)