import { Injectable } from "@nestjs/common";

@Injectable()
export class RewardsRequestsService {
  test() {
    return { message: "Rewards service is running 🎉" };
  }
}
