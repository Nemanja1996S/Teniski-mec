using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projekat.Models
{
    [Table("Rezultat")]
    public class Rezultat
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("BrSet1")]
        public int BrSet1 { get; set; }

        [Column("BrSet2")]
        public int BrSet2 { get; set; }

        [Column("BrPoenaSeta1prvog")]
        public int BrPoenaSeta1prvog { get; set; }

        [Column("BrPoenaSeta1drugog")]
        public int BrPoenaSeta1drugog { get; set; }

        [Column("BrPoenaSeta2prvog")]
        public int BrPoenaSeta2prvog { get; set; }

        [Column("BrPoenaSeta2drugog")]
        public int BrPoenaSeta2drugog { get; set; }

        [Column("TrenutniSet")]
        public int TrenutniSet { get; set; }

        [Column("KrajMeca")]
        public bool KrajMeca { get; set; }

       public virtual Igrac Igrac1 { get; set; }

        public virtual Igrac Igrac2 { get; set; }



        //[ForeignKey("Rang")]
       // [Column("Igrac1")]
       // public virtual Igrac Igrac1 { get; set; }

       // [ForeignKey("Rang")]
       // [Column("Igrac2")]
       // public virtual Igrac Igrac2 { get; set; }
    }
}