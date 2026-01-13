import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"

/**
 * Strategy JWT pour Passport
 * Valide les tokens JWT et injecte l'utilisateur dans req.user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET") || "SECRET_KEY_A_METTRE_DANS_ENV",
    })
  }

  /**
   * Valide le payload JWT et retourne l'utilisateur
   * Appelé automatiquement après validation du token
   */
  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.name,
      role: payload.role,
    }
  }
}
