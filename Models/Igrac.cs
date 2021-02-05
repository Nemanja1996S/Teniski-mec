using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projekat.Models
{
    [Table("Igrac")]
    public class Igrac
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        
        [Column("Rang")]
        public int Rang { get; set; }
        
        [Column("Ime i prezime")]
        [MaxLength(255)]
        [DataType("nvachar(255)")]
        public string ImePrezime { get; set; }

        [Column("Godine")]
        public int Godine { get; set; }
    }
}