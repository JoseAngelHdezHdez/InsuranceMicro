using BackendInsurance.DTOs.Poliza;
using FluentValidation;

namespace BackendInsurance.Validators.Poliza
{
    public class PolizaUpdateValidator : AbstractValidator<PolizaUpdateDto>
    {
        public PolizaUpdateValidator() {
            RuleFor(x => x.Names)
                .MaximumLength(80).WithMessage("Names must not exceed 80 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("Names must contain only letters.")
                .When(x => !string.IsNullOrWhiteSpace(x.Names));

            RuleFor(x => x.FatherLastName)
                .MaximumLength(50).WithMessage("FatherLastName must not exceed 50 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("FatherLastName must contain only letters.")
                .When(x => !string.IsNullOrWhiteSpace(x.FatherLastName));

            RuleFor(x => x.MotherLastName)
                .MaximumLength(50).WithMessage("MotherLastName must not exceed 50 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("MotherLastName must contain only letters.")
                .When(x => !string.IsNullOrWhiteSpace(x.MotherLastName));

            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Email is not valid.")
                .MaximumLength(100).WithMessage("Email must not exceed 100 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.Email));

            RuleFor(x => x.Phonenumber)
                .Matches(@"^\+?\d{10,15}$").WithMessage("Phonenumber must be valid (10 to 15 digits).")
                .When(x => !string.IsNullOrWhiteSpace(x.Phonenumber));

            RuleFor(x => x.Contry)
                .MaximumLength(60).WithMessage("Contry must not exceed 60 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("Contry must contain only letters.")
                .When(x => !string.IsNullOrWhiteSpace(x.Contry));

            RuleFor(x => x.Gender)
                .Must(g => g == "Male" || g == "Female").WithMessage("Gender must be 'Male' or 'Female'.")
                .When(x => !string.IsNullOrWhiteSpace(x.Gender));

            // Números
            RuleFor(x => x.TipoPolizaID)
                .GreaterThan(0).WithMessage("TipoPolizaID must be greater than 0.");

            RuleFor(x => x.Age)
                .InclusiveBetween(18, 100).WithMessage("Age must be between 18 and 100.");

            RuleFor(x => x.MontoPrima)
                .GreaterThan(0).WithMessage("MontoPrima must be greater than 0.");

            // ✅ Fechas: usar valores nuevos si vienen, si no usar lo actual de BD
            RuleFor(x => x.FechaInicio)
                .LessThan(x => x.FechaFin);
        }
    }
}
