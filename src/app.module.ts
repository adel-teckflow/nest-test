import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { OrdersModule } from "./orders/orders.module"
import { UsersModule } from "./users/users.module"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule, ConfigService } from "@nestjs/config" // 1. Importez ceci
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. On charge la configuration de manière globale
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // Améliore les performances
    }),

    // 2. On connecte Mongoose de manière asynchrone
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        // Vous pouvez ajouter d'autres options ici (retryAttempts, etc.)
      }),
    }),

    OrdersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
