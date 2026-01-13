import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

/**
 * Guard JWT pour protéger les routes
 * À utiliser avec @UseGuards(JwtAuthGuard) sur les contrôleurs/méthodes
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException("Token JWT invalide ou expiré")
    }
    return user
  }
}
