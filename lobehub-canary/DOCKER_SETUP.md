# AetherHub Docker 环境搭建指南

## 步骤 1：安装 WSL2（需管理员权限）

以**管理员身份**打开 PowerShell 或 CMD，运行：

```powershell
wsl --install
```

完成后**重启电脑**。

## 步骤 2：安装 Docker Desktop

重启后，ly 会帮你自动安装 Docker Desktop。

## 步骤 3：启动 AetherHub 服务

```bash
cd D:/Download/lobehub-full/lobehub-canary/docker-compose/dev
docker-compose up -d
```

这会启动：
- PostgreSQL (端口 5432)
- Redis (端口 6379)
- RustFS S3 兼容存储 (端口 9000)

## 步骤 4：配置 .env

ly 会帮你配置 DATABASE_URL 等连接信息。

## 步骤 5：启动开发服务器

```bash
cd D:/Download/lobehub-full/lobehub-canary
pnpm dev
```

访问 http://localhost:3010
