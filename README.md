
# 1.Dockerfile

``` python
    FROM nginx:1.13
    COPY ./dist /usr/share/nginx/html
    COPY ./nginx/nginx.hg.default.conf /etc/nginx/conf.d/default.conf
```

# 2.package.json

``` python
    "scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "build:docker": "docker build . -t hg/mygirl-bweb",
    "build:start": "docker run --name=mygirl-bweb -p 1798:80 -d hg/mygirl-bweb",
    "build:dll": "webpack --config build/webpack.dll.conf.js"
    },
```

# 3.nginx/...config

``` python
    server {
      listen       80;
      server_name  localhost;

      charset utf-8;
      # access_log  /var/log/nginx/log/host.access.log  main;

      # gzip config
      gzip              on;
      gzip_min_length   1024;
      gzip_comp_level   5;
      gzip_types        text/plain text/css application/javascript;

      location / {
        root   /usr/share/nginx/html;
        index  index.html;
      }

      location ~ /api {
        rewrite /api(.*) /$1  break;
        proxy_pass          http://hgBapp:8091;
      }
    }
```

# 4.命令执行：

      npm install //安装依赖
      npm run dev //开发环境运行
      
      npm run build //打包
      npm run build:docker //创建docker镜像
      npm run build:start //创建docker容器并启动# hg_b_web

# 5.唠唠嗑🐧🐧🐧

 <image src="statis/img/qq_chat.jpeg" width="100%" height="400px"></image>

# 6.下午茶🍵,走一波

 <image src="statis/img/wx_pay.jpeg" width="100%" height="400px"></image>
