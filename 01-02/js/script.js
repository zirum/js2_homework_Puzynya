/* отличие использования кавычек от апострофов в аглийском языке
КАВЫЧКИ
- кавычки всегда парные, причем
- прямо перед открывающей кавычкой идет символ [\s^\A] а сразу после нее - [\S$\Z]
- для закрывающей - наоборот [\S^\A] кавычка [\s^\Z]
- без исключений если нет грамматических ошибок

АПОСТРОФЫ
- с обоих сторон от апострофа без пробелов должны стоять только буквы /\w+?'\w+?/ (найболее простой вариант)
-- найденные исключения: 
'em - исключение / 'em /
lookin' - окончание ing  / \w+?in' /
'm - исключение / 'm /
'cause - исключение / 'cause /
nothin' - окончание ing / \w+?in' /
doin' - окончание ing / \w+?in' /
evenin' - окончание ing / \w+?in' /
lickin' - окончание ing / \w+?in' /
makin' - окончание ing / \w+?in' /
o' - исключение / o' /
'Kid,' - можно заменить кавычками

Все фразы потом доработались по тексту

есть рассказ O Henry `The Guilty Party`
исходник в одноименном файле O Henry `The Guilty Party`.txt
намеренно испортим его, заменив все кавычки на апострофы автозаменой и попробуем восстановить, найдя кавычки по шаблону.
испорченный вариант в файле:
./js/spoiled.js
*/
////////


//для начала поставим все переводы строк для читаемости
spoiled=spoiled.replace(/\n/g, "<br>");
//у меня не получилось составлять рег. выражение сразу с исключениями для этого необходима сложная логика в частности логическое "и" поэтому исключения отрабатываю по одному
/*сначала пробовал пойти через суперсложное выражение для кавычек но через исключения идти все равно прийдется, поэтому проще трогать только писключения.
let regs = [/\w+?'\w+?/, / 'em /gm, / 'm /gm, / 'cause /gm, / o' /gm, /in' /gm, / \w+?in' /gm];
console.log(regs);*/
reg = /\w+?'\w+?|\.?'em\.? | 'm\.? | 'cause\. | o'\.? |\.in' /gm;
let matchNames = spoiled.match(reg);
console.log(matchNames);

let replace_string = "rEpLaCeStRiNg";
let replace_strings = new Array();
let index = 0;
for(matchName of matchNames){
	replace_strings[index] = replace_string + index;
	spoiled=spoiled.replace(matchName, replace_strings[index]);
	index++;	
}
spoiled=spoiled.replace(/'/gm, `"`);

index=0;
let genReplaceString;
for(let i=0; i<matchNames.length;i++){
	spoiled=spoiled.replace(replace_strings[i], matchNames[i]);
	console.log(replace_string+(index++) + "   " + matchNames[i]);
}


document.write(spoiled);



