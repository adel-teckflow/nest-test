import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "MA_CLE_SUPER_SECRETE", // En prod, utilise un .env !
    })
  }

  // Cette méthode est appelée après que le JWT soit validé.
  // Ce qu'elle retourne sera disponible dans req.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }
  }
}
