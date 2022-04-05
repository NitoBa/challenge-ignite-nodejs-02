import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    if (!user_id) {
      return response.status(400).json({
        message: "Missing id in params",
      });
    }

    try {
      const user = this.turnUserAdminUseCase.execute({ user_id });

      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({
        error: error.message || "Unexpected error.",
      });
    }
  }
}

export { TurnUserAdminController };
