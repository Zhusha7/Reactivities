using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities.Queries;
using Application.Core;
using FluentValidation;
using Application.Activities.Validators;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(opt =>
{
    opt.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    opt.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();
builder.Services.AddAuthorization(options => {
    options.AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); // api/login

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
