import { AMOUNT_INDEX, number, bigNumber } from './index';
import {AMOUNT_TEST} from './test';
import uuid from 'uuid-v4';


//z jakiegoś powodu bigNumber nie chce przekazać zmiennej, w aktualnym logu daje "undefined"
//gdy próbuję zrobić bigNumber() określa mi to że to nie jest funkcja (co ma sens).
//zrobiłem test z przekazywaniem wartości na dwóch plikach

//wychodzi na to że ten wcześniejszy import w index.js w czymś przeszkadza,
//ale nie potrafię dojść dlaczego tak się dzieje.


let num = number();
let bigNum = bigNumber;
// let bigNum2 = bigNumber();
console.log(`Zmienna Amount z index.js: ${AMOUNT_INDEX}.`);
console.log(`Zmienna Amount z test.js: ${AMOUNT_TEST}.`);
console.log(`Return z funckji number z index.js: ${num}.`);
console.log(`Funckja bigNumber z index.js bez () : ${bigNum}.`);
// console.log(`Funckja bigNumber z index.js z () : ${bigNum2}.`);
// console.log(number());

export class SellItem {
    constructor(name, img, brewed, tagline, attenuation, percent) {
           this.name = name;
           this.img = img;
           this.brewed = brewed;
           this.tagline = tagline;
           this.attenuation = attenuation;
           this.percent = percent;
           this.id = uuid();
         }
       };

export default class TableItem {
    createTableItem(item, table) {
        const row = document.createElement("tr");
        row.setAttribute("id", item.id);
        row.innerHTML = `
        <th scope="row" style="height: 100px;"><img src="${item.img}" alt="Beer photo" height="100"/></th>
        <td>${item.name}</td>
        <td>${item.brewed}</td>
        <td>${item.tagline}</td>
        <td>${item.attenuation}</td>
        <td>${item.percent} %</td>`;
        table.insertBefore(row, table.firstChild);
    }
};
// console.log(amount);
// let url = "https://api.punkapi.com/v2/beers?page=1&per_page="+amount;
// console.log(url);
fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=${num}`).then(res => res.json()).then(
    res => {
        const tableItem = new TableItem();
        res.map(item => {
            const table = document.getElementById("table");
            let beer = new SellItem(item.name, item.image_url, item.first_brewed, item.tagline, item.attenuation_level, item.abv);
            tableItem.createTableItem(beer, table);
        });
    }
);

document.getElementById('form-sell').addEventListener("submit", (e) => {
    console.log(e);
    const form = document.getElementById("form-sell").elements;
    const tableItem = new TableItem();

    if (form[0].value == "" || form[1].value == "" || form[2].value == "" || form[3].value == "" || form[4].value == "") {
      let error = document.getElementById("error");
        if (form[0].value == "") {
          error.innerText = "Error - fill beer name field !";
        } else if (form[1].value == "") {
          error.innerText = "Error - fill image url field !";
        } else if (form[2].value == "") {
          error.innerText = "Error - fill brewed in field !";
        } else if (form[3].value == "") {
          error.innerText = "Error - fill tagline field !";
        } else if (form[4].value == "") {
          error.innerText = "Error - fill attenuation field !";
        } else if (form[5].value == "") {
          error.innerText = "Error - fill percent field !";
        }
        e.preventDefault();
    } else {
      let error = document.getElementById("error");
      error.innerText = "";
      const item = new SellItem(form[0].value, form[1].value, form[2].value, form[3].value, form[4].value, form[5].value);
      const table = document.getElementById("table2");
      tableItem.createTableItem(item, table);
      clearInputs(form);
      e.preventDefault();
    }
});

const clearInputs = (form) => {
    form[0].value = "";
    form[1].value = "";
    form[2].value = "";
    form[3].value = "";
    form[4].value = "";
    form[5].value = "4";
    slider();
};

const slider = () => {
    let slider = document.getElementById("percent");
    let output = document.getElementById("percentValue");
    output.innerHTML = `${slider.value} %`;
    slider.oninput = function () {
        output.innerHTML = `${this.value} %`;
    }
}

slider();
