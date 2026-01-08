import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "src/users/users.module" // Import du module Users
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    UsersModule, // On importe le module pour avoir accès au UsersService
    JwtModule.register({
      global: true, // Le JWT sera dispo partout
      secret: "SECRET_KEY_A_METTRE_DANS_ENV", // Remplace par process.env.JWT_SECRET
      signOptions: { expiresIn: "1d" }, // Le token expire dans 1 jour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
