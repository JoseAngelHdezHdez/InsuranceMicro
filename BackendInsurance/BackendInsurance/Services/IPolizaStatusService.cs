using BackendInsurance.DTOs.Poliza;

namespace BackendInsurance.Services
{
    public interface IPolizaStatusService
    {
        Task<PolizaDto?> UpdateEstatus(int id, string estatus);
    }
}
