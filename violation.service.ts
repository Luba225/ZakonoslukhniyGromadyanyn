import { injectable } from "inversify";
import { ViolationRepository } from "../repositories/violation.repository";
import { inject } from "inversify";
import { TYPES } from "../types";

@injectable()
export class ViolationService {
  constructor(
    @inject(TYPES.ViolationRepository) private violationRepo: ViolationRepository
  ) {}

  async create(data: any) {
    return this.violationRepo.create(data);
  }

  async findAll() {
    return this.violationRepo.findAll();
  }
}
