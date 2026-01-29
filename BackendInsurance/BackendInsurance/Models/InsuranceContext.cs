using Microsoft.EntityFrameworkCore;

namespace BackendInsurance.Models
{
    public class InsuranceContext : DbContext
    {
        public InsuranceContext(DbContextOptions<InsuranceContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<TipoPoliza> TipoPolizas { get; set; }
        public DbSet<Poliza> Polizas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>().HasData(
                new Role { RoleID = 1, name = "Admin" },
                new Role { RoleID = 2, name = "Broker" },
                new Role { RoleID = 3, name = "Cliente" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { UserID = 1, username = "admin", email = "admin@gmail.com", password = "123456789", RoleID = 1 }
             );

            modelBuilder.Entity<TipoPoliza>().HasData(
                new TipoPoliza { TipoPolizaID = 1, Name = "Hogar" },
                new TipoPoliza { TipoPolizaID = 2, Name = "Vida" },
                new TipoPoliza { TipoPolizaID = 3, Name = "Auto" },
                new TipoPoliza { TipoPolizaID = 4, Name = "Salud" }
            );
        }

    }
}
