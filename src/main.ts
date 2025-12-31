import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle("Mon API NestJS")
    .setDescription("Documentation interactive des modules Cats, Orders et Users")
    .setVersion("1.0")
    .addTag("cats") // Tu peux ajouter des tags pour organiser tes routes
    .build()

  const document = SwaggerModule.createDocument(app, config)

  // Le premier argument 'api' sera l'URL : http://localhost:3000/api
  SwaggerModule.setup("api", app, document)

  // ICI : On active la validation automatique pour TOUTES les routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les champs qui ne sont pas dans le DTO (sécurité !)
      forbidNonWhitelisted: true, // Renvoie une erreur si un champ inconnu est envoyé
      transform: true, // Transforme automatiquement les types (ex: string -> number)
    }),
  )

  await app.listen(process.env.Port ?? 3000)
}
bootstrap()
