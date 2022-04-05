import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    if (!user_id) {
      return response.status(400).json({
        message: "Missing id in params",
      });
    }

    try {
      const user = this.showUserProfileUseCase.execute({ user_id });

      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({
        error: error.message || "Unexpected error.",
      });
    }
  }
}

export { ShowUserProfileController };
