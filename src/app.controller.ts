import { Controller, Get, Param } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
  @Get("goodbye/:id") // On ajoute un paramètre :id
  getGoodbye(@Param("id") id: string): string {
    // On convertit le string de l'URL en number
    return this.appService.getGoodbye(Number(id))
  }
}

