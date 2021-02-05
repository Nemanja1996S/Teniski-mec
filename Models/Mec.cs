
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projekat.Models
{
    [Table("Mec")]
    public class Mec
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Lokacija")]
        [MaxLength(255)]
        [DataType("nvachar(255)")]
        public string Lokacija { get; set; }

        [Column("VremeOdrzavanja")]
        [DataType("date")]
        public string VremeOdrzavanja { get; set; }

        public virtual Rezultat Rezultat { get; set; }        
    }
}