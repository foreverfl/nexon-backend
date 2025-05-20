# Nexon Rewards

## CreateReward

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto rewards.proto \
  -d '{
    "type": "POINT",
    "itemId": 0,
    "value": 600,
    "duration": 0,
    "description": "포인트 지급"
  }' \
  localhost:30002 rewards.RewardsService/CreateReward
```

## GetAllRewards

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto rewards.proto \
  -d '{
    "page": 1,
    "limit": 10
  }' \
  localhost:30002 rewards.RewardsService/GetAllRewards
```

## GetRewardById

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto rewards.proto \
  -d '{
    "id": "682b4e5bd5c102885a75a849"
  }' \
  localhost:30002 rewards.RewardsService/GetRewardById
```

## UpdateReward

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto rewards.proto \
  -d '{
    "id": "682b4e5bd5c102885a75a849",
    "type": "POINT",
    "itemId": 0,
    "value": 1000,
    "duration": 0,
    "description": "1000 포인트로 수정됨"
  }' \
  localhost:30002 rewards.RewardsService/UpdateReward
```

## DeleteReward

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto rewards.proto \
  -d '{
    "id": "682b4a1361303171b3768c3b"
  }' \
  localhost:30002 rewards.RewardsService/DeleteReward
```
