import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger" // Pour Swagger

export class LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "password123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string
}

