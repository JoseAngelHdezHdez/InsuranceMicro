using BackendInsurance.DTOs.User;
using FluentValidation;

namespace BackendInsurance.Validators.User
{
    public class UserUpdateValidator : AbstractValidator<UserUpdateDto>
    {
        public UserUpdateValidator() { 
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username is required.")
                .MaximumLength(150).WithMessage("Username must not exceed 150 characters.");
            RuleFor(x => x.RoleID)
                .GreaterThan(0).WithMessage("RoleId must be greater than 0.");
        }
    }
}
