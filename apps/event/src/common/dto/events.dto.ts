export class RegisterEventRequestDto {
  title: string;
  description?: string;
}

export class RegisterEventResponseDto {
  eventId: string;
  title: string;
}
