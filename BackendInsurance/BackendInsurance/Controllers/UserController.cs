using BackendInsurance.Services;
using BackendInsurance.DTOs.User;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace BackendInsurance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IValidator<UserInsertDto> _userInsertValidator;
        private IValidator<UserUpdateDto> _userUpdateValidator;
        private ICommonService<UserDto, UserInsertDto, UserUpdateDto> _userService;

        public UserController(IValidator<UserInsertDto> userInsertValidator,
            IValidator<UserUpdateDto> userUpdateValidator,
            [FromKeyedServices("userService")]ICommonService<UserDto, UserInsertDto, UserUpdateDto> userService)
        {
            _userInsertValidator = userInsertValidator;
            _userUpdateValidator = userUpdateValidator;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> Get() =>
            await _userService.Get();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userDto = await _userService.GetById(id);

            return userDto == null ? NotFound() : Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Add(UserInsertDto beerInsertDto)
        {
            var validationResult = await _userInsertValidator.ValidateAsync(beerInsertDto);

            if(!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            if(!_userService.Validate(beerInsertDto))
            {
                return BadRequest(_userService.Errors);
            }

            var userDto =  await _userService.Add(beerInsertDto);

            return CreatedAtAction(nameof(GetById), new { id = userDto.UserID }, userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateDto userUpdateDto)
        {
            var validationResult = await _userUpdateValidator.ValidateAsync(userUpdateDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            if(!_userService.Validate(userUpdateDto))
            {
                return BadRequest(_userService.Errors);
            }

            var userDto = await _userService.Update(id, userUpdateDto);

            return userDto == null ? NotFound() : Ok(userDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDto>> Delete(int id)
        {
            var userDto = await _userService.Delete(id);

            return userDto == null ? NotFound() : Ok(userDto);
        }

    }
}
