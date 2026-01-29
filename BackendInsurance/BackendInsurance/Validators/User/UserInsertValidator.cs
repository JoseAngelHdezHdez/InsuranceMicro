using BackendInsurance.DTOs.User;
using FluentValidation;

namespace BackendInsurance.Validators.User
{
    public class UserInsertValidator : AbstractValidator<UserInsertDto>
    {
        public UserInsertValidator() { 
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username is required.")
                .MaximumLength(150).WithMessage("Username must not exceed 150 characters.");
            RuleFor(x => x.email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.")
                .MaximumLength(150).WithMessage("Email must not exceed 150 characters.");
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long.")
                .MaximumLength(100).WithMessage("Password must be al least 100 charactes long.");
            RuleFor(x => x.RoleID)
                .GreaterThan(0).WithMessage("RoleId must be greater than 0.");

        }
    }
}
