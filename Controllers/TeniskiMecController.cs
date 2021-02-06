using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using projekat.Models;
using Microsoft.EntityFrameworkCore;

namespace projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeniskiMecController : ControllerBase
    {
        public TeniskiMecContext Context { get; set; }
        
        public TeniskiMecController(TeniskiMecContext context)
        {
             Context = context;
        }

        [Route("VratiMeceve")]
        [HttpGet]
        public async Task<List<Mec>> VratiMeceve()
        {
            return await Context.Mecevi.Include(p => p.Rezultat).Include(p => p.Rezultat.Igrac1).Include(p => p.Rezultat.Igrac2).ToListAsync();
            //.Include(p => p.Igrac1).Include(p => p.Igrac2).Include(p => p.Rezultat)
        }

        [Route("VratiMec/{id}")]
        [HttpGet]
        public async Task<Mec> VratiMec(int id)
        {
            return await Context.Mecevi.Where(p => p.ID == id).Include(p => p.Rezultat).Include(p => p.Rezultat.Igrac1).Include(p => p.Rezultat.Igrac2).FirstAsync();
            //.Include(p => p.Igrac1).Include(p => p.Igrac2).Include(p => p.Rezultat)
        }
        
        [Route("UpisiMec/{idRez}")]
        [HttpPost]
        public async Task UpisiMec ([FromBody] Mec mec, int idRez)
        {
            
            var rez = await Context.Rezultati.FindAsync(idRez);
            mec.Rezultat = rez;
            Context.Mecevi.Add(mec);
            await Context.SaveChangesAsync();
        }

        [Route("KreirajMec/{id1}/{id2}/{lokacija}")]
        [HttpPost]
        public async Task KreirajMec ( int id1, int id2 , string lokacija, [FromBody] Mec m)
        {
            var igrac1 = await Context.Igraci.FindAsync(id1);
            var igrac2 = await Context.Igraci.FindAsync(id2);
            var mec = new Mec();
            var rez = new Rezultat();
            rez.Igrac1 = igrac1;
            rez.Igrac2 = igrac2;
            rez.BrSet1 = 0;
            rez.BrSet2 = 0;
            rez.BrPoenaSeta1prvog = 0;
            rez.BrPoenaSeta1drugog = 0;
            rez.BrPoenaSeta2prvog = 0;
            rez.BrPoenaSeta2drugog = 0;
            rez.TrenutniSet = 1;
            rez.KrajMeca = false;
            mec.Rezultat = rez;
            mec.Lokacija = lokacija;
            mec.VremeOdrzavanja = m.VremeOdrzavanja;
            Context.Rezultati.Add(rez);
            Context.Mecevi.Add(mec);
            await Context.SaveChangesAsync();
            
            
        }

        [Route("IzmeniMec/{idMeca}")]
        [HttpPut]
        public async Task IzmeniMec(int idMeca,[FromBody] Mec mec)
        {
            var stariMec = await Context.Mecevi.FindAsync(idMeca);
            stariMec.Lokacija = mec.Lokacija;
            stariMec.VremeOdrzavanja = mec.VremeOdrzavanja;
            Context.Update<Mec>(mec);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiMec/{id}")]
        [HttpDelete]
        public async Task IzbrisiMec(int id)
        {
            var mec = await Context.Mecevi.FindAsync(id);
            Context.Remove(mec);
            await Context.SaveChangesAsync();
        }

        [Route("UpisIgraca")]
        [HttpPost]
        public async Task UpisIgraca([FromBody] Igrac igrac)
        {
            Context.Igraci.Add(igrac);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniIgraca/{rang}")]
        [HttpPut]
        public async Task IzmeniIgraca ( int rang,[FromBody] Igrac igrac)
        {
            var i = await Context.Igraci.Where(p => p.Rang == rang).FirstAsync();
            i.ImePrezime = igrac.ImePrezime;
            i.Godine = igrac.Godine;
            i.Rang = igrac.Rang;
            Context.Update<Igrac>(i);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiIgraca/{id}")]
        [HttpDelete]
        public async Task IzbrisiIgraca (int id)
        {
            var igrac = await Context.Igraci.FindAsync(id);
            var rez = await Context.Rezultati.Where(r => r.Igrac1 == igrac || r.Igrac2 == igrac).ToListAsync();
            foreach(Rezultat r in rez){
                Context.Remove<Rezultat>(r);
            }
            Context.Remove<Igrac>(igrac);
            await Context.SaveChangesAsync();
        }
 

        [Route("VratiIgrace")]
        [HttpGet]
        public async Task<List<Igrac>> vratiIgrace ()
        {
            return await Context.Igraci.ToListAsync();
        }

        [Route("VratiIgraca/{id}")]
        [HttpGet]
        public async Task<Igrac> vratiIgraca (int id)
        {
            return await Context.Igraci.FindAsync(id);
        }

        [Route("UpisRezultata/{rang1}/{rang2}")]
        [HttpPost]
        public async Task UpisRezultata (int rang1, int rang2,[FromBody] Rezultat rezultat)
        {
            rezultat.Igrac1 = await Context.Igraci.Where(p => p.Rang == rang1).FirstAsync();
            rezultat.Igrac2 = await Context.Igraci.Where(p => p.Rang == rang2).FirstAsync();
           // rezultat.Igrac1 = i1;
           // rezultat.Igrac2 = i2;
            Context.Rezultati.Add(rezultat);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRezultat/{rang1}/{rang2}")]
        [HttpPut]
        public async Task IzmeniRezultat(int rang1, int rang2, [FromBody] Rezultat rezultat)
        {
            var stariRez = await Context.Rezultati.Where(p => p.Igrac1.Rang == rang1 && p.Igrac2.Rang == rang2).FirstAsync();
            stariRez.BrSet1 = rezultat.BrSet1;
            stariRez.BrSet2 = rezultat.BrSet2;
            stariRez.BrPoenaSeta1prvog = rezultat.BrPoenaSeta1prvog;
            stariRez.BrPoenaSeta1drugog = rezultat.BrPoenaSeta1drugog;
            stariRez.BrPoenaSeta2prvog = rezultat.BrPoenaSeta2prvog;
            stariRez.BrPoenaSeta2drugog = rezultat.BrPoenaSeta2drugog;
            Context.Update<Rezultat>(stariRez);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRezultat/{mecid}")]
        [HttpPut]
        public async Task IzmeniRezultat (int mecid, [FromBody] Rezultat rezultat){
            var mec = await Context.Mecevi.Where(m => m.ID == mecid).Include(m => m.Rezultat).Include(m => m.Rezultat.Igrac1).Include(m => m.Rezultat.Igrac2).FirstAsync();
            mec.Rezultat.BrSet1 = rezultat.BrSet1;
            mec.Rezultat.BrSet2 = rezultat.BrSet2;
            mec.Rezultat.BrPoenaSeta1prvog = rezultat.BrPoenaSeta1prvog;
            mec.Rezultat.BrPoenaSeta1drugog = rezultat.BrPoenaSeta1drugog;
            mec.Rezultat.BrPoenaSeta2prvog = rezultat.BrPoenaSeta2prvog;
            mec.Rezultat.BrPoenaSeta2drugog = rezultat.BrPoenaSeta2drugog;
            mec.Rezultat.TrenutniSet = rezultat.TrenutniSet;
            mec.Rezultat.KrajMeca = rezultat.KrajMeca;
            Context.Update<Rezultat>(rezultat);
            Context.Update<Mec>(mec);
            await Context.SaveChangesAsync();
        }

        [Route("VratiRezultate")]
        [HttpGet]
        public async Task<List<Rezultat>> VratiRezultate()
        {
            return await Context.Rezultati.Include(p => p.Igrac1).Include(p => p.Igrac2).ToListAsync();
        }

        [Route("VratiRezultat/{rang1}/{rang2}")]
        [HttpGet]
        public async Task<Rezultat> VratiRezultat(int rang1, int rang2)
        {
            return await Context.Rezultati.Where(p => p.Igrac1.Rang == rang1).Where(p => p.Igrac2.Rang == rang2).Include(p => p.Igrac1).Include(p => p.Igrac2).FirstAsync();
        }

        

        [Route("IzbrisiRezultat/{idRez}")]
        [HttpDelete]
        public async Task IzbrisiRezultat(int idRez)
        {
            var rez = await Context.Rezultati.FindAsync(idRez);
            Context.Remove(rez);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRezultat/{brS1}/{brS2}/{brPS11}/{brPS12}/{brPS21}/{brPS22}")]
        [HttpDelete]
        public async Task IzbrisiRezultat(int brS1, int brS2, int brPS11, int brPS12, int brPS21, int brPS22)
        {
            var rez = await Context.Rezultati.Where(p => p.BrSet1 == brS1).Where(p => p.BrSet2 == brS2)
            .Where(p => p.BrPoenaSeta1prvog == brPS11).Where(p => p.BrPoenaSeta1drugog == brPS12)
            .Where(p => p.BrPoenaSeta2prvog == brPS21).Where(p => p.BrPoenaSeta2drugog == brPS22).FirstAsync();
            Context.Remove(rez);
            await Context.SaveChangesAsync();
        }









    }

        
}
