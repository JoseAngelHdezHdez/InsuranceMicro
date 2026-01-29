using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendInsurance.Models
{
    public class Poliza
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PolizaID { get; set; }
        public string NumeroPoliza { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal MontoPrima { get; set; }
        public string Estatus { get; set; } = "Cotizada";

        public int TipoPolizaID { get; set; }
        [ForeignKey("TipoPolizaID")]
        public TipoPoliza TipoPoliza { get; set; }

        public string Names { get; set; }
        public string FatherLastName { get; set; }
        public string MotherLastName { get; set; }
        public int Age { get; set; }
        public string Contry { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
