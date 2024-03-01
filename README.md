# oj-frontend

## 根据后端接口文档生成代码
### 单机服务版
```shell
npm install openapi-typescript-codegen --save-dev
openapi --input http://localhost:8101/api/v2/api-docs --output ./generated --client axios
```
### 微服务版本
```shell
openapi --input http://test.kbws.xyz/api/user/v2/api-docs --output ./backend/user --client axios
openapi --input http://test.kbws.xyz/api/file/v2/api-docs --output ./backend/file --client axios
openapi --input http://test.kbws.xyz/api/question/v2/api-docs --output ./backend/question --client axios
openapi --input http://test.kbws.xyz/api/judge/v2/api-docs --output ./backend/judge --client axios
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
