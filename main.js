
import { Igrac } from "./igrac.js";
import {Mec} from "./mec.js"
import { Rezultat } from "./rezultat.js";

fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
    p.json().then(data => {
        for (let index = 0; index < 1; index++) {
            var mec1 = new Mec (data[index].lokacija, data[index].vremeOdrzavanja);
            var igrac1 = new Igrac (data[index].rezultat.igrac1.imePrezime,data[index].rezultat.igrac1.godine,data[index].rezultat.igrac1.rang);
            var igrac2 = new Igrac (data[index].rezultat.igrac2.imePrezime,data[index].rezultat.igrac2.godine,data[index].rezultat.igrac2.rang);
            var rez = new Rezultat (data[index].rezultat.brSet1,data[index].rezultat.brSet2,data[index].rezultat.brPoenaSeta1prvog,
                data[index].rezultat.brPoenaSeta1drugog, data[index].rezultat.brPoenaSeta2prvog, data[index].rezultat.brPoenaSeta2drugog);
            mec1.crtajMec(document.body,igrac1,igrac2,rez);
        }
    });
});



//const mec1 = new Mec("Wimbledon",`Mon Jun 22 2020 16:35:38`);
//mec1.crtajMec(document.body);

//const mec2 = new Mec(null,null,"rolamgaros");
//mec2.crtajMec(document.body);

//for (let index = 1; index < 3; index++) {
//const mec1 = new Mec (data[index].lokacija, data[index].vremeOdrzavanja);
 //   console.log(mec1.rezultat);