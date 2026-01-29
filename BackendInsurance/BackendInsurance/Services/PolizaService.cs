
using AutoMapper;
using BackendInsurance.DTOs.Poliza;
using BackendInsurance.Models;
using BackendInsurance.Repository;
using System.Data;

namespace BackendInsurance.Services
{
    public class PolizaService : ICommonService<PolizaDto, PolizaInsertDto, PolizaUpdateDto>, IPolizaStatusService
    {
        private IPolizaRepository _polizaRepository;
        private IMapper _mapper;
        public List<string> Errors { get; }

        public PolizaService(IPolizaRepository polizaRepository, IMapper mapper)
        {
            _polizaRepository = polizaRepository;
            _mapper = mapper;
            Errors = new List<string>();
        }

        public async Task<PolizaDto> Add(PolizaInsertDto polizaInsertDto)
        {
            var poliza = _mapper.Map<Poliza>(polizaInsertDto);

            // Generar NumeroPoliza si no viene
            if (string.IsNullOrWhiteSpace(poliza.NumeroPoliza))
            {
                poliza.NumeroPoliza = $"POL-{DateTime.UtcNow:yyyyMMddHHmmss}-{Random.Shared.Next(100, 999)}";
            }

            await _polizaRepository.Add(poliza);
            await _polizaRepository.Save();

            return _mapper.Map<PolizaDto>(poliza);
        }

        public async Task<PolizaDto> Delete(int id)
        {
            var poliza = await _polizaRepository.GetById(id);

            if (poliza == null)
            {
                return null;
            }
            var polizaDto = _mapper.Map<PolizaDto>(poliza);
            _polizaRepository.Delete(poliza);
            await _polizaRepository.Save();

            return polizaDto;
        }

        public async Task<IEnumerable<PolizaDto>> Get()
        {
            var polizas =  await _polizaRepository.Get();
            return polizas.Select(poliza => _mapper.Map<PolizaDto>(poliza));
        }

        public async Task<PolizaDto> GetById(int id)
        {
            var poliza =  await _polizaRepository.GetById(id);
            if (poliza == null)
            {
                return null;
            }
            return _mapper.Map<PolizaDto>(poliza);
        }

        public async Task<PolizaDto> Update(int id, PolizaUpdateDto userUpdateDto)
        {
            var poliza = await _polizaRepository.GetById(id);
            if(poliza == null)
            {
                return null;
            }

            poliza = _mapper.Map<PolizaUpdateDto, Poliza>(userUpdateDto, poliza);
            _polizaRepository.Update(poliza);
            await _polizaRepository.Save();
            return _mapper.Map<PolizaDto>(poliza);
        }

        public async Task<PolizaDto?>UpdateEstatus(int id, string estatus)
        {
            var ok = await _polizaRepository.UpdateEstatus(id, estatus);
            if (!ok) return null;

            var poliza = await _polizaRepository.GetById(id);
            return _mapper.Map<PolizaDto>(poliza);
        }

        public bool Validate(PolizaInsertDto dto)
        {
            if(dto.FechaFin <= dto.FechaInicio)
            {
                Errors.Add("La fecha de fin debe ser mayor a la fecha de inicio.");
                return false;
            }
            if(_polizaRepository.Search(p => p.Email == dto.Email 
                && p.TipoPolizaID == dto.TipoPolizaID).Count() > 0)
            {
                Errors.Add("El email ya existe con este tipo de prestamo.");
                return false;
            }
            return true;
        }

        public bool Validate(PolizaUpdateDto dto)
        {
            if (dto.FechaFin <= dto.FechaInicio)
            {
                Errors.Add("La fecha de fin debe ser mayor a la fecha de inicio.");
                return false;
            }
            if (_polizaRepository.Search(p => p.Email == dto.Email
                && p.TipoPolizaID == dto.TipoPolizaID && p.PolizaID != dto.PolizaID).Count() > 0)
            {
                Errors.Add("El email ya existe con este tipo de prestamo.");
                return false;
            }
            return true;
        }
    }
}
