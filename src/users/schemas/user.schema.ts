import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import * as bcrypt from "bcrypt"

// On définit les rôles possibles pour plus de sécurité
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Schema({ timestamps: true }) // timestamps: true ajoute createdAt et updatedAt automatiquement
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true })
  username: string

  @Prop({ required: true, unique: true, lowercase: true })
  email: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  password: string

  @Prop()
  idCardReference: string

  @Prop({ required: false })
  avatarUrl: string

  @Prop({ required: false })
  birthDate: string

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Prop([String]) // Tableau de chaînes de caractères
  hobbies: string[]

  // Pour la localisation, on stocke un objet
  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    _id: false, // On n'a pas besoin d'un ID interne pour cet objet
  })
  location: {
    lat: number
    lng: number
  }
}

//  hasher le mot de passe avant de sauvegarder

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre("save", async function (next: (err?: Error) => void) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
