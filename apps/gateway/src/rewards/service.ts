import { Injectable } from "@nestjs/common";

@Injectable()
export class RewardsService {
  test() {
    return { message: "Rewards service is running 🎉" };
  }
}
