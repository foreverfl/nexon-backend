import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  DeleteEventRequestDto,
  DeleteEventResponseDto,
  GetAllEventsRequestDto,
  GetAllEventsResponseDto,
  GetEventByIdRequestDto,
  GetEventByIdResponseDto,
  UpdateEventRequestDto,
  UpdateEventResponseDto,
} from "@/events/events.dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

interface GrpcEventsServiceClient {
  CreateEvent(data: CreateEventRequestDto): Observable<CreateEventResponseDto>;
  GetAllEvents(
    data: GetAllEventsRequestDto,
  ): Observable<GetAllEventsResponseDto>;
  GetEventById(
    data: GetEventByIdRequestDto,
  ): Observable<GetEventByIdResponseDto>;
  UpdateEvent(data: UpdateEventRequestDto): Observable<UpdateEventResponseDto>;
  DeleteEvent(data: DeleteEventRequestDto): Observable<DeleteEventResponseDto>;
}

@Injectable()
export class GrpcEventsService implements OnModuleInit {
  private grpcClient: GrpcEventsServiceClient;

  constructor(@Inject("EVENTS") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcClient =
      this.client.getService<GrpcEventsServiceClient>("EventsService");
  }

  createEvent(data: CreateEventRequestDto): Promise<CreateEventResponseDto> {
    return lastValueFrom(this.grpcClient.CreateEvent(data));
  }

  getAllEvents(data: GetAllEventsRequestDto): Promise<GetAllEventsResponseDto> {
    return lastValueFrom(this.grpcClient.GetAllEvents(data));
  }

  getEventById(data: GetEventByIdRequestDto): Promise<GetEventByIdResponseDto> {
    return lastValueFrom(this.grpcClient.GetEventById(data));
  }

  updateEvent(data: UpdateEventRequestDto): Promise<UpdateEventResponseDto> {
    return lastValueFrom(this.grpcClient.UpdateEvent(data));
  }

  deleteEvent(data: DeleteEventRequestDto): Promise<DeleteEventResponseDto> {
    return lastValueFrom(this.grpcClient.DeleteEvent(data));
  }
}
