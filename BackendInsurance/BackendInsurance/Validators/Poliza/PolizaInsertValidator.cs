using BackendInsurance.DTOs.Poliza;
using FluentValidation;

namespace BackendInsurance.Validators.Poliza
{
    public class PolizaInsertValidator : AbstractValidator<PolizaInsertDto>
    {
        public PolizaInsertValidator() {
            RuleFor(x => x.FechaFin)
                .NotEmpty().WithMessage("FechaInicio is required");
            RuleFor(x => x.FechaInicio)
                .NotEmpty().WithMessage("StartDate is required.")
                .LessThan(x => x.FechaFin).WithMessage("StartDate must be before EndDate.");
            RuleFor(x => x.MontoPrima)
                .NotEmpty().WithMessage("MontoPrima is required.")
                .Must(v => decimal.Round(v, 2) == v)
                    .WithMessage("MontoPrima must have at most 2 decimal places."); ;
            RuleFor(x => x.TipoPolizaID)
                .GreaterThan(0).WithMessage("TipoPolizaID is required.");

            RuleFor(x => x.Names)
                .NotEmpty().WithMessage("Names is required.")
                .MinimumLength(2).WithMessage("Names must be at least 2 characters.")
                .MaximumLength(80).WithMessage("Names must not exceed 80 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("Names must contain only letters.");

            RuleFor(x => x.FatherLastName)
                .NotEmpty().WithMessage("FatherLastName is required.")
                .MinimumLength(2).WithMessage("FatherLastName must be at least 2 characters.")
                .MaximumLength(50).WithMessage("FatherLastName must not exceed 50 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("FatherLastName must contain only letters.");

            RuleFor(x => x.MotherLastName)
                .NotEmpty().WithMessage("MotherLastName is required.")
                .MinimumLength(2).WithMessage("MotherLastName must be at least 2 characters.")
                .MaximumLength(50).WithMessage("MotherLastName must not exceed 50 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("MotherLastName must contain only letters.");

            RuleFor(x => x.Age)
                .InclusiveBetween(18, 100).WithMessage("Age must be between 18 and 100.");

            RuleFor(x => x.Contry)
                .NotEmpty().WithMessage("Contry is required.")
                .MinimumLength(2).WithMessage("Contry must be at least 2 characters.")
                .MaximumLength(60).WithMessage("Contry must not exceed 60 characters.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("Contry must contain only letters.");

            RuleFor(x => x.Gender)
                .NotEmpty().WithMessage("Gender is required.")
                .Must(g => g == "Male" || g == "Female")
                .WithMessage("Gender must be 'M' or 'F'.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email is not valid.")
                .MaximumLength(100).WithMessage("Email must not exceed 100 characters.");

            RuleFor(x => x.Phonenumber)
                .NotEmpty().WithMessage("Phonenumber is required.")
                .Matches(@"^\+?\d{10,15}$")
                .WithMessage("Phonenumber must be valid (10 to 15 digits).");

        }
    }
}
