import { Context } from "koa";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ViolationService } from "../services/violation.service";

@injectable()
export class ViolationController {
  constructor(
    @inject(TYPES.ViolationService) private violationService: ViolationService
  ) {}

  async create(ctx: Context) {
    const violation = await this.violationService.create(ctx.request.body);
    ctx.body = violation;
    ctx.status = 201;
  }

  async findAll(ctx: Context) {
    ctx.body = await this.violationService.findAll();
  }
}
