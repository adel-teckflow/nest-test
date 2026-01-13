import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import { JwtService } from "@nestjs/jwt"
import { LoginDto } from "./dto/login.dto"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { UserRole } from "src/users/schemas/user.schema"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // Validation basique
    if (!email || !password) {
      throw new BadRequestException("Email et mot de passe requis")
    }

    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou mot de passe incorrect")
    }

    // Génération du token JWT
    const payload = { sub: user._id, email: user.email, role: user.role, name: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    }
  }

  // --- MÉTHODE REGISTER (SÉCURISÉE) ---
  // Force le rôle USER pour éviter que quelqu'un se crée en ADMIN
  async register(createUserDto: CreateUserDto) {
    // Validation
    if (!createUserDto.email || !createUserDto.password || !createUserDto.username) {
      throw new BadRequestException("Email, mot de passe et username requis")
    }

    if (createUserDto.password.length < 6) {
      throw new BadRequestException("Le mot de passe doit contenir au moins 6 caractères")
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    // Force le rôle USER quoi qu'il arrive
    const secureUser = {
      ...createUserDto,
      password: hashedPassword,
      role: UserRole.USER,
    }

    const user = await this.usersService.create(secureUser)

    // Retour sans le mot de passe
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      message: "Utilisateur créé avec succès. Connectez-vous avec vos identifiants.",
    }
  }
}
