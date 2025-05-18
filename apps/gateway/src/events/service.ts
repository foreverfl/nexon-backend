import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
  test() {
    return { message: "Events service is running 🎉" };
  }
}
