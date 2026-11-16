// Secure backend for UPI Safety Coach ChatGPT-powered help.
// Requires Node.js 18+ and an OpenAI API key stored in .env (never in browser code).
const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const root = __dirname;
try { require('dotenv').config({ path: path.join(root, '.env') }); } catch (_) {}
const PORT = Number(process.env.PORT || 3000);
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const langs = {en:'English',te:'Telugu',ta:'Tamil',kn:'Kannada',ml:'Malayalam'};
function json(res, code, body) { res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(body)); }
function readBody(req) { return new Promise((resolve,reject)=>{let body='';req.on('data',chunk=>{body+=chunk;if(body.length>12000){reject(new Error('too large'));req.destroy();}});req.on('end',()=>resolve(body));req.on('error',reject);}); }
async function chat(req,res) {
 if(!process.env.OPENAI_API_KEY) return json(res,503,{error:'AI server is not configured. Add OPENAI_API_KEY to .env.'});
 let data; try { data=JSON.parse(await readBody(req)); } catch { return json(res,400,{error:'Invalid request'}); }
 const message=String(data.message||'').trim().slice(0,500); const language=langs[data.language]||'English';
 if(!message) return json(res,400,{error:'Message is required'});
 // Basic server-side privacy filter; users should still never enter secrets.
 const digits=message.replace(/\D/g,'');
 if(/\b(pin|otp|password|cvv|account number|card number)\s*(is|:)?\s*\w+/i.test(message)||/^\d{4,8}$/.test(message)||(digits.length>=12&&digits.length<=19)) return json(res,200,{reply: language==='Telugu'?'దయచేసి PIN, OTP, పాస్‌వర్డ్ లేదా బ్యాంక్ వివరాలు పంపవద్దు. సాధారణ పరిస్థితిని మాత్రమే వివరించండి.':'Please do not share PINs, OTPs, passwords, card numbers or bank account details. Describe only the general situation.'});
 const payload=JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',store:false,messages:[
  {role:'system',content:`You are UPI Safety Coach, an educational digital-payment safety assistant for users in India. Respond in ${language}. Use clear, age-appropriate language. Explain warning signs and safe next steps; never ask for or repeat secrets. Never request a UPI PIN, OTP, password, card number, CVV, bank account number, or remote access. Do not claim you can inspect transactions or file reports. If the user says money was lost, advise contacting their bank/payment app immediately and calling India's 1930 cyber-fraud helpline; mention https://cybercrime.gov.in/. If uncertain, say so and suggest checking through official channels. Keep answers concise, practical, and non-alarmist. Do not present guesses as confirmed fraud.`},
  {role:'user',content:message}
 ]});
 const options={hostname:'api.openai.com',path:'/v1/chat/completions',method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)}};
 const upstream=https.request(options,apiRes=>{let raw='';apiRes.on('data',c=>raw+=c);apiRes.on('end',()=>{let parsed;try{parsed=JSON.parse(raw)}catch{return json(res,502,{error:'AI service returned an unreadable response'});}if(apiRes.statusCode<200||apiRes.statusCode>=300)return json(res,502,{error:'AI service request failed. Check API key, billing, and model access.'});const reply=parsed.choices?.[0]?.message?.content;if(!reply)return json(res,502,{error:'AI response was empty'});return json(res,200,{reply});});});
 upstream.setTimeout(30000,()=>upstream.destroy(new Error('timeout')));upstream.on('error',()=>json(res,502,{error:'Could not reach AI service'}));upstream.write(payload);upstream.end();
}
http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(req.method==='POST'&&url.pathname==='/api/chat') return chat(req,res);
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end('Method not allowed');}
 let requested=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);let file=path.resolve(root,'.'+requested);
 if(!file.startsWith(root+path.sep)&&file!==path.join(root,'index.html')){res.writeHead(403);return res.end('Forbidden');}
 if(path.basename(file)==='.env'||path.basename(file)==='server.js'||path.basename(file)==='package.json'){res.writeHead(404);return res.end('Not found');}
 fs.readFile(file,(err,buf)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:buf);});
}).listen(PORT,()=>console.log(`UPI Safety Coach running at http://localhost:${PORT}`));
