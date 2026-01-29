using AutoMapper;
using BackendInsurance.Repository;
using BackendInsurance.DTOs.User;
using BackendInsurance.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendInsurance.Services
{
    public class UserService : ICommonService<UserDto, UserInsertDto, UserUpdateDto>
    {
        private IRepository<User> _userRepository;
        private IMapper _mapper;
        public List<string> Errors { get; }
        public UserService(IRepository<User> userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            Errors = new List<string>();
        }

        public async Task<IEnumerable<UserDto>> Get()
        {
            var beers = await _userRepository.Get();
            return beers.Select(user => _mapper.Map<UserDto>(user));
        }

        public async Task<UserDto> GetById(int id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return null;
            }

            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> Add(UserInsertDto userInsertDto)
        {
            var user = _mapper.Map<User>(userInsertDto);

            await _userRepository.Add(user);
            await _userRepository.Save();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> Update(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return null;
            }

            user = _mapper.Map<UserUpdateDto, User>(userUpdateDto, user);

            _userRepository.Update(user);
            await _userRepository.Save();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> Delete(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null)
            {
                return null;
            }

            var userDto = _mapper.Map<UserDto>(user);

            _userRepository.Delete(user);
            await _userRepository.Save();

            return userDto;
        }

        public bool Validate(UserInsertDto dto)
        {
            if(_userRepository.Search(u => u.email == dto.email).Count() > 0)
            {
                Errors.Add("Email already exists.");
                return false;
            }
            return true;
        }

        public bool Validate(UserUpdateDto dto)
        {
            if (_userRepository.Search(u => u.email == dto.Email 
                &&  dto.Id != u.UserID).Count() > 0)
            {
                Errors.Add("Email already exists.");
                return false;
            }
            return true;
        }
    }
}
