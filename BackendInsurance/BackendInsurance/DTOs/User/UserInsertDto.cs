namespace BackendInsurance.DTOs.User
{
    public class UserInsertDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string email { get; set; }
        public int RoleID { get; set; }
    }
}
