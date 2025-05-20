# Nexon Reward Requests

## RequestReward

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto reward-requests.proto \
  -d '{
    "userId": "USER_ID_HERE",
    "eventId": "EVENT_ID_HERE",
    "rewardId": "REWARD_ID_HERE"
  }' \
  localhost:30002 rewardrequests.RewardRequestsService/RequestReward
```

## GetMyRewardRequests

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto reward-requests.proto \
  -d '{
    "userId": "682ae777ae40d140c2ba51a8"
  }' \
  localhost:30002 rewardrequests.RewardRequestsService/GetMyRewardRequests
```

## GetAllRewardRequests

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto reward-requests.proto \
  -d '{
    "page": 1,
    "limit": 10
  }' \
  localhost:30002 rewardrequests.RewardRequestsService/GetAllRewardRequests
```

## GetRewardRequestById

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto reward-requests.proto \
  -d '{
    "id": "682b6c5b2beea72de0bc4902"
  }' \
  localhost:30002 rewardrequests.RewardRequestsService/GetRewardRequestById
```

## GetRewardAuditLog

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto reward-requests.proto \
  -d '{}' \
  localhost:30002 rewardrequests.RewardRequestsService/GetRewardAuditLog
```
