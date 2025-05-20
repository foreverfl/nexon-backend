import { Injectable } from "@nestjs/common";

@Injectable()
export class RewardRequestsService {
  test() {
    return { message: "Rewards service is running 🎉" };
  }
}
