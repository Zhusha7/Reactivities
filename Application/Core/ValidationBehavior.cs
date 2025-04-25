using System;
using MediatR;
using FluentValidation;

namespace Application.Core;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator is not null)
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
        }
        return await next();
    }
}
