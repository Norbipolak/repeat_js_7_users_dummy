/*
mindent importálunk (export default), minden függvényt és majd a index.html-be fogunk mindent importálni 
és majd az lesz megadva mindegyik html-nek, mert lesz egy főoldal az ez a html és lesz egy másik, amikor rákattintunk a képre,
akkor átvisz minket egy másikra 

lesz két függvény az elsőben lekérjük az összes user-t, majd id-alapján egyesével 
és ez az egész egy class-ban lesz, fontos, hogy a függvények azok async-ok legyenek 

nagyon fontos, hogyha több html-hez van megadva ugyanaz a .js, mint ebben az esetben, mert mindent egy js-be fogunk importálni 
ezért ott kell, hogy legyen egy type="module" 
->
<script type="module" src="index.js"></script>

ez a getUsers-nek a html-e 
    <div class="container">
        <div class="grid-4" id="users-holder"></div>
    </div>

mert itt majd a függvényben csináljuk meg a szerkezetet

ez lesz majd getUser(id)-nak a html-e 
    <div class="container">
        <a href="/">Index</a>
        <div class="grid-2">
            <div class="box">
                <img id="user-image">
            </div>
            <div class="box">
                <h3 id="name"></h3>
                <div class="grid-2">
                    <div class="data-box">
                        <h4>Birth Date</h4>
                        <div id="birth-date"></div>
                    </div>
                    <div class="data-box">
                        <h4>Age</h4>
                        <div id="age"></div>
                    </div>
                </div>
                <div class="grid-2">
                    <div class="data-box">
                        <h4>Email</h4>
                        <div id="email"></div>
                    </div>
                    <div class="data-box">
                        <h4>Address</h4>
                        <div id="address"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

Van egy container amiben minden benne van
majd van egy grid-2-es, hogy felosztja kettőre a képernyőt
egyik oldalon lesz csak egy img 
a másik oldalon meg lesz a többi dolog 
legfelül a name 
és alatta meg ott is felosztjuk a fél képernyőt egy grid-2-vel és ilyen fehér háttérszínű box-okban (data-box) lesz megjelenítve, hogy mi 
pl. h4-es Name és utána alatta meg az értéke amire csináltunk egy div-et, hogy alatta legyen és itt majd megadjuk az értékét a dummyjson-os
adatokból 
data-box meg a box 
-> 
.user, .box {
    background-color: #b0edb8;
    border: 1px solid #90c396;
    padding: 15px;  
    text-align: center;

.data-box {
    background-color: white;
    margin: 5px;
    border-radius: 4px;
    padding: 4px;
}

*/ 

class Users {
    usersHolder;
    nameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;

    constructor() {
        this.usersHolder = document.querySelector("#users-holder");
        this.nameHolder = document.querySelector("#name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("#age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector("#user-image");
    }

    /*
    fontos, hogy async, try-catch block és a response.ok-val leellenőrizni, hogy jó-e a response és akkor ott tudunk végigmenni a user-eken 
    és megadni amit kell 
    */ 

    async getUsers() {
        //fontos, hogyha itt csináljuk egy class-ban akkor nem kell kiírni, hogy function 
        //async getUsers() {} , nem mintha simán, mert akkor async function getUsers() {}

        try {
            const response = await fetch("https://dummyjson.com/users");
            const json = await response.json();
            console.log(json);

            if(response.ok) {
                for(const user of json.users) {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");

                    const nameH3 = document.createElement("h3");
                    nameH3.innerText = `${user.firstName} ${user.lastName} `;
                    //ha min két dolog van akkor `` kell és így megadni, hogy ${}!!! 

                    const userImgDiv = document.createElement("div");
                    userImgDiv.classList.add("user-img");
                    const userImg = document.createElement("img");
                    userImg.src = user.image;
                    userImgDiv.appendChild(userImg);
                    /*
                    Csinálunk egy div-et, amiben benne lesz az img, ennek megadtunk egy class-t, hogy width 100% legyen, meg a benne lévő img-nek 
                    .user-img {
                        width: 100%;
                    }
                    .user-img img {
                        width: 100%;
                        height: 250px;
                        object-fit: cover;
                    }
                    létrehoztunk egy img elemet és annak az src-jének megadtuk az user.image-t 
                    nagyon fontos, hogy a végén appendChild-oltuk 
                    */
                    const grid2Div = document.createElement("div");
                    grid2Div.classList.add("grid-2");
                    const openDiv = document.createElement("div");
                    openDiv.innerHMTL = `<a href=user.html?id=${user.id}>Megnyítás</a>`
                    /*
                    nagyon fontos, hogy ennek az elemnek adtuk meg, hogy átvigyen minket egy másik oldalra 
                    innerHTML-be megadtunk neki egy a tag-et és egy elérési útvonalat, attól függően, hogy melyik id-val rendelkező-re akarunk 
                    */
                    const deleteDiv = document.createElement("div");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Törlés";
                    deleteDiv.appendChild(deleteBtn);

                    grid2Div.appendChild(openDiv);
                    grid2Div.appendChild(deleteDiv);

                    userDiv.appendChild(nameH3);
                    userDiv.appendChild(userImgDiv);
                    userDiv.appendChild(grid2Div);

                    this.usersHolder.appendChild(userDiv);
                    /*
                    Úgy fog kinézni, hogy lesz egy neve felül, alatta lesz a kép az alatt meg lesz egy grid-2 
                    amiben lesz egy megnyítás link és egy törlés button
                    */
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    async getUser(id) {
        try{
            const response = await fetch("https://dummyjson.com/users/" + id);
            const json = await response.json();
            console.log(json);

            this.nameHolder.innerText = `${json.firstName} ${json.lastName}`;

            this.birthDateHolder.innerText = json.birthDate;
            this.ageHolder.innerText = json.age;
            this.emailHolder.innerText = json.email;
            this.addressHolder.innerText = `${json.address.city} ${json.address.address}`;
            this.userImgHolder.innerText = json.image;
        } catch(err) {
            console.log(err);
        }
    }
}

/*

*/

export default Users;
/*
ha meghívjuk és nem exportáljuk akkor kell a () -> new Users(), ha pedig exportáljuk akkor nem export default Users;
nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
importnál meg -> import Users from "./users.js"

van egy másik módja 
1. export már a class előtt odaírjuk, hogy export class Users()..
2. ennek az importja pedig import { Users } from "./users.js"
*/
