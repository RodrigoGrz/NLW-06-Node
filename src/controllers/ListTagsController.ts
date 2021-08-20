import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {

    async handle(request: Request, response: Response) {
        const listTagsServicer = new ListTagsService();

        const tags = await listTagsServicer.execute();

        return response.json(tags);
    }
}

export { ListTagsController };