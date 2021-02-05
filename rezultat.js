import { Igrac } from "./igrac.js";
export class Rezultat
{
    constructor (brSet1,brSet2,brPoenaSeta1prvog,brPoenaSeta1drugog,brPoenaSeta2prvog,brPoenaSeta2drugog)
    {
        this.brSet1 = brSet1;
        this.brSet2 = brSet2;
        this.brPoenaSeta1prvog = brPoenaSeta1prvog;
        this.brPoenaSeta1drugog = brPoenaSeta1drugog;
        this.brPoenaSeta2prvog = brPoenaSeta2prvog;
        this.brPoenaSeta2drugog = brPoenaSeta2drugog;
        this.krajMeca = true;
        this.trenutniSet = 2;
    }
    
    crtajRezultat(host)
    {
        
        if(host == null)
            throw new Exception ("Roditelj ne postoji");
        
        let divel = document.createElement("div");
        divel.className = "rezultat";

        let malidiv = document.createElement("div");
        malidiv.className = "malidiv";
        

        let labela = document.createElement("label");
        labela.innerHTML = "Rezultat";
        malidiv.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = `${this.brSet1} - ${this.brSet2}`;
        malidiv.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = `(${this.brPoenaSeta1prvog} - ${this.brPoenaSeta1drugog}) , (${this.brPoenaSeta2prvog} - ${this.brPoenaSeta2drugog})`;
        malidiv.appendChild(labela);
       
        divel.appendChild(malidiv);

        malidiv = document.createElement("div");
        malidiv.className = "malidiv";

        labela = document.createElement("label");
        labela.innerHTML = "Poeni";
        malidiv.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "---";
        malidiv.appendChild(labela);

        divel.appendChild(malidiv);

        let malidiv2 = document.createElement("div");
        malidiv.className = "malidiv";
        let btn = document.createElement("button");
        btn.innerHTML = "+";
        malidiv2.appendChild(btn);
        btn.onclick = (ev) => {

            if (this.krajMeca)
                alert("Mec je gotov");
            else {
                if(this.trenutniSet == 1){ 
                    this.brPoenaSeta1prvog++;
                    if(this.brPoenaSeta1prvog > 5){
                        this.brPoenaSeta1prvog = 6;
                        this.brSet1++;
                        this.trenutniSet = 2;
                        this.brPoenaSeta2prvog = 0;
                        this.brPoenaSeta2drugog = 0;
                    
                    }
                }
                else{
                    if(this.trenutniSet == 2){
                        this.brPoenaSeta2prvog++;
                        if(this.brPoenaSeta2prvog > 5){
                            this.brPoenaSetaprvog = 6;
                            this.brSet1++;
                            this.krajMeca = true;
                        }
                    }
                }
                this.azurirajRezultat(btn.parentNode);
            }
            
        }
        btn = document.createElement("button");
        btn.innerHTML = "+";
        malidiv2.appendChild(btn);
        btn.onclick = (ev) => {
            if (this.krajMeca)
                alert("Mec je gotov");
            else{
                    if(this.trenutniSet == 1) {
                        this.brPoenaSeta1drugog++;
                        
                        if(this.brPoenaSeta1drugog > 5){
                            this.brPoenaSeta1drugog = 6;
                            this.brSet2++;
                            this.trenutniSet = 2;
                            this.brPoenaSeta2prvog = 0;
                            this.brPoenaSeta2drugog = 0;
                        }
                    }    
                    else{
                        if(this.trenutniSet == 2){
                            this.brPoenaSeta2drugog++;
                            if(this.brPoenaSeta2drugog > 5){
                                this.brPoenaSeta2drugog = 6;
                                this.brSet2++;
                                this.krajMeca = true;
                                var rangovi = vratiRangIgraca();
                                fetch("https://localhost:5001/TeniskiMec/UpisRezultata"+rangovi[0]+rangovi[1],{
                                 method:"POST",
                                 headers:{
                                    "Content-Type":"application/json"
                                        },
                                    body: JSON.stringify({
                                       brset1:this.brset1,
                                       brset2:this.brSet2,
                                       brpoenaeta1prvog:this.brPoenaSeta1prvog,
                                       brpoenaeta1drugog:this.brPoenaSeta1drugog,
                                       brpoenaeta2prvog:this.brPoenaSeta2prvog,
                                       brpoenaeta2drugog:this.brPoenaSeta2drugog,
                                    })
                                })
                            }
                        }
                    }
                    this.azurirajRezultat(btn.parentNode);
            }
            this.cont = host;
            
        }
        malidiv.appendChild(malidiv2);
        btn = document.createElement("button");
        btn.innerHTML = "Resetuj rezultat";
        btn.className = "resetbtn";
        malidiv.appendChild(btn);
        btn.onclick = (ev) => {
            this.obrisiRezultat(btn.parentNode);
        }
        divel.appendChild(malidiv);

        
        host.appendChild(divel);
        
    }

