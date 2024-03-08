
// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=16516a90-c49a-400a-9671-f63defa52ca8&tag=jichang
// 部署完成后在网址后面加上这个，只获取自建节点，/?token=16516a90-c49a-400a-9671-f63defa52ca8


const mytoken = '16516a90-c49a-400a-9671-f63defa52ca8'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
const tgbottoken ='7128966030:AAFJthAvCOJS7NlDiZQZZFcBUuFzOYlK7gI'; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
const tgchatid ='916552597'; //可以为空，或者@userinfobot中获取，/start

//自建节点
const MainData = `
trojan://cafffbbd-fa7e-e3ca-d904-e768f196c6e5@japanesecat.my92.in:14478?security=tls&sni=Japanesecat.my92.in&type=tcp&headerType=none#%E6%97%A5%E6%9C%AC-%E5%A4%A7%E9%98%AA
vless://6d885d9d-79ca-4f5b-bfc2-e6130124d2b8@forever.my92.in:14478?encryption=none&flow=xtls-rprx-vision&security=tls&sni=forever.my92.in&fp=chrome&type=tcp&headerType=none&host=forever.my92.in#%E6%B4%9B%E6%9D%89%E7%9F%B6CN2GIA
trojan://a1fdb16c-e0db-4cc2-aac5-dd4c0c8715e7@uk.my92.in:14478?security=tls&sni=uk.my92.in&alpn=http%2F1.1&type=tcp&headerType=none#%E4%BC%A6%E6%95%A6
vless://ae03a8c1-084c-4080-b42d-0adf14269b46@free.my92.in:14478?encryption=none&flow=xtls-rprx-vision&security=tls&sni=free.my92.in&fp=chrome&type=tcp&headerType=none&host=free.my92.in#%E6%97%A5%E6%9C%AC-%E4%B8%9C%E4%BA%AC
`

//机场信息，可多个，也可为0
const urls = [
  'https://mareep.netlify.app/sub/shadowrocket_base64.txt',
  'https://mareep.netlify.app/sub/shadowrocket_base64.txt'
  // 添加更多订阅,支持base64
];

addEventListener('fetch', event => { event.respondWith(handleRequest(event.request)) })


async function handleRequest(request) {
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const token = url.searchParams.get('token'); // Get the token from the URL

    if (token !== mytoken) {
      //await sendMessage("#Token错误信息", request.headers.get('CF-Connecting-IP'), `Invalid Token: ${token}`);
      return new Response('Invalid token???', { status: 403 });
    }
  
    let req_data = "";
    req_data += MainData
    if (tag) {
        switch (tag) {
          case 'jichang':
            const responses = await Promise.all(urls.map(url => fetch(url)));
    
            for (const response of responses) {
              if (response.ok) {
                const content = await response.text();
                req_data += atob(content) + '\n';
              }
            }
            
            break;
    
          default:
            
            break;
      }
    } 
  
    await sendMessage("#访问信息", request.headers.get('CF-Connecting-IP'), `Tag: ${tag}`);
    //修复中文错误
    const utf8Encoder = new TextEncoder();
    const encodedData = utf8Encoder.encode(req_data);
    const base64Data = btoa(String.fromCharCode.apply(null, encodedData));
    return new Response(base64Data);
  }
  


// 代码参考：https://azhuge233.com/cloudflare-workers-%E8%BD%AC%E5%8F%91-telegram-bot-%E6%8E%A8%E9%80%81%E4%BF%A1%E6%81%AF/
async function sendMessage(type, ip, add_data = "") {
  const OPT = {
    BotToken: tgbottoken, // Telegram Bot API
    ChatID: tgchatid, // User 或者 ChatID，电报用户名
  }

  let msg = "";

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  if (response.status == 200) { // 查询 IP 来源信息，使用方法参考：https://ip-api.com/docs/api:json
    const ipInfo = await response.json();
    msg = `${type}\nIP: ${ip}\nCountry: ${ipInfo.country}\nCity: ${ipInfo.city}\n${add_data}`;
  } else {
    msg = `${type}\nIP: ${ip}\n${add_data}`;
  }

  let url = "https://api.telegram.org/";
  url += "bot" + OPT.BotToken + "/sendMessage?";
  url += "chat_id=" + OPT.ChatID + "&";
  url += "text=" + encodeURIComponent(msg);

  return fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
    }
  });
}