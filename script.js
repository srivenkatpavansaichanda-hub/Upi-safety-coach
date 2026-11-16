const scenarios = [
 {title:"Fake refund call",keys:["refund call","fake refund","refund","refund money"],verdict:"HIGH RISK — likely a scam",level:"high",reason:"A caller may pretend to arrange a refund and pressure you to share secrets or approve a payment. A genuine refund should not require you to reveal your UPI PIN or OTP.",steps:["Do not share a PIN or OTP or approve an unexpected request.","End the call and contact the company through its official app or website.","Check your payment app directly; do not trust screenshots sent by the caller."]},
 {title:"QR code to receive money",keys:["qr code","scan qr","receive money","receive payment"],verdict:"HIGH RISK — suspicious",level:"high",reason:"Scanning a QR code and entering your UPI PIN is not needed just to receive money. A PIN entry can authorize money to be sent from your account.",steps:["Do not scan an unexpected code or enter your PIN to receive money.","Read the full payment screen before approving anything.","If money has gone out, contact your bank/payment app and report promptly."]},
 {title:"Accidental payment",keys:["accidental payment","sent by mistake","wrong payment","return money","money by mistake"],verdict:"CAUTION — verify independently",level:"caution",reason:"A stranger may claim they paid you by mistake to pressure you into sending money. A screenshot alone does not prove a payment arrived.",steps:["Check the balance and transaction history in your official app.","Do not return money based only on a screenshot or pressure.","Ask your bank/payment app how to handle an unexpected credit safely."]},
 {title:"Fake cashback or prize",keys:["cashback","prize","lottery","won a prize","reward"],verdict:"HIGH RISK — likely a scam",level:"high",reason:"Unexpected rewards that ask for an advance payment, PIN, OTP, or sensitive details are a common warning sign.",steps:["Do not pay a fee to unlock a surprise prize.","Do not share PINs, OTPs, or passwords.","Verify offers through the company's official website or app."]},
 {title:"Fake payment screenshot",keys:["fake screenshot","payment screenshot","screenshot paid","showed screenshot","payment proof"],verdict:"CAUTION — payment not verified",level:"caution",reason:"Images and messages can be edited. A screenshot does not confirm that money reached your account.",steps:["Check your own official payment app and transaction history.","Do not hand over goods or send money until payment is confirmed.","If uncertain, contact your payment provider using official support."]},
 {title:"OTP or KYC call",keys:["otp","kyc","account blocked","account will be blocked","verify account"],verdict:"HIGH RISK — likely a scam",level:"high",reason:"Scammers may impersonate bank staff and use threats about KYC or account blocking to obtain secret codes or banking details.",steps:["Never tell anyone your OTP, UPI PIN, or password.","End the call and check the bank's official app or website.","Do not install apps or open links sent by the caller."]},
 {title:"Screen-sharing app scam",keys:["screen share","screen-sharing","remote access","anydesk","quick support","install an app"],verdict:"HIGH RISK — suspicious",level:"high",reason:"Remote-access or screen-sharing tools can expose private information and let a scammer guide you into approving payments.",steps:["Do not install an app at a stranger's request or share your screen.","If you already installed one, disconnect and seek help from a trusted adult and your bank if needed.","Use only official support channels."]},
 {title:"Fake customer care",keys:["customer care","customer support","helpline number","support number"],verdict:"HIGH RISK — verify the contact",level:"high",reason:"Fake support numbers and social accounts can impersonate banks or payment apps to steal information or money.",steps:["Find the support contact inside the official app or on the official website.","Never share PINs, OTPs, or passwords with support callers.","Do not pay a stranger to unlock or fix an account."]},
 {title:"Impersonation scam",keys:["pretend to be","impersonation","relative asking","friend asking","police officer","bank employee","pretending to be"],verdict:"CAUTION — verify identity",level:"caution",reason:"A scammer may pretend to be someone you trust or an official and create urgency so you send money without checking.",steps:["Contact the person using a number you already know.","Do not rely only on a new number, profile, or forwarded message.","Ask a trusted adult for help if the request feels pressured or unusual."]},
 {title:"Fake payment link",keys:["payment link","suspicious link","click this link","login link","link to pay"],verdict:"HIGH RISK — suspicious",level:"high",reason:"A fake link may lead to a lookalike website that steals login details or asks you to authorize a payment.",steps:["Do not open unexpected links or enter credentials there.","Open your bank/payment app directly instead.","If you entered details, contact your bank through official channels promptly."]},
 {title:"Collect request scam",keys:["collect request","approve request","payment request","request money","approve payment"],verdict:"CAUTION — read before approving",level:"caution",reason:"A collect request can ask you to pay someone. Approving it without checking may send money out of your account.",steps:["Read the requester's name and amount carefully.","Reject unexpected or unfamiliar requests; never enter your PIN just to receive money.","Confirm any request with the person through a separate trusted channel."]},
 {title:"Fake electricity bill warning",keys:["electricity bill","power disconnection","electricity disconnected","bill disconnection"],verdict:"HIGH RISK — verify independently",level:"high",reason:"Threats of immediate disconnection paired with urgent payment links or unknown numbers are warning signs.",steps:["Do not use a link or number from the threatening message.","Check the bill through the provider's official app or website.","Contact the electricity provider using a verified contact."]},
 {title:"Fake online seller",keys:["online seller","seller","advance payment","deliver the product","marketplace"],verdict:"CAUTION — check the seller",level:"caution",reason:"A seller may take advance payment and disappear, or send a fake payment/collection link.",steps:["Use the marketplace's official payment and messaging system where possible.","Check seller history and avoid pressured off-platform transfers.","Never approve a collect request thinking it will pay the seller."]},
 {title:"Fake job or task offer",keys:["job offer","task offer","earn money","work from home","registration fee","deposit to earn"],verdict:"HIGH RISK — likely a scam",level:"high",reason:"A job or task offer that demands deposits, repeated top-ups, or payment to unlock earnings is a major warning sign.",steps:["Do not pay to release promised earnings.","Verify the company through independent official sources.","Discuss suspicious job offers with a trusted adult before sending money."]},
 {title:"Money-mule request",keys:["money mule","receive money and transfer","transfer it to another","use my account","receive funds"],verdict:"HIGH RISK — do not participate",level:"high",reason:"Someone may try to use your account to move money linked to fraud. This can put you and your account at risk.",steps:["Do not receive or forward money for strangers.","If money has already arrived, do not move it; contact your bank for guidance.","Keep messages and transaction records and seek help from a trusted adult."]}
];

