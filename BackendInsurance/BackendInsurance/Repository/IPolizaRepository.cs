using BackendInsurance.Models;

namespace BackendInsurance.Repository
{
    public interface IPolizaRepository : IRepository<Poliza>
    {
        Task<bool> UpdateEstatus(int id, string estatus);
    }
}
