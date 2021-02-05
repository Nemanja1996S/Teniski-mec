using Microsoft.EntityFrameworkCore;

namespace projekat.Models
{
    public class TeniskiMecContext : DbContext
    {
        public DbSet<Mec> Mecevi { get; set; }

        public DbSet<Igrac> Igraci { get; set; }

        public DbSet<Rezultat> Rezultati { get; set; }

        public TeniskiMecContext(DbContextOptions options) : base(options)
        {

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
//            modelBuilder.Entity<Rezultat>().HasOne(p => p.Mec).WithOne(p => p.Rezultat).HasForeignKey<Mec>(p => p.RezultatID);
        //}
    }
}