import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { CreateUserDto } from "src/users/dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK) // On renvoie 200 au lieu de 201 par défaut
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  // --- NOUVELLE ROUTE ---
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    // On passe le bébé au service
    return this.authService.register(createUserDto)
  }
}
