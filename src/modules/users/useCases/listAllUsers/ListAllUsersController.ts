import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      if (!user_id) {
        return response.status(400).json({
          message: "Missing user_id in header",
        });
      }

      const users = this.listAllUsersUseCase.execute({
        user_id: user_id as string,
      });

      return response.json(users);
    } catch (error) {
      return response.status(error.statusCode).json({
        error: error.message || "Unexpected error.",
      });
    }
  }
}

export { ListAllUsersController };
