# Shadowrocket 免流规则配置

## 免流基本配置

1、复制此处的 [shadowrocket](https://github.com/to371/Shadowrocket/blob/main/%E5%85%8D%E6%B5%81%E5%9B%BD%E5%86%85%E5%A4%96%E5%88%86%E6%B5%81%E8%A7%84%E5%88%99.conf) 里的配置文件，形成`.conf`文件，导入小火箭配置中。

2、找到配置，点击最右侧的感叹号。点击https解密。开启（会让你下载描述文件，下载完毕后记得去，设置-关于本机-证书信任设置里把开关打开，重新打开小火箭，找到http解密，打开开关，再点击右上方的的勾。）

3、找到主页-全局路由-分组-添加分组，分组名称是：`免流点`，然后选择可用的国内节点即可，点击完成。此处的`免流点`根据规定进行国内分流，其他的都走代理。）

4、在配置里选择配置文件，使用配置文件，然后全局路由里选择配置即可，可以去：ip111.cn去测试是否分流成功。

## 联通钉钉卡流量监控

联通流量监控脚本GitHub项目地址：https://github.com/xream/scripts/tree/main

1、安装 BoxJs：https://docs.boxjs.app 根据页面提示选择对应软件的进行安装

2、访问：http://boxjs.com/

3、添加订阅：https://raw.githubusercontent.com/xream/scripts/main/boxjs/boxjs.json

4、点击底栏应用，展开菜单，选`v3`

5、按照提示进行下一步操作

详细操作指引:
- 输入`手机号码`，保存
- 执行`发送验证码`，填入保存
- 执行`用验证码登陆`，点击`刷新`，设置密码，保存
- 执行`手动执行`，查询流量

`快速到家`：http://boxjs.com/#/app/xream.10010v3

6、Shadowrocket 将以下内容加入配置文件中，其他软件参考项目地址：https://github.com/xream/scripts/tree/main/surge/modules/10010v3
```
[MITM]
hostname = 10010.json
[Script]
联通余量(v3)接口 = type=http-request,pattern=^https?:\/\/10010\.json,script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/10010v3/10010.js,requires-body=true,max-size=0,timeout=30
联通余量(v3) = type=cron,cronexp=*/5 * * * *,timeout=30,script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/10010v3/10010.js
```
7、回到配置文件中，点击`！`，点开脚本，点击以上两条脚本就会运行显示检测流量内容。
