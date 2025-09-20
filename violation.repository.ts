import { injectable } from "inversify";
import { ViolationModel, ViolationDocument } from "../models/violation.schema";

@injectable()
export class ViolationRepository {
  async create(data: Partial<ViolationDocument>) {
    const violation = new ViolationModel(data);
    return violation.save();
  }

  async findAll() {
    return ViolationModel.find({}, { __v: 0 }).exec();
  }
}
