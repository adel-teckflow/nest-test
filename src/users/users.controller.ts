import { JwtAuthGuard } from "./../auth/jwt-auth.guard"
import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ⚠️ CRÉATION DÉSACTIVÉE : Utiliser POST /auth/register uniquement
  // Cela empêche de créer des utilisateurs avec des rôles non autorisés

  @Get()
  @UseGuards(JwtAuthGuard) // Protégé par JWT : seuls les utilisateurs authentifiés peuvent voir la liste
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard) // Protégé par JWT
  async findOne(@Param("id") id: string) {
    return await this.usersService.findOne(id)
  }

  // ⚠️ MODIFICATION DÉSACTIVÉE : Utiliser le profil utilisateur ou une route admin
  // ⚠️ SUPPRESSION DÉSACTIVÉE : Fonctionnalité réservée à l'admin
}
