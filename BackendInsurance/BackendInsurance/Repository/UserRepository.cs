using BackendInsurance.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendInsurance.Repository
{
    public class UserRepository : IRepository<User>
    {
        private InsuranceContext _context;

        public UserRepository(InsuranceContext context)
        {
            _context = context;
        }

        public async Task Add(User entity)
            => await _context.Users.AddAsync(entity);

        public void Delete(User entity)
            => _context.Users.Remove(entity);

        public async Task<IEnumerable<User>> Get() 
            => await _context.Users.ToListAsync();

        public async Task<User> GetById(int id)
            => await _context.Users.FindAsync(id);

        public async Task Save()
            => await _context.SaveChangesAsync();

        public void Update(User entity)
        {
            _context.Users.Attach(entity);
            _context.Users.Entry(entity).State = EntityState.Modified;
        }

        public IEnumerable<User> Search(Func<User, bool> filter)
            => _context.Users.Where(filter).ToList();
    }
}
