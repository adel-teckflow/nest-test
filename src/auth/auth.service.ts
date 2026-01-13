import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import { JwtService } from "@nestjs/jwt"
import { LoginDto } from "./dto/login.dto"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { UserRole } from "src/users/schemas/user.schema"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // On injecte le service des users
    private jwtService: JwtService, // On injecte le service JWT
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // 1. On cherche l'utilisateur dans la BDD (Mongoose)
    // Note: Tu devras peut-être ajouter une méthode findByEmail dans UsersService
    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    // 2. On compare le mot de passe envoyé avec le hash en BDD
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    // 3. Si tout est bon, on génère le token (Payload)
    const payload = { sub: user._id, email: user.email, role: user.role, name: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  // --- MÉTHODE REGISTER ---

  async register(createUserDto: CreateUserDto) {
    // On écrase le rôle pour forcer 'USER', peu importe ce que le hacker envoie
    const secureUser = {
      ...createUserDto,
      role: UserRole.USER,
    }

    return this.usersService.create(secureUser)
  }
  // async register(createUserDto: CreateUserDto) {
  //   // 1. On appelle simplement la méthode create du UsersService
  //   const user = await this.usersService.create(createUserDto)

  //   // Optionnel : Tu peux générer un token direct pour connecter l'user immédiatement
  //   // return this.login({ email: user.email, password: createUserDto.password });

  //   // Ou juste renvoyer l'utilisateur créé (sans le mot de passe idéalement)
  //   return user
  // }
}
