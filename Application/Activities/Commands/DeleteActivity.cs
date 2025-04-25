using System;
using MediatR;
using Persistence;
using Application.Core;
namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            context.Activities.Remove(activity);
            var isSuccess = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!isSuccess) return Result<Unit>.Failure("Failed to delete activity", 500);
            return Result<Unit>.Success(Unit.Value);
        }
    }

}
