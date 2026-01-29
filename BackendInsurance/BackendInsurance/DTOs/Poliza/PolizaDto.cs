namespace BackendInsurance.DTOs.Poliza
{
    public class PolizaDto
    {
        public int PolizaID { get; set; }
        public string NumeroPoliza { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public decimal MontoPrima { get; set; }
        public string Estatus { get; set; }
        public int TipoPolizaID { get; set; }
        public string Names { get; set; }
        public string FatherLastName { get; set; }
        public string MotherLastName { get; set; }
        public int Age { get; set; }
        public string Contry { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phonenumber { get; set; }
    }
}
