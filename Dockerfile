# Use Node.js 21 as the base image
FROM node:21

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# Sequelize CLI 글로벌 설치 (필요하면 제거 가능)
RUN npm install -g sequelize-cli

# 포트 노출
EXPOSE 4000

# 앱 실행 (마이그레이션 후 실행)
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]