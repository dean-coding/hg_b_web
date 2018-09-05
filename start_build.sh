npm run build
if [ $? != "0" ]; 
then
    echo '⚠️ : build failed!!!'
    exit;
else
    echo '开始部署'
    ## 你的服务器地址:/你要存储的静态资源路径
    scp -r ./dist/* root@you.server:/usr/share/nginx/demoweb
fi
