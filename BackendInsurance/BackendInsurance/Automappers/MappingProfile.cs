using AutoMapper;
using BackendInsurance.DTOs.Poliza;
using BackendInsurance.DTOs.User;
using BackendInsurance.Models;

namespace BackendInsurance.Automappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserInsertDto, User>();
            CreateMap<User, UserDto>();
            CreateMap<UserUpdateDto, User>();

            CreateMap<PolizaInsertDto, Poliza>();
            CreateMap<Poliza, PolizaDto>();
            CreateMap<PolizaUpdateDto, Poliza>();
        }
    }
}
