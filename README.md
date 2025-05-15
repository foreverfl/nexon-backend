# 넥슨 백엔드 채용 과제

## 🐳 실행 명령어 (Docker)

### 1. 컨테이너 빌드 및 실행

```bash
docker compose up --build
```

### 2. 백그라운드(Detached) 실행

```bash
docker compose up -d
```

### 3. 컨테이너 상태 확인

```bash
docker compose ps
```

### 4. 컨테이너 중지

```bash
docker compose down
```

### 5. 캐시 없이 강제 재빌드

```bash
docker compose build --no-cache
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

## 🛠️ 개발 환경 명령어 (NestJS 기준)

각 서비스 디렉토리에서:

```bash
pnpm dev             # 또는
pnpm start:dev
```

루트에서 특정 서비스만 필터 실행:

```bash
pnpm --filter auth dev
```

---

## 📦 패키지 설치 (pnpm 기준)

루트 기준으로 한 번에:

```bash
pnpm install
```
