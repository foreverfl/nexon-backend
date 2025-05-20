# Nexon Event

## CreateEvent

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto events.proto \
  -d '{
    "title": "냥이 이벤트",
    "description": "냥이 인증하면 500포인트 지급",
    "startDate": "2025-05-20T00:00:00Z",
    "endDate": "2025-05-30T23:59:59Z",
    "isActive": true,
    "tags": ["출석", "포인트"],
    "createdBy": "operator001",
    "minLevel": 10,
    "region": ["KR", "JP"],
    "worldType": "리부트",
    "platform": "PC방",
    "rewardIds": ["665cfd32ad4e8b2fcd123456", "665cfd32ad4e8b2fcd654321"]
  }' \
  localhost:30002 events.EventsService/CreateEvent
```

## GetAllEvents

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto events.proto \
  -d '{"id": "682b178b677dc9f38ebb0d81"}' \
  localhost:30002 events.EventsService/GetEventById
```

## GetEventById

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto events.proto \
  -d '{"id": "682b178b677dc9f38ebb0d81"}' \
  localhost:30002 events.EventsService/GetEventById
```

## UpdateEvent

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto events.proto \
  -d '{
    "id": "682b178b677dc9f38ebb0d81",
    "title": "냥냥냥냥",
    "description": "졸려",
    "startDate": "2025-05-21T00:00:00Z",
    "endDate": "2025-06-01T23:59:59Z",
    "isActive": true,
    "tags": ["출석", "수정됨"],
    "createdBy": "operator001",
    "minLevel": 20,
    "region": ["KR"],
    "worldType": "일반",
    "platform": "일반",
    "rewardIds": ["665cfd32ad4e8b2fcd777777", "665cfd32ad4e8b2fcd888888"]
  }' \
  localhost:30002 events.EventsService/UpdateEvent
```

## DeleteEvent

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto events.proto \
  -d '{"id": "682b22eb70508fc96a13763a"}' \
  localhost:30002 events.EventsService/DeleteEvent
```
