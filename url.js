/*
?id=55&userName=sanyi99

Van egy location nevezetű dolog, ami megmondja nekünk, hogy hol vagyunk 

Location {ancestorOrigins: DOMStringList, href: 'http://127.0.0.1:5500/', origin: 'http://127.0.0.1:5500', protocol: 'http:', host: '127.0.0.1:5500', …}
ancestorOrigins: DOMStringList {length: 0}
assign: ƒ assign()
hash: ""
host: "127.0.0.1:5500"
hostname: "127.0.0.1"
href: "http://127.0.0.1:5500/"
origin: "http://127.0.0.1:5500"
pathname: "/"
port: "5500"
protocol: "http:"
reload: ƒ reload()
replace: ƒ replace()
search: ""
toString: ƒ toString()
valueOf: ƒ valueOf()
Symbol(Symbol.toPrimitive): undefined
[[Prototype]]: Location

és akkor így épül fel egy domain 
amit itt az urlObj-ben összerakunk 

de elöször is ez a dolog query, ami a location.search
?id=55&userName=sanyi99
az úgy épül fel, hogy 
1. mindig egy ? jel-vel kezdődik 
2. értékpárok között mindig van egy = jel
3. ha több ilyen értékpár van, azokat meg & különítjük el

fontos!!!! 
? = &
?id=55&userName=sanyi99
ebből szeretnénl objektumba értékpárokat csinálni -> {id: 55, userName: "Sanyi"}

itt nagyon fontos dolog a decodeUriComponent, mert á,é,ű azt nem ismeri a böngésző és ad egy valami %C3%A9 meg a space is van egy ilyen pl.
példa 
URI: https://my test.asp?name=ståle&car=saab
Encoded URI: https://my%20test.asp?name=st%C3%A5le&car=saab

az a lényg, hogy itt nekünk az objektumba decoded verzió kell 
*/ 
//tehát ez a függvény ár egy queryString-et 

const parseQueryString = (queryString)=> {
    queryString = queryString.replace("?",""); //ezzel vettük le az első ?, ami mindig ott lesz 
    const keyValuePairs = queryString.split("&"); //szétválasztjuk őket, hogy key-value páronként legyenek
    const queryObj = {};
    
    for(const pair of keyValuePairs) {
        const keyValue = keyValuePairs.split("="); //szétválasztjuk a párokat az első megadjuk az objektum kulcsának, másodikat meg az értékének
        //fontos, hogy a split csinál egy tömböt, azért kell a valuePairs-en végigmenni, meg itt is keyValue 0 lesz a kulcs 1 az érték 
        queryObj[keyValue[0]] = decodeURIComponent(keyValue[1]);
    }

    return queryObj;
}

//végén meg return-öltünk a queryObj-et

//és ezt itt a query-ben már tudjuk is használni 

const urlObj = {
    host: location.hostname,
    port: location.port,
    path: location.path,
    protocol: location.protocol,
    query: parseQueryString(location.search),
    getBaseUrl() {
        return `${this.protocol}//${this.host}`
    }
}

export default urlObj;

/*
urlObj megadtuk ezeket, hogy port, host stb. query: már egy objektum lesz 
mert a location.search -> ?id=55&userName=sanyi99
és ebből csináltuk ezt -> {id: 55, userName: "Sanyi"}

getBaseUrl-ben meg visszaadtunk egy protocol meg a host-ot http://127.0.0.1:5500 ezt 

és ezt az egészet meg exportoltuk 
*/