const list = document.getElementById('scenario-list');
const messages = document.getElementById('messages');
const input = document.getElementById('user-message');
const quick = document.getElementById('quick-buttons');

function safeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function addUserMessage(text){const row=document.createElement('div');row.className='message user-message';row.innerHTML=`<div class="message-avatar">U</div><div class="bubble">${safeText(text)}</div>`;messages.appendChild(row);messages.scrollTop=messages.scrollHeight;}
function addBotHTML(html){const row=document.createElement('div');row.className='message bot-message';row.innerHTML=`<div class="message-avatar">✓</div><div class="bubble">${html}</div>`;messages.appendChild(row);messages.scrollTop=messages.scrollHeight;}
function responseFor(s){return `<span class="verdict ${s.level}">VERDICT: ${safeText(s.verdict)}</span><h4>Why this may be risky</h4><div>${safeText(s.reason)}</div><h4>What to do</h4><ul>${s.steps.map(x=>`<li>${safeText(x)}</li>`).join('')}</ul><div class="official-links"><a href="tel:1930">☎ Call 1930</a><a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">Official cybercrime portal ↗</a></div><div class="warning-inline">Never enter or share your real UPI PIN, OTP, password, or bank details in this chatbot.</div>`;}
function normalizeText(text){
 return String(text).toLowerCase()
  .replace(/[₹$]/g," ")
  .replace(/[^a-z0-9\s]/g," ")
  .replace(/\s+/g," ").trim();
}
function matchScenario(text){
 const normalized=normalizeText(text);
 if(!normalized)return null;
 const words=new Set(normalized.split(" "));
 let best=null,bestScore=0;
 for(const s of scenarios){
  let score=0;
  for(const rawKey of s.keys){
   const key=normalizeText(rawKey);
   if(!key)continue;
   if(normalized.includes(key)){score=Math.max(score,10+key.length/10);continue;}
   const keyWords=key.split(" ");
   const matched=keyWords.filter(w=>words.has(w)).length;
   if(matched===keyWords.length && keyWords.length>1) score=Math.max(score,5+keyWords.length);
   else if(keyWords.length===1 && key.length>=6 && words.has(key)) score=Math.max(score,5);
  }
  if(score>bestScore){bestScore=score;best=s;}
 }
 // Require a meaningful match instead of labeling unrelated text as a known scam.
 return bestScore>=5?best:null;
}
function looksLikeSensitiveData(text){
 const t=String(text).trim();
 const digits=t.replace(/\D/g,"");
 const asksSensitive=/(my|the|is|pin|otp|password|account number|card number|cvv|secret code)\b/i.test(t);
 const hasLongNumber=/\b\d[\d\s-]{5,}\d\b/.test(t);
 const hasCodePhrase=/(my\s+(upi\s+)?pin\s+is|otp\s+is|password\s+is|cvv\s+is|account number is)/i.test(t);
 return hasCodePhrase || (asksSensitive && hasLongNumber) || (/^\d{4,8}$/.test(t)) || (digits.length>=12 && digits.length<=19);
}
function showScenario(s){addBotHTML(responseFor(s));document.querySelectorAll('.scenario-button').forEach(b=>b.classList.toggle('active',Number(b.dataset.index)===scenarios.indexOf(s)));}
function submitText(text){const trimmed=text.trim();if(!trimmed)return;input.value='';if(looksLikeSensitiveData(trimmed)){addBotHTML(`<span class="verdict high">PRIVACY WARNING</span><div>Please do not share PINs, OTPs, passwords, card numbers, or bank account details. For your privacy, this message has not been displayed in the chat. Describe only what the other person asked you to do, without secret numbers or personal information.</div><div class="warning-inline">Never type your real PIN or OTP here.</div>`);return;}addUserMessage(trimmed);const s=matchScenario(trimmed);if(s){showScenario(s);}else{addBotHTML(`<span class="verdict caution">NOT ENOUGH INFORMATION</span><div>I couldn't confidently match that description to one of my 15 checks. This does not mean it is safe. Do not share a PIN or OTP, approve unexpected payment requests, or open suspicious links. Verify through your bank or payment app's official channel. If money was lost, call <b>1930</b> promptly and use the official portal below.</div><div class="official-links"><a href="tel:1930">☎ Call 1930</a><a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">Official cybercrime portal ↗</a></div><div class="warning-inline">Please describe only the general situation. Never enter real PINs, OTPs, passwords, or account details.</div>`);} }
scenarios.forEach((s,i)=>{const b=document.createElement('button');b.className='scenario-button';b.dataset.index=i;b.innerHTML=`<span class="number">${String(i+1).padStart(2,'0')}</span><span>${safeText(s.title)}</span>`;b.addEventListener('click',()=>showScenario(s));list.appendChild(b);});
[0,1,5,7,9,13].forEach(i=>{const b=document.createElement('button');b.className='quick-button';b.textContent=scenarios[i].title;b.addEventListener('click',()=>showScenario(scenarios[i]));quick.appendChild(b);});
document.getElementById('chat-form').addEventListener('submit',e=>{e.preventDefault();if(window.getChatMode&&window.getChatMode()==='ai'){window.sendAIMessage(input.value);}else{submitText(input.value);}});
document.getElementById('reset-chat').addEventListener('click',()=>{messages.innerHTML='<div class="message bot-message"><div class="message-avatar">✓</div><div class="bubble"><b>Namaste! Welcome to UPI Safety Coach.</b><br>Tell me what happened, or select a situation from the list. I’ll explain possible warning signs and safe next steps.<div class="warning-inline">🔒 Never type your real PIN or OTP here.</div></div></div>';input.value='';document.querySelectorAll('.scenario-button').forEach(b=>b.classList.remove('active'));});

