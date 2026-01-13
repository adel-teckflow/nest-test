import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        "1rrz5gggpfpofknsdg415g4894h5df4g4k5k4p44sd1fds145f11g56df4+g54j56df1bsfg448974dfg4df64gdfhsdf4g4fd4gd4f484ytyti4i4opi84qs5223a121c01s231261b56jgh4kqr65h156gj45q4h51h156g4tr", // En prod, utilise un .env !
    })
  }

  // Cette méthode est appelée après que le JWT soit validé.
  // Ce qu'elle retourne sera disponible dans req.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.username }
  }
}
