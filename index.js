import Users from "./users.js";
import urlObj from "./url.js";

/*
és akkor itt történik minden 
1. példányosítjuk a user-t 

egy switch-el megadjuk, hogy melyik oldalon vagyunk 
/ főoldal 
/user.html a másik

Ha az első oldalon vagyunk akkor az első metódusát hívjuk meg a users class-ból, mert ugye azt csináltuk a főoldalra 
Ha meg a másodikon vagyunk, akkor meg a másodikat és fontos, hogy ott még vár egy id-t a getUser függvény 
amit meg kell neki adni, de a urlObj amit csináltunk query-jében lesz egy olyan, hogy id és azt megadjuk neki 
*/

const users = new Users();

switch(urlObj.path) {
    case "/":
        users.getUsers(); //html-be ugye ezt megadtuk -> <a href="/">Index</a>, hogy a második oldalról majd vissza tudjunk menni az elsőre 
        break;
    case "/user.html":
        const id = urlObj.query.id;
        users.getUser(id);
        break;
}

/*
Meg nagyon fontos, hogy a users.js-en class-t csak megcsináltuk és nem ott példányosítottuk, ott csak exportáltuk és itt példányosítottuk 
*/