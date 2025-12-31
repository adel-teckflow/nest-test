import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Renvoie 201 explicitement
  async create(@Body() createUserDto: CreateUserDto) {
    // NestJS attend la résolution de la promesse avant de répondre au client
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    // Si l'id n'est pas trouvé, le service lancera une 404 que Nest gèrera
    return await this.usersService.findOne(id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT) // Renvoie 204 (Succès mais pas de contenu à renvoyer)
  async remove(@Param("id") id: string) {
    await this.usersService.remove(id)
  }
}
