using BackendInsurance.DTOs.Poliza;
using BackendInsurance.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendInsurance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolizaController : ControllerBase
    {
        private IValidator<PolizaInsertDto> _polizaInsertValidator;
        private IValidator<PolizaUpdateDto> _polizaUpdateValidator;
        private IValidator<PolizaEstatusUpdateDto> _polizaUpdateEstatusValidator;
        private ICommonService<PolizaDto, PolizaInsertDto, PolizaUpdateDto> _polizaService;
        private IPolizaStatusService _polizaStatusService;

        public PolizaController(
            IValidator<PolizaInsertDto> polizaInsertValidator,
            IValidator<PolizaUpdateDto> polizaUpdateValidator,
            IValidator<PolizaEstatusUpdateDto> polizaUpdateEstatusValidator,
            [FromKeyedServices("polizaService")] ICommonService<PolizaDto, PolizaInsertDto, PolizaUpdateDto> polizaService,
            IPolizaStatusService polizaStatusService
        )
        {
            _polizaInsertValidator = polizaInsertValidator;
            _polizaUpdateValidator = polizaUpdateValidator;
            _polizaUpdateEstatusValidator = polizaUpdateEstatusValidator;
            _polizaService = polizaService;
            _polizaStatusService = polizaStatusService;
        }

        [HttpGet]
        public async Task<IEnumerable<PolizaDto>> Get() =>
            await _polizaService.Get();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var polizaDto = await _polizaService.GetById(id);
            return polizaDto == null ? NotFound() : Ok(polizaDto);
        }

        [HttpPost]
        public async Task<ActionResult<PolizaDto>> Add(PolizaInsertDto polizaInsertDto)
        {
            var validationResult = await _polizaInsertValidator.ValidateAsync(polizaInsertDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            if (!_polizaService.Validate(polizaInsertDto))
            {
                return BadRequest(_polizaService.Errors);
            }
            var polizaDto = await _polizaService.Add(polizaInsertDto);
            return CreatedAtAction(nameof(GetById), new { id = polizaDto.PolizaID }, polizaDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PolizaUpdateDto polizaUpdateDto)
        {
            var validationResult = await _polizaUpdateValidator.ValidateAsync(polizaUpdateDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            if (!_polizaService.Validate(polizaUpdateDto))
            {
                return BadRequest(_polizaService.Errors);
            }
            var polizaDto = await _polizaService.Update(id, polizaUpdateDto);
            return polizaDto == null ? NotFound() : Ok(polizaDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var polizaDto = await _polizaService.Delete(id);
            return polizaDto == null ? NotFound() : Ok(polizaDto);
        }

        [HttpPatch("{id:int}/estatus")]
        public async Task<IActionResult> UpdateEstatus(int id, [FromBody] PolizaEstatusUpdateDto dto)
        {
            var validationResult = await _polizaUpdateEstatusValidator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var result = await _polizaStatusService.UpdateEstatus(id, dto.Estatus);
            if (result == null) return NotFound();

            return Ok(result);
        }

    }
}
