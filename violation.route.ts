import Router from "koa-router";
import { container } from "../inversify.config";
import { ViolationController } from "../controllers/violation.controller";
import { TYPES } from "../types";

const router = new Router({ prefix: '/violations' });
const controller = container.get<ViolationController>(TYPES.ViolationController);

router.get('/', ctx => controller.findAll(ctx));
router.post('/', ctx => controller.create(ctx));

export default router;
