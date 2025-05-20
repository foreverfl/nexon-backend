# Nexon Auth

## Register

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"email": "test01@example.com", "password": "1234", "role": "USER"}' \
  localhost:30001 auth.AuthService/Register
```

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"email": "test02@example.com", "password": "1234", "role": "AUDITOR"}' \
  localhost:30001 auth.AuthService/Register
```

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"email": "test03@example.com", "password": "1234", "role": "ADMIN"}' \
  localhost:30001 auth.AuthService/Register
```

## Login

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"email": "test01@example.com", "password": "1234"}' \
  localhost:30001 auth.AuthService/Login
```

## Logout

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"accessToken": "123"}' \
  localhost:30001 auth.AuthService/Logout
```

## RefreshToken

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI5N2M0NWE0NDhmNzAzODZmY2JjYjgiLCJpYXQiOjE3NDc1NDkyNjgsImV4cCI6MTc0ODE1NDA2OH0.5PDQSinL13YZCihNxesF60J6apx2jNyKPKdb2tH773Y"}' \
  localhost:30001 auth.AuthService/RefreshToken
```

## Validate

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI5NDEzYjNiOGE0NTk2OWEzM2I0NmQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzU0MTM3OSwiZXhwIjoxNzQ3NTQyMjc5fQ.ikGj_711zeswX5WNNpxk_M2bmu_DwsggPyywdy9r9lA"}' \
  localhost:30001 auth.AuthService/Validate
```

```bash
grpcurl -plaintext \
  -import-path /home/foreverfl/workspace/web-app/nexon-backend/test/grpc \
  -proto auth.proto \
  -d '{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI5NDEzYjNiOGE0NTk2OWEzM2I0NmQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzUzOTQ0NywiZXhwIjoxNzQ3NTQwMzQ3fQ.eNhSVwA0khN0zFJgnHuYmBz72SjNYsfiBxRH13Im84s"}' \
  localhost:30001 auth.AuthService/Validate
```
