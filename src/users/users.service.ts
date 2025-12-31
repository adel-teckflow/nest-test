
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; // Pour injecter le modèle
import { Model } from "mongoose"; // Le type Mongoose
import { User } from "./schemas/user.schema";  // Ton schéma (à créer à l'étape 2)
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  // 1. Injection du modèle Mongoose
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 2. Création (Production Ready : on vérifie si l'email existe déjà par exemple)
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      // Gestion d'erreur typique de MongoDB (code 11000 = duplicata)
      if (error.code === 11000) {
        throw new BadRequestException('Cet email est déjà utilisé');
      }
      throw error;
    }
  }

  // 3. Trouver tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // 4. Trouver un utilisateur (avec gestion 404)
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      // En prod, on ne laisse jamais une requête échouer silencieusement
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }
    return user;
  }

  // 5. Mise à jour (Partielle grâce au UpdateUserDto)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true }) // new: true pour renvoyer l'objet modifié
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`Impossible de modifier : Utilisateur #${id} introuvable`);
    }
    return existingUser;
  }

  // 6. Suppression
  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Impossible de supprimer : Utilisateur #${id} introuvable`);
    }
    return { deleted: true, message: `L'utilisateur #${id} a été supprimé` };
  }
}