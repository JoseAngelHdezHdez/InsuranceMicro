using BackendInsurance.DTOs.Poliza;
using FluentValidation;

namespace BackendInsurance.Validators.Poliza
{
    public class PolizaEstatusUpdateValidator : AbstractValidator<PolizaEstatusUpdateDto>
    {
        public PolizaEstatusUpdateValidator()
        {
            RuleFor(x => x.Estatus)
                .NotEmpty().WithMessage("Estatus is required.")
                .Must(e => new[] { "Autorizada", "Rechazada" }.Contains(e))
                .WithMessage("Invalid Estatus.");
        }
    }
}
