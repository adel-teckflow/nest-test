import { IsEmail, IsString, IsInt, IsOptional, IsUUID, IsUrl, IsDateString, IsEnum, IsArray, IsObject, Min, Max, Length, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

// Imaginons une énumération pour les rôles
enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// Le DTO pour la localisation
class LocationDto {
  @IsInt()
  lat: number
  @IsInt()
  lng: number
}

export class CreateUserDto {
  @IsString()
  @Length(3, 20) // Entre 3 et 20 caractères
  username: string

  @IsEmail({}, { message: "Email invalide !", }) // Tu peux personnaliser le message
  email: string

  @IsInt()
  @Min(18) // Pas moins de 18 ans
  @Max(99)
  age: number

  @IsOptional() // Ce champ n'est pas obligatoire
  @IsUUID() // Vérifie le format "550e8400-e29b-41d4-a716-446655440000"
  idCardReference?: string
  
  @IsOptional()
  @IsUrl() // Vérifie que c'est un lien (ex: photo de profil)
  avatarUrl: string

  @IsOptional()
  @IsDateString() // Vérifie le format ISO (ex: "2025-12-31")
  birthDate: string

  @IsEnum(UserRole) // Vérifie que c'est soit 'admin', soit 'user'
  role: UserRole

  @IsArray()
  @IsString({ each: true }) // Vérifie que c'est un tableau de strings
  hobbies: string[]

  // CAS AVANCÉ : GéoJSON ou Objet imbriqué
  @IsObject()
  @ValidateNested() // Dit à Nest de valider aussi l'objet à l'intérieur
  @Type(() => LocationDto) // Indique quel DTO utiliser pour l'objet imbriqué
  location: LocationDto
}