function drawPoster(){
 const c=document.getElementById('poster-canvas'),ctx=c.getContext('2d'),w=c.width,h=c.height;
 const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,'#103fae');grad.addColorStop(1,'#1474e8');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
 ctx.fillStyle='rgba(255,255,255,.07)';for(let x=0;x<w;x+=90)for(let y=0;y<h;y+=90){ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='#fff';ctx.font='800 31px Arial';ctx.fillText('UPI SAFETY COACH',70,88);
 ctx.font='800 67px Arial';ctx.fillText('PAUSE. CHECK.',65,190);ctx.fillText('PAY SAFELY.',65,270);
 ctx.font='500 27px Arial';ctx.fillStyle='#dceaff';ctx.fillText('మీ UPI చెల్లింపులను సురక్షితంగా ఉంచుకోండి',70,324);
 ctx.fillStyle='#fff';roundRect(ctx,55,365,970,660,28);ctx.fill();
 const rules=[
  ['01','NEVER SHARE YOUR PIN OR OTP','మీ PIN లేదా OTP ఎవరితోనూ పంచుకోవద్దు'],
  ['02','PIN IS NOT NEEDED TO RECEIVE MONEY','డబ్బు పొందడానికి సాధారణంగా PIN అవసరం లేదు'],
  ['03','CHECK QR CODES AND REQUESTS','QR కోడ్‌లు, చెల్లింపు అభ్యర్థనలను జాగ్రత్తగా చూడండి'],
  ['04','VERIFY CALLERS THROUGH OFFICIAL CHANNELS','అధికారిక మార్గాల ద్వారా కాల్ చేసినవారిని నిర్ధారించండి'],
  ['05','PAUSE IF SOMEONE RUSHES YOU','ఎవరైనా తొందరపెడితే ఆగి ఆలోచించండి']
 ];
 let y=430;rules.forEach((r,i)=>{ctx.fillStyle='#eaf1ff';roundRect(ctx,80,y-27,68,68,17);ctx.fill();ctx.fillStyle='#1553c5';ctx.font='800 25px Arial';ctx.fillText(r[0],96,y+16);ctx.fillStyle='#142544';ctx.font='800 25px Arial';ctx.fillText(r[1],175,y-1);ctx.fillStyle='#64738b';ctx.font='500 20px Arial';ctx.fillText(r[2],175,y+31);if(i<rules.length-1){ctx.strokeStyle='#e7edf6';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(80,y+56);ctx.lineTo(995,y+56);ctx.stroke();}y+=125;});
 ctx.fillStyle='#ffeded';roundRect(ctx,55,1060,970,175,24);ctx.fill();
 ctx.fillStyle='#b62635';ctx.font='800 33px Arial';ctx.fillText('LOST MONEY? CALL 1930',85,1115);
 ctx.font='700 26px Arial';ctx.fillText('Report at cybercrime.gov.in',85,1160);
 ctx.fillStyle='#733c45';ctx.font='500 19px Arial';ctx.fillText('Never enter your real PIN or OTP in a chatbot.',85,1202);
 ctx.fillStyle='#dceaff';ctx.font='500 17px Arial';ctx.fillText('Awareness prototype · Not an official government service',70,1295);
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
drawPoster();
document.getElementById('download-poster').addEventListener('click',()=>{const a=document.createElement('a');a.download='upi-safety-coach-poster.png';a.href=document.getElementById('poster-canvas').toDataURL('image/png');a.click();});

document.getElementById('test-all').addEventListener('click',()=>{
 const missing=scenarios.filter(s=>!s.title||!s.reason||!s.steps||s.steps.length<2||!s.verdict);
 if(missing.length===0){
  addBotHTML(`<div class="test-summary">✓ Built-in content check passed: all ${scenarios.length} scenarios have a title, verdict, explanation and next steps.</div><div>This checks that the prototype has a reply for each built-in scenario. It does not prove a real-world message is a scam or verify advice against live bank systems. Please review the wording with a teacher or parent and official sources.</div>`);
 }else{
  addBotHTML(`<span class="verdict high">TEST NEEDS ATTENTION</span><div>${missing.length} scenario(s) need a reply review: ${missing.map(s=>safeText(s.title||'Untitled')).join(', ')}.</div>`);
 }
});
