import { Rezultat } from "./rezultat.js";
import { Igrac } from "./igrac.js";

export class Mec {

    constructor(lokacija, vreme)
    {
        this.lokacija = lokacija;
        this.vremeOdrzavanja = vreme;
        this.container = null;
        this.rezultat = null;
        
    }

    crtajMec(host,igrac1,igrac2,rezultat){

        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        
        this.container = document.createElement("div");
        this.container.className = "kontejner";
        
        let labela = document.createElement("label");
        labela.innerHTML = `Lokacija: ${this.lokacija}`;
        labela.className = "lokacija";
        this.container.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = this.vremeOdrzavanja;
        labela.className = "lokacija2";
        this.container.appendChild(labela);
        
        host.appendChild(this.container);

        const kontForm = document.createElement("div");
        kontForm.className = "kontForm";
        this.container.appendChild(kontForm);

        igrac1.crtajIgraca(kontForm);
        rezultat.crtajRezultat(kontForm);
        igrac2.crtajIgraca(kontForm);

        let divMec = document.createElement("div");

        let divsel = document.createElement("div");
        labela = document.createElement("label");
        labela.innerHTML = "Ucitaj mec:";
        labela.className = "vecelabele"
        divsel.appendChild(labela);

        let selectel = document.createElement("select");
        selectel.className = "selmec";
        

        fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
             p.json().then(data => {
                  data.forEach(mec => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = mec.id;
                     opcija.innerHTML = `${mec.lokacija} ${mec.vremeOdrzavanja}`;
                     selectel.appendChild(opcija);
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });
        
        selectel.onchange = (ev) => {
            this.izabranMec(selectel);
        };
        
             
        
        divsel.appendChild(selectel);
        divMec.appendChild(divsel);
        
        let divKreiraj = document.createElement("div");
        divKreiraj.className = "divkreiraj";
        labela = document.createElement("label");
        labela.innerHTML = "Kreiraj mec:";
        labela.className = "vecelabele";
        divKreiraj.appendChild(labela);
        
        let malidiv = document.createElement("div");
        malidiv.className = "minidivlok";
        labela = document.createElement("label");
        labela.innerHTML = "Lokacija:"
        let mdiv = document.createElement("div");
        let inpolje = document.createElement("input");
        inpolje.className = "poljekreiraj";
        mdiv.appendChild(inpolje);
        
        malidiv.appendChild(labela);
        malidiv.appendChild(mdiv);
        divKreiraj.appendChild(malidiv);

        malidiv = document.createElement("div")
        labela = document.createElement("label");
        labela.innerHTML = "Vreme odrzavanja:"
        inpolje = document.createElement("input");
        inpolje.className = "poljekreiraj";
        malidiv.appendChild(labela);
        malidiv.appendChild(inpolje);
        divKreiraj.appendChild(malidiv);

        malidiv = document.createElement("div")
        labela = document.createElement("label");
        labela.innerHTML = "Izaberite prvog igraca:"
        malidiv.appendChild(labela);
        const odabir1 = document.createElement("select");
        const odabir2 = document.createElement("select");
        fetch("https://localhost:5001/TeniskiMec/VratiIgrace").then(p => {
             p.json().then(data => {
                  data.forEach(igrac => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = igrac.id;
                     opcija.innerHTML = igrac.imePrezime;
                     odabir1.appendChild(opcija);

                     opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = igrac.id;
                     opcija.innerHTML = igrac.imePrezime;
                     odabir2.appendChild(opcija);
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });
        /*odabir1.onchange = (ev) =>{
            this.izabranIgrac(odabir);
        }
        odabir2.onchange = (ev) =>{
            this.izabranIgrac(odabir);
        }
        */

        malidiv.appendChild(odabir1);
        divKreiraj.appendChild(malidiv);

        malidiv = document.createElement("div");
        labela = document.createElement("label");
        labela.innerHTML = "Izaberite drugog igraca:"
        malidiv.appendChild(labela);
        malidiv.appendChild(odabir2);
        divKreiraj.appendChild(malidiv);

        malidiv = document.createElement("div");
        let btn = document.createElement("button");
        btn.innerHTML = "Kreiraj";
        btn.onclick = (ev) => {
            this.kreirajaMec(btn);
           // let nekisel = this.container.querySelector(".selmec");
           // let sel = this.container.querySelector(".selobrisi");
            //this.azurirajOpcijeD(sel);
           // this.azurirajOpcijeR(nekisel);
        }
        malidiv.appendChild(btn);
        divKreiraj.appendChild(malidiv);

        divMec.appendChild(divKreiraj);
        this.container.appendChild(divMec);

        let divObrisi = document.createElement("div");
        labela = document.createElement("label");
        labela.innerHTML = "Obrisi mec:";
        labela.className = "vecelabele";
        divObrisi.appendChild(labela);

        let selectel2 = document.createElement("select");
        selectel2.className = "selobrisi";
        fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
             p.json().then(data => {
                  data.forEach(mec => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = mec.id;
                     opcija.innerHTML = `U ${mec.lokacija}-u izmedju ${mec.rezultat.igrac1.imePrezime}-a i ${mec.rezultat.igrac2.imePrezime}-a odrzanog ${mec.vremeOdrzavanja}`;
                     selectel2.appendChild(opcija);
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });
        
        divObrisi.appendChild(selectel2);

        btn = document.createElement("button");
        btn.innerHTML = "Obrisi mec"
        btn.onclick = (ev) => {
           // var nekisel = this.container.querySelector(".selmec");
            var sel = this.container.querySelector(".selobrisi");
            this.izbrisiMec(sel);
            //this.azurirajOpcijeD(sel);
            //this.azurirajOpcijeR(nekisel);

        }
        this.container.appendChild(divObrisi);
        this.container.appendChild(btn);

    }

    kreirajaMec(btn){
        var unosi = btn.parentNode.querySelectorAll(".poljekreiraj");
        var lok = unosi[0].value;
        var vremeO = unosi[1].value;
        var selecti = btn.parentNode.querySelectorAll("select");
        var sel1 = selecti[1];
        var sel2 = selecti[2];
        var idigr1 = sel1.options[sel1.selectedIndex].value;
        var idigr2 = sel2.options[sel2.selectedIndex].value;
        var greska = false;
        if(lok.match("^[A-Za-z]{1,30}") == null){
            unosi[0].style.border = "2px solid red";
            greska = true;
        }
        else
            unosi[0].style.border = null;

        if(vremeO == ""){
            unosi[1].style.border = "2px solid red";
            greska = true;
        }
        else
            unosi[1].style.border = null;

        if(idigr1 == null || idigr2 == null || idigr1===idigr2)
        {
            greska = true;
        }
        if(idigr1 == null || idigr2 == null || idigr1 == idigr2)
            greska = true;
        if (greska)
            alert("Los unos podataka ili odabiranja igraca"+ idigr1, idigr2 , lok);
        else
        {
            fetch("https://localhost:5001/TeniskiMec/KreirajMec/"+idigr1+"/"+idigr2+"/"+lok,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                vremeOdrzavanja: vremeO,
                brSet1:0,
                brSet2:0,
                brPoenaSeta1prvog:0,
                brPoenaSeta1drugog:0,
                brPoenaSeta2prvog:0,
                brPoenaSeta2drugog:0,
                trenutniSet:1,
                krajMeca:false,
                igrac1:idigr1,
                igrac2:idigr2
            })
            }).then(p => {
                if(p.ok)
                {
                    alert("Mec kreiran");
                }
                else 
                    alert("Greška!");
            
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });
            var rez = new Rezultat();
            rez.SetPomocniKraj(false);
        }
        
        
    }
    /*fetch("https://localhost:5001/TeniskiMec/KreirajMec/" + idigr1 + idigr2 + lokacija + vremeO).then(p => {
                if(p.ok)
                {
                    alert("Mec kreiran");
                }
                else 
                    alert("Greška!");
            
            });
    */
    izabranMec(sel)
         {
            let id = sel.options[sel.selectedIndex].value;
            var inime = this.container.querySelectorAll(".imeprez");
            var ingod =this.container.querySelectorAll(".god");
            var inrang =this.container.querySelectorAll(".atp");
            fetch("https://localhost:5001/TeniskiMec/VratiMec/"+ id).then(p => {
                p.json().then(data => {
                    let labela = this.container.querySelector(".lokacija");
                    labela.innerHTML = data.lokacija;
                    labela = this.container.querySelector(".lokacija2");
                    labela.innerHTML = data.vremeOdrzavanja;
                    let igraci = this.container.querySelectorAll(".igrac");
                    let m = this.container.querySelectorAll(".malidiv");
                    let domEl = m[1];
                    let labelePoena = domEl.querySelectorAll("label");
                    let malidivRezultata = domEl.parentNode.childNodes;
                    let labeleRezultata = malidivRezultata[0].querySelectorAll("label");

                    if(data.rezultat !== null)
                    {
                        let podaci = igraci[0].querySelectorAll(".podaci");
                        let slika = igraci[0].querySelector(".picture");
                        podaci[0].innerHTML = data.rezultat.igrac1.imePrezime;
                        podaci[1].innerHTML = data.rezultat.igrac1.godine;
                        podaci[2].innerHTML = data.rezultat.igrac1.rang;
                        slika.src = `slike/${data.rezultat.igrac1.imePrezime}.jpg`;
                        inime[0].placeholder = data.rezultat.igrac1.imePrezime;
                        ingod[0].placeholder = data.rezultat.igrac1.godine;
                        inrang[0].placeholder = data.rezultat.igrac1.rang;
                        
                        podaci = igraci[1].querySelectorAll(".podaci");
                        slika = igraci[1].querySelector(".picture");
                        podaci[0].innerHTML = data.rezultat.igrac2.imePrezime;
                        podaci[1].innerHTML = data.rezultat.igrac2.godine;
                        podaci[2].innerHTML = data.rezultat.igrac2.rang;
                        slika.src = `slike/${data.rezultat.igrac2.imePrezime}.jpg`;
                        inime[1].placeholder = data.rezultat.igrac2.imePrezime;
                        ingod[1].placeholder = data.rezultat.igrac2.godine;
                        inrang[1].placeholder = data.rezultat.igrac2.rang;
                        
                        var rez = new Rezultat(data.rezultat.brSet1,data.rezultat.brSet2,data.rezultat.brPoenaSeta1prvog,data.rezultat.brPoenaSeta1drugog,data.rezultat.brPoenaSeta2prvog,data.rezultat.brPoenaSeta2drugog);
                    
                        if(data.rezultat.krajMeca){
                            labelePoena[1].innerHTML = `---`;
                            labeleRezultata[1].innerHTML = `${rez.brSet1} - ${rez.brSet2}`;
                            labeleRezultata[2].innerHTML = `(${rez.brPoenaSeta1prvog} - ${rez.brPoenaSeta1drugog}) , (${rez.brPoenaSeta2prvog} - ${rez.brPoenaSeta2drugog})`;
                        }
                        else {
                            if(data.rezultat.trenutniSet == 1){
                            labelePoena[1].innerHTML = `${rez.brPoenaSeta1prvog} - ${rez.brPoenaSeta1drugog}`;
                            labeleRezultata[1].innerHTML = `${rez.brSet1} - ${rez.brSet2}`;
                            labeleRezultata[2].innerHTML = `(${rez.brPoenaSeta1prvog} - ${rez.brPoenaSeta1drugog})`;
                        }
                        else {
                            labelePoena[1].innerHTML = `${rez.brPoenaSeta2prvog} - ${rez.brPoenaSeta2drugog}`;
                            labeleRezultata[1].innerHTML = `${rez.brSet1} - ${rez.brSet2}`;
                            labeleRezultata[2].innerHTML = `(${rez.brPoenaSeta1prvog} - ${rez.brPoenaSeta1drugog}) , (${rez.brPoenaSeta2prvog} - ${rez.brPoenaSeta2drugog})`;
                            }
                        }
                        rez.SetPomocniKraj(true);
                        
                    }
                    else
                    {

                    }
                    
             });
         });
        }


    izbrisiMec(sel)
    {
        let id = sel.options[sel.selectedIndex].value;
        var nekisel = this.container.querySelector(".selmec");
        fetch("https://localhost:5001/TeniskiMec/IzbrisiMec/"+id,{
            method: 'DELETE'
        }).then(p => {
                if(p.ok)
                {
                    var opcijeR = nekisel.childNodes;
                    var opcijeD = sel.childNodes;
                    for (let index = 0; index < opcijeR.length; index++) {
                        if(sel.options.value == id){
                            nekisel.removeChild(element);
                        }   
                    }
                    for (let index = 0; index < opcijeD.length; index++) {
                        if(sel.options.value == id){
                            sel.removeChild(element);
                        }   
                    }
                    alert("Mec obrisan");
                }
            });
            // console.log(nekisel);
            // console.log(sel);
        
        
    }

   /* azurirajOpcijeD(neb)
    {
        var opcije = neb.children;
        for (let index = 0; index < opcije.length; index++) {
            
            
        }
    }
*/
    /*
    fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
             p.json().then(data => {
                  data.forEach(mec => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = mec.id;
                     opcija.innerHTML = `U ${mec.lokacija}-u izmedju ${mec.rezultat.igrac1.imePrezime}-a i ${mec.rezultat.igrac2.imePrezime}-a odrzanog ${mec.vremeOdrzavanja}`;
                     neb.appendChild(opcija);
                    
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });

    /*
     izbrisiMec(sel)
    {
        let id = sel.options[sel.selectedIndex].value;
        var nekisel = this.container.querySelector(".selmec");
        fetch("https://localhost:5001/TeniskiMec/IzbrisiMec/"+id,{
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
        })
            .then(res => res.json())
            .then(() => {
                var opcije = nekisel.children;
                opcije.forEach(element => {
                if(element.value == id)
                    nekisel.removeChild(element);
                    sel.removeChild(element);
                })
            })
        
    }

    azurirajOpcijeR(neb)
    {
        fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
             p.json().then(data => {
                  data.forEach(mec => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = mec.id;
                     opcija.innerHTML = `${mec.lokacija} ${mec.vremeOdrzavanja}`;
                     neb.appendChild(opcija);
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });
    }
*/
  /*  izabranIgrac(sel)
    {
        let id = sel.options[sel.selectedIndex].value;
        fetch("https://localhost:5001/TeniskiMec/VratiIgraca/" + id).then(p => {
            p.json().then(data => {
                var podaci = this.container.querySelectorAll(".podaci");
                var slika = this.container.querySelector(".picture");
                podaci[0].innerHTML = data.imePrezime;
                podaci[1].innerHTML = data.godine;
                podaci[2].innerHTML = data.rang;
                this.ime = data.imePrezime;
                this.godine = data.godine;
                this.rang = data.rang;
                slika.src = `slike/${this.ime}.jpg`;
                
                
            });
        });
        
    }
    */

    /*crtajFormu(host)
    {
        if(host == null)
            throw new Exception ("Roditelj ne postoji");
        
        //let bigDiv = createElement("div");
        //bigDiv.className = "bigDiv";
        
       
        
        fetch("https://localhost:5001/TeniskiMec/VratiMeceve").then(p => {
            p.json().then(data => {
                for (let index = 0; index < data.lenght; index++) {
                    if(this.lokacija == data[index].lokacija && this.vreme == data[index].vremeOdrzavanja){
                        console.log(data[index].Rezultat);
                        fetch("https://localhost:5001/TeniskiMec/VratiRezultate").then(p => {
                            p.json().then(data => {
                                data[index].igrac1.crtajIgraca(kontForm);
                                data[index].crtajRezultat(kontForm);
                                data[index].igrac2.crtajRezultat(kontForm);
                            });
                        });
                    }
                }
                
            });
        });

        //var igrac1 = new Igrac ("Novak Djokovic", 33, 1);
        //igrac1.crtajIgraca(kontForm);

        
        //var rezultat = new Rezultat (1,1,6,4,5,6);
        //rezultat.crtajRezultat(kontForm);
        
        //var igrac2 = new Igrac ("Roger Federer", 38, 3);
        //igrac2.crtajIgraca(kontForm);

        //console.log(this.container);
        //console.log(kontForm);

        


    }
*/
    
    

   

}