   /* azurirajPoene(obj)
    {
        this.brSet1 = obj.brSet1;
        this.brSet2 = obj.brSet2;
        this.brPoenaSeta1prvog = obj.brPoenaSeta1prvog;
        this.brPoenaSeta1drugog = obj.brPoenaSeta1drugog;
        this.brpoenaeta2prvog = obj.brpoenaeta2prvog;
        this.brPoenaSeta2drugog = obj.brPoenaSeta2drugog;
        var btn = this.cont.querySelector("resetbtn");
        this.obrisiRezultat(btn);
    }
    */

    
    azurirajRezultat(domEl)
    {
        let labelePoena = domEl.querySelectorAll("label");
        //console.log(labelePoena[1].innerHTML);
        let malidivRezultata = domEl.parentNode.childNodes;
        //console.log(malidivRezultata[0]);
        let labeleRezultata = malidivRezultata[0].querySelectorAll("label");
        //console.log(labeleRezultata[1].innerHTML);
        //console.log(this.trenutniSet);
        if(this.krajMeca){
            labelePoena[1].innerHTML = `---`;
            labeleRezultata[1].innerHTML = `${this.brSet1} - ${this.brSet2}`;
            labeleRezultata[2].innerHTML = `(${this.brPoenaSeta1prvog} - ${this.brPoenaSeta1drugog}) , (${this.brPoenaSeta2prvog} - ${this.brPoenaSeta2drugog})`;
        }
        else {
            if(this.trenutniSet == 1){
                labelePoena[1].innerHTML = `${this.brPoenaSeta1prvog} - ${this.brPoenaSeta1drugog}`;
                labeleRezultata[1].innerHTML = `${this.brSet1} - ${this.brSet2}`;
                labeleRezultata[2].innerHTML = `(${this.brPoenaSeta1prvog} - ${this.brPoenaSeta1drugog})`;
            }
            else {
                labelePoena[1].innerHTML = `${this.brPoenaSeta2prvog} - ${this.brPoenaSeta2drugog}`;
                labeleRezultata[1].innerHTML = `${this.brSet1} - ${this.brSet2}`;
                labeleRezultata[2].innerHTML = `(${this.brPoenaSeta1prvog} - ${this.brPoenaSeta1drugog}) , (${this.brPoenaSeta2prvog} - ${this.brPoenaSeta2drugog})`;

            }
        }
    }

    obrisiRezultat(dmele)
    {
        this.brSet1 = 0;
        this.brSet2 = 0;
        this.brPoenaSeta1prvog = 0;
        this.brPoenaSeta1drugog = 0;
        this.brPoenaSeta2prvog = 0;
        this.brPoenaSeta2drugog = 0;
        this.trenutniSet = 1;
        this.krajMeca = false;
        this.azurirajRezultat(dmele);

    }
    postaviRezultat(b1,b2,b11,b12,b21,b22)
    {
        this.brSet1 = b1;
        this.brSet2 = b2;
        this.brPoenaSeta1prvog = b11;
        this.brPoenaSeta1drugog = b12;
        this.brPoenaSeta2prvog = b21;
        this.brPoenaSeta2drugog = b22;
        this.krajMeca = true;
        this.trenutniSet = 2;
    }

}