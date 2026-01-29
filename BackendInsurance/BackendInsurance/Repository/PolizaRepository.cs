using BackendInsurance.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendInsurance.Repository
{
    public class PolizaRepository : IPolizaRepository
    {
        private InsuranceContext _context;
        public PolizaRepository(InsuranceContext context)
        {
            _context = context;
        }
        public async Task Add(Poliza entity)
            => await _context.Polizas.AddAsync(entity);

        public void Delete(Poliza entity)
            => _context.Polizas.Remove(entity);

        public async Task<IEnumerable<Poliza>> Get()
            => await _context.Polizas.ToListAsync();

        public async Task<Poliza> GetById(int id)
            => await _context.Polizas.FindAsync(id);

        public async Task Save()
            => await _context.SaveChangesAsync();

        public IEnumerable<Poliza> Search(Func<Poliza, bool> filter)
            => _context.Polizas.Where(filter).ToList();

        public void Update(Poliza entity)
        {
            _context.Polizas.Attach(entity);
            _context.Polizas.Entry(entity).State = EntityState.Modified;
        }

        public async Task<bool> UpdateEstatus(int id, string estatus)
        {
            var poliza = await _context.Polizas.FindAsync(id);
            if (poliza == null) return false;

            poliza.Estatus = estatus;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
