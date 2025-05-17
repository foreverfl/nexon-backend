# 넥슨 백엔드 채용 과제

## 🐳 실행 명령어 (Docker)

### 1. 컨테이너 빌드 및 실행

```bash
docker compose up --build
```

### 2. 캐시 없이 강제 재빌드

```bash
docker compose build --no-cache
```

### 3. 백그라운드(Detached) 실행

```bash
docker compose up -d
```

### 4. 컨테이너 상태 확인

```bash
docker compose ps
```

### 5. 컨테이너 중지

```bash
docker compose down
```

### 6. 특정 서비스만 실행 (예: auth)

```bash
docker compose up auth
```

### 7. 컨테이너 + 네트워크 삭제

```bash
docker compose down 
```

### 8. 컨테이너 + 네트워크 + 볼륨 삭제

```bash
docker compose down -v
```

### 9. 컨테이너 + 네트워크 + 볼륨 + 이미지 삭제

```bash
docker compose down -v --rmi all
```

### 10. 컨테이너 로그 확인

```bash
docker compose logs -f
```

### 캐시 전부 삭제

```bash
docker builder prune --all --force
docker system prune -a --volumes --force
```

## 패키지 설치 (npm 기준)

기존에는 `pnpm`을 통해 패키지를 설치했지만, 다른 언어로 된 프레임워크(go, rust 등)와의 호환성 문제로 인해 `npm`으로 변경했습니다.

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Nest 앱 생성 (하위)

```bash
pnpm dlx nest generate app gateway
```

### 3. 개발 서버 실행

```bash
pnpm --filter gateway run start:dev
```

### 4. 빌드

```bash
pnpm --filter gateway run build
```
