using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendInsurance.Models
{
    public class TipoPoliza
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TipoPolizaID { get; set; }
        public string Name { get; set; }
    }
}
