import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    try {
      if (!name || !email) {
        return response.status(400).json({
          message: "Missing name or email",
        });
      }

      const user = this.createUserUseCase.execute({ name, email });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(error.statusCode).json({
        error: error.message || "Unexpected error.",
      });
    }
  }
}

export { CreateUserController };
