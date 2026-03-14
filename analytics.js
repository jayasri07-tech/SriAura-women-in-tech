/* ---- ANALYTICS ---- */
function renderAnalytics() {
  const ms=DB.get('mentors'),sts=DB.get('students');
  const mentorCounts=ms.map(m=>({name:m.name,count:sts.filter(s=>s.mentor===m.id).length})).sort((a,b)=>b.count-a.count).slice(0,3);
  const avgCGPA=(sts.reduce((a,b)=>a+b.cgpa,0)/Math.max(sts.length,1)).toFixed(1);
  const diff=(parseFloat(avgCGPA)-7.5).toFixed(1);

  document.getElementById('page-analytics').innerHTML=`<h2 style="margin-bottom:20px">📈 Analytics</h2>
    <div class="grid-2">
      <div class="card"><h3>📊 CGPA by Branch</h3><canvas id="barChart" height="250"></canvas></div>
      <div class="card"><h3>📈 Monthly Achievements</h3><canvas id="lineChart" height="250"></canvas></div>
    </div>
    <div class="grid-3" style="margin-top:20px">
      <div class="card"><h3>🔧 Top Skills</h3><canvas id="pieChart" height="250"></canvas></div>
      <div class="card" style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:30px">
        <h3 style="margin-bottom:15px">💪 Girls vs National Average</h3>
        <div style="font-size:3rem;font-family:Syne;font-weight:800;background:linear-gradient(135deg,var(--rose),var(--violet2));-webkit-background-clip:text;-webkit-text-fill-color:transparent" data-count="${avgCGPA}">0</div>
        <p style="color:var(--text2);margin:5px 0">SriAura Students Avg CGPA</p>
        <div style="font-size:1.5rem;color:var(--text2);margin-top:10px">vs <strong style="color:var(--text)">7.5</strong> National Avg</div>
        <p style="color:var(--green);margin-top:10px;font-weight:600">✨ Our girls outperform by ${diff} points!</p>
      </div>
      <div class="card">
        <h3>🏆 Top Mentors</h3>
        <p style="color:var(--text2);font-size:0.85rem;margin-bottom:15px">Mentors with most assigned students</p>
        ${mentorCounts.map((m,i)=>`<div class="feed-item"><span style="font-size:1.2rem;width:25px">${['🥇','🥈','🥉'][i]||'👑'}</span> <div style="flex:1"><strong>${m.name}</strong></div> <span class="badge badge-violet">${m.count} students</span></div>`).join('')}
      </div>
    </div>`;
  document.querySelectorAll('#page-analytics [data-count]').forEach(el=>countUp(el,parseFloat(el.dataset.count)));
  setTimeout(()=>{drawBarChart();drawLineChart();drawPieChart()},100);
}

function drawBarChart() {
  const c=document.getElementById('barChart');if(!c)return;const ctx=c.getContext('2d');
  c.width=c.parentElement.clientWidth-40;c.height=250;
  const sts=DB.get('students'),branches=['CSE','IT','ENTC','Mech'];
  const data=branches.map(b=>{const bs=sts.filter(s=>s.branch===b);return bs.length?bs.reduce((a,s)=>a+s.cgpa,0)/bs.length:0});
  const max=10,bw=40,gap=30,startX=60,startY=220;
  const colors=['#7c3aed','#e8a87c','#10b981','#3b82f6'];
  ctx.fillStyle=getComputedStyle(document.body).color;ctx.font='12px DM Sans';
  for(let i=0;i<=5;i++){const y=startY-i*(startY-30)/5;ctx.fillStyle='#334155';ctx.fillRect(startX,y,c.width-80,1);ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text2');ctx.fillText((i*2).toFixed(0),30,y+4)}
  data.forEach((v,i)=>{const x=startX+i*(bw+gap)+gap;const h=(v/max)*(startY-30);
    const grd=ctx.createLinearGradient(x,startY-h,x,startY);grd.addColorStop(0,colors[i]);grd.addColorStop(1,colors[i]+'44');
    ctx.fillStyle=grd;ctx.beginPath();ctx.roundRect(x,startY-h,bw,h,4);ctx.fill();
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text');ctx.font='11px DM Sans';ctx.fillText(branches[i],x,startY+16);
    ctx.fillStyle=colors[i];ctx.font='bold 12px Syne';ctx.fillText(v.toFixed(1),x+4,startY-h-8)});
}

function drawLineChart() {
  const c=document.getElementById('lineChart');if(!c)return;const ctx=c.getContext('2d');
  c.width=c.parentElement.clientWidth-40;c.height=250;
  const achs=DB.get('achievements'),months=[];const now=new Date();
  for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);months.push({label:d.toLocaleString('default',{month:'short'}),count:achs.filter(a=>{const ad=new Date(a.date);return ad.getMonth()===d.getMonth()&&ad.getFullYear()===d.getFullYear()}).length})}
  const max=Math.max(...months.map(m=>m.count),1),startX=60,startY=210,w=c.width-100;
  ctx.strokeStyle='#7c3aed';ctx.lineWidth=3;ctx.beginPath();
  months.forEach((m,i)=>{const x=startX+i*(w/5);const y=startY-(m.count/max)*(startY-40);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.stroke();
  ctx.lineTo(startX+5*(w/5),startY);ctx.lineTo(startX,startY);ctx.closePath();
  const grd=ctx.createLinearGradient(0,40,0,startY);grd.addColorStop(0,'rgba(124,58,237,0.3)');grd.addColorStop(1,'rgba(124,58,237,0)');ctx.fillStyle=grd;ctx.fill();
  months.forEach((m,i)=>{const x=startX+i*(w/5);const y=startY-(m.count/max)*(startY-40);
    ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle='#7c3aed';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text2');ctx.font='11px DM Sans';ctx.fillText(m.label,x-12,startY+20);
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text');ctx.font='bold 11px Syne';ctx.fillText(m.count,x-4,y-12)});
}

function drawPieChart() {
  const c=document.getElementById('pieChart');if(!c)return;const ctx=c.getContext('2d');
  c.width=c.parentElement.clientWidth-40;c.height=250;
  const sts=DB.get('students'),skillMap={};
  sts.forEach(s=>(s.skills||[]).forEach(sk=>skillMap[sk]=(skillMap[sk]||0)+1));
  const sorted=Object.entries(skillMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const total=sorted.reduce((a,b)=>a+b[1],0);
  const colors=['#7c3aed','#e8a87c','#10b981','#3b82f6','#f43f5e'];
  const cx=c.width/2-60,cy=125,r=90;let angle=-Math.PI/2;
  sorted.forEach(([sk,cnt],i)=>{const slice=cnt/total*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,angle,angle+slice);ctx.closePath();ctx.fillStyle=colors[i];ctx.fill();angle+=slice});
  ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--card');ctx.fill();
  sorted.forEach(([sk,cnt],i)=>{const lx=c.width-130,ly=40+i*28;
    ctx.fillStyle=colors[i];ctx.fillRect(lx,ly,12,12);
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text');ctx.font='12px DM Sans';ctx.fillText(`${sk} (${cnt})`,lx+18,ly+10)});
}
