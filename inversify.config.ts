import { Container } from "inversify";
import { TYPES } from "./types";

import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";

import { ViolationService } from "./services/violation.service";
import { ViolationController } from "./controllers/violation.controller";
import { ViolationRepository } from "./repositories/violation.repository";

const container = new Container();

// User
container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

// Violation
container.bind<ViolationController>(TYPES.ViolationController).to(ViolationController).inSingletonScope();
container.bind<ViolationService>(TYPES.ViolationService).to(ViolationService).inSingletonScope();
container.bind<ViolationRepository>(TYPES.ViolationRepository).to(ViolationRepository).inSingletonScope();

export { container };
