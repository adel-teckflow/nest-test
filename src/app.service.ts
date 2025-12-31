import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!"
  }
  getGoodbye(index?: number): string {
    const messages = ["Goodbye World!", "goodBye 2"]

    // Si index est null ou undefined, on prend 1.
    // Si index est 0, on garde 0 ! (C'est ça la magie du ??)
    const targetIndex = index ?? 1

    return messages[targetIndex] || "Index out of bounds"
  }
}
