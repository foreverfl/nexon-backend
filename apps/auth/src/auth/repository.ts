import { UserDocument } from "@/common/schema/user.schema";

export const AuthRepository = Symbol("AuthRepository");

export interface AuthRepository {
  findByEmail(email: string): Promise<UserDocument | null>;
  save(user: Partial<UserDocument>): Promise<UserDocument>;
}
