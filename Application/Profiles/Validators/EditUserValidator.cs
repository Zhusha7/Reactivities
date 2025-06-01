using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Profiles.Validators;

public class EditUserValidator : AbstractValidator<EditProfile.Command>
{
    public EditUserValidator()
    {
        RuleFor(x => x.DisplayName).NotEmpty().WithMessage("Display name is required");
        RuleFor(x => x.Bio).MaximumLength(1000).WithMessage("Bio must be less than 1000 characters");
    }
}