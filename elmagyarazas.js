class Users {
    userHolder;
    nameHolder;
    birthDateHolder;
    ageHolder;
    emailHolder;
    addressHolder;
    userImgHolder;

    constructor() {
        this.userHolder = document.querySelector("#users-holder");
        this.nameHolder = document.querySelector("#name");
        this.birthDateHolder = document.querySelector("#birth-date");
        this.ageHolder = document.querySelector("#age");
        this.emailHolder = document.querySelector("#email");
        this.addressHolder = document.querySelector("#address");
        this.userImgHolder = document.querySelector("#user-image");
    }


    async getUsers() {

        try {
            const response = await fetch("https://dummyjson.com/users");
            console.log('Response Status:', response.status); // Log the status code

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            // You can now iterate over the users and populate your holders as needed.

        } catch (err) {
            console.error('Fetch error:', err); // Use console.error for errors
        }
    }
}

export default Users;
/*
Ezt úgy is lehet csinálni, hogy amikor visszakapjuk a reponse-t 
1. ott megnézzük, hogy mi a response.status -> console.log(response.status);
2. és ha nem igaz a respnse.ok -> if(!response.ok)
    akkor dobunk egy error-t -> throw new Error(`HTTP error! Status: ${response.status}`);
    catch-ben ezt elkapjuk és a console.error-val pedig kiírjuk, hogy mi a hiba!!!! console.error('Fetch error, err');

*/
