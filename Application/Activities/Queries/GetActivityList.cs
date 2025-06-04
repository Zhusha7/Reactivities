using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities.DTO;
using Application.Interfaces;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> { }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken) => await context.Activities
                .AsNoTracking()
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new {currentUserId = userAccessor.GetUserId()})
                .ToListAsync(cancellationToken);
    }
}
