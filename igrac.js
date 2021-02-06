export class Igrac
{
    constructor (ime, godine, rang)
    {
        this.ime = ime;
        this.godine = godine;
        this.rang = rang;
        this.miniContainer = null;
    }
    
    crtajIgraca(host)
    {
        if(host == null){
            throw new Exception ("Roditelj ne postoji");
        }

        this.miniContainer = document.createElement("div");
        this.miniContainer.className = "igrac";
        
        
        let pic = document.createElement("img");
        pic.src = `slike/${this.ime}.jpg`;
        pic.className = "picture";
        this.miniContainer.appendChild(pic);
        
        let divlab = document.createElement("div");
        let label = document.createElement("label");
        label.innerHTML = "Ime: ";
        divlab.appendChild(label);
        label = document.createElement("label");
        label.innerHTML = this.ime;
        label.className = "podaci";
        divlab.appendChild(label);
        this.miniContainer.appendChild(divlab);

        divlab = document.createElement("div");
        label = document.createElement("label");
        label.innerHTML = "Godine: ";
        divlab.appendChild(label);
        label = document.createElement("label");
        label.innerHTML = this.godine;
        label.className = "podaci";
        divlab.appendChild(label);
        this.miniContainer.appendChild(divlab);

        divlab = document.createElement("div");
        label = document.createElement("label");
        label.innerHTML = "ATP rang: ";
        divlab.appendChild(label);
        label = document.createElement("label");
        label.innerHTML = this.rang;
        label.className = "podaci";
        divlab.appendChild(label);
        this.miniContainer.appendChild(divlab);
        
        let divupdate = document.createElement("div");
        divupdate.className = "divupdate";
        

        divlab = document.createElement("div");
        divlab.className = "minidiv";
        label = document.createElement("label");
        label.innerHTML = "Ime i Prezime ";
        label.className = "labela1";
        divlab.appendChild(label);
        let el = document.createElement("input");
        el.type = "text";
        el.className = "imeprez";
        el.placeholder = this.ime;
        divlab.appendChild(el);
        divupdate.appendChild(divlab);
        
        divlab = document.createElement("div");
        divlab.className = "minidiv";
        label = document.createElement("label");
        label.innerHTML = "Godine ";
        divlab.appendChild(label);
        el = document.createElement("input");
        el.type = "number";
        el.className = "god";
        el.placeholder = this.godine;
        divlab.appendChild(el);
        divupdate.appendChild(divlab);

        divlab = document.createElement("div");
        divlab.className = "minidiv";
        label = document.createElement("label");
        label.innerHTML = "ATP rang ";
        divlab.appendChild(label);
        el = document.createElement("input");
        el.type = "number";
        el.className = "atp";
        el.placeholder = this.rang;
        divlab.appendChild(el);
        divupdate.appendChild(divlab);
        this.miniContainer.appendChild(divupdate);

        
        let divbtn = document.createElement("div");
        /*
        let btn = document.createElement("button");
        btn.innerHTML = "Kreiraj";
        divbtn.appendChild(btn);
        this.miniContainer.appendChild(divbtn);
        btn.onclick = (ev) => {
            this.kreirajIgraca(btn);
        }
        */
        let btn = document.createElement("button");
        btn.innerHTML = "Azuriraj";
        divbtn.appendChild(btn);
        btn.onclick = (ev) => {
            this.azurirajIgraca(btn);
        }
        this.miniContainer.appendChild(divbtn);

        /*
        
        let divselect = document.createElement("div");
        divselect.className = "divselect";
        label = document.createElement("label");
        label.innerHTML = "Izaberite igraca:";
        divselect.appendChild(label);
        const selel = document.createElement("select");
        fetch("https://localhost:5001/TeniskiMec/VratiIgrace").then(p => {
             p.json().then(data => {
                  data.forEach(igrac => {
                     var opcija = document.createElement("option");
                     opcija.className = "opcija"
                     opcija.value = igrac.id;
                     opcija.innerHTML = igrac.imePrezime;
                     selel.appendChild(opcija);
                     //selel.insertBefore(opcija, selel.lastChild);
               });
          });
        });
        selel.onchange = (ev) => {
            this.izabranIgrac(selel);
        };
        divselect.appendChild(selel);
        this.miniContainer.appendChild(divselect);
        */
        host.appendChild(this.miniContainer);

    }
    /*izabranIgrac(sel)
    {
        let id = sel.options[sel.selectedIndex].value;
        fetch("https://localhost:5001/TeniskiMec/VratiIgraca/" + id).then(p => {
            p.json().then(data => {
                var podaci = sel.parentNode.parentNode.querySelectorAll(".podaci");
                var slika = sel.parentNode.parentNode.querySelector(".picture");
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
    azurirajIgraca(domElement)
    {
        let greska = false;
        let nizLabela = domElement.parentNode.parentNode.querySelectorAll(".podaci");
        let privremenoIme = domElement.parentNode.parentNode.querySelector(".imeprez").value;
        let privremeneGodine = parseInt(domElement.parentNode.parentNode.querySelector(".god").value);
        let privremenRang = parseInt(domElement.parentNode.parentNode.querySelector(".atp").value);
        if(privremenoIme.match("^[A-Za-z]{1,30}") == null){
            domElement.parentNode.parentNode.querySelector(".imeprez").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".imeprez").style.border = null;
        if(isNaN(privremeneGodine) || privremeneGodine < 15 || privremeneGodine > 50) {
            domElement.parentNode.parentNode.querySelector(".god").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".god").style.border = null;
        if(isNaN(privremenRang) || privremenRang <1 || privremenRang > 3000) {
            domElement.parentNode.parentNode.querySelector(".atp").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".atp").style.border = null;
        if(greska)
            alert("Nevalidan unos podataka");
        else {
            var r = parseInt(nizLabela[2].innerHTML);
            
            fetch("https://localhost:5001/TeniskiMec/IzmeniIgraca/"+r,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    rang:privremenRang,
                    imePrezime:privremenoIme,
                    godine:privremeneGodine
                })
            }).then(p => {
                if(p.ok){
                    this.ime = privremenoIme;
                    this.godine = privremeneGodine;
                    this.rang = privremenRang;
                    nizLabela[0].innerHTML = this.ime;
                    nizLabela[1].innerHTML = this.godine;
                    nizLabela[2].innerHTML = this.rang;
                    alert("Igrac izmenjen");
                }
                else
                    alert("Greska");
            });
            
        }  
        //console.log(privremenoIme.match("^[A-Za-z]{1,30}"));
        //console.log(isNaN(privremeneGodine));
        //console.log(isNaN(privremenRang));
    }
 

    /*kreirajIgraca(domElement)
    {
        let greska = false;
        let privremenoIme = domElement.parentNode.parentNode.querySelector(".imeprez").value;
        let privremeneGodine = parseInt(domElement.parentNode.parentNode.querySelector(".god").value);
        let privremenRang = parseInt(domElement.parentNode.parentNode.querySelector(".atp").value);
        if(privremenoIme.match("^[A-Za-z]{1,30}") == null){
            domElement.parentNode.parentNode.querySelector(".imeprez").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".imeprez").style.border = null;
        if(isNaN(privremeneGodine) || privremeneGodine < 15 || privremeneGodine > 50) {
            domElement.parentNode.parentNode.querySelector(".god").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".god").style.border = null;
        if(isNaN(privremenRang) || privremenRang <1 || privremenRang > 3000) {
            domElement.parentNode.parentNode.querySelector(".atp").style.border = "2px solid red";
            greska = true;
        }
        else
            domElement.parentNode.parentNode.querySelector(".atp").style.border = null;
        if(greska)
            alert("Nevalidan unos podataka");
        else {
            this.ime = privremenoIme;
            this.godine = privremeneGodine;
            this.rang = privremenRang;
            fetch("https://localhost:5001/TeniskiMec/UpisIgraca",{
            method:"POST",
             headers:{
                "Content-Type":"application/json"
                },
                body: JSON.stringify({
                imeprezime:this.ime,
                goidne:this.godine,
                rang:this.rang,
            })
            }).then(p=>{
                if(p.ok)
                {
                    let opcija = document.createElement("option");
                    opcija.value = this.ime;
                    opcija.innerHTML = this.ime;
                    selel.appendChild(opcija);
                    //selel.insertBefore(opcija, selel.lastChild);
                    
                }
                else 
                alert("Greška!");
            });
         
            
             
        }
        
    }
    vratiRangIgraca(){return this.rang;}
*/
}