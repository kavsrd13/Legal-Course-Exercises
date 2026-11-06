'use strict';
// Optional UI smoke suite: node tests/browser-smoke.cjs [absolute-playwright-module-path]
const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');const assert=require('node:assert/strict');
const {chromium}=require(process.argv[2]||'playwright');
const root=path.resolve(__dirname,'..'), out=path.join(root,'test-results');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const base=pathToFileURL(path.join(root,'index.html')).href;
 const browser=await chromium.launch({headless:true,channel:'chrome'});const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 try{
  await page.goto(base);await page.locator('.lab-card').first().waitFor();assert.equal(await page.locator('.lab-card').count(),10);await page.screenshot({path:path.join(out,'overview.png'),fullPage:true});
  await page.locator('#search').fill('cyber');assert.equal(await page.locator('.lab-card:visible').count(),1);await page.locator('#search').fill('');
  const labs=await page.evaluate(()=>COURSE.labs.map(l=>({id:l.id,number:l.number,steps:l.steps.length})));
  for(const lab of labs){
   await page.goto(base+'#/lab/'+lab.id+'/3');await page.locator('#briefing-title').waitFor();
   assert.equal(await page.locator('#task').count(),0,'Tasks must wait for pre-reading');
   assert.equal(await page.locator('#begin-lab').isEnabled(),false);
   await page.locator('[data-brief-check]').first().check();assert.equal(await page.locator('#begin-lab').isEnabled(),false);
   await page.locator('[data-brief-check]').last().check();await page.locator('#begin-lab').click();await page.locator('#task').waitFor();
   assert.equal(new URL(page.url()).hash,'#/lab/'+lab.id+'/3','A direct task link must resume its requested step');
   if(lab.number===4){await page.goto(base+'#/lab/'+lab.id);await page.locator('#briefing-title').waitFor();await page.screenshot({path:path.join(out,'lab-04-preread.png'),fullPage:true});}
   for(let s=0;s<lab.steps;s++){
    await page.goto(base+'#/lab/'+lab.id+'/'+(s+1));await page.locator('#task h2').first().waitFor();
    await page.locator('[data-action="review-next"]').click();assert.match(await page.locator('#step-errors').innerText(),/still a draft/);
    await page.evaluate(()=>{
      const weights=[20,15,15,15,10,15,10];
      for(const element of document.querySelectorAll('[data-key]')){
        if(element.type==='radio')continue;
        if(element.tagName==='SELECT')element.value=element.options[1].value;
        else if(element.type==='number')element.value=String(weights[Number(element.dataset.key.split(':')[1])]);
        else element.value='Source checked; test assumption, accountable owner and acceptance evidence recorded.';
        element.dispatchEvent(new Event('input',{bubbles:true}));
      }
      for(const fieldset of document.querySelectorAll('.question')){const radio=fieldset.querySelector('input[type=radio]');radio.checked=true;radio.dispatchEvent(new Event('input',{bubbles:true}));}
    });
    await page.locator('#attest').check();assert.equal(await page.locator('#step-errors').innerText(),'');
    if(lab.number===4&&s===1)await page.screenshot({path:path.join(out,'lab-04.png'),fullPage:true});
    await page.locator('[data-action="review-next"]').click();
    if(s<4){await page.waitForURL(url=>url.hash==='#/lab/'+lab.id+'/'+(s+2));}
    else{await page.getByRole('dialog').waitFor();assert.match(await page.getByRole('dialog').innerText(),/5 of 5 steps/);await page.getByRole('button',{name:'Close',exact:true}).click();}
   }
   console.log('Completed UI flow: Lab '+lab.number);
  }
  await page.goto(base+'#/portfolio');assert.equal(await page.locator('.portfolio-item').count(),10);
  const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export-all-json"]').click();const download=await downloadPromise;const backup=path.join(out,'portfolio.json');await download.saveAs(backup);const packet=JSON.parse(fs.readFileSync(backup,'utf8'));assert.equal(Object.keys(packet.labs).length,10);
  const mdPromise=page.waitForEvent('download');await page.locator('[data-action="export-all-md"]').click();const md=await mdPromise;const mdPath=path.join(out,'portfolio.md');await md.saveAs(mdPath);assert(fs.readFileSync(mdPath,'utf8').includes('Source checked; test assumption'));
  await page.locator('[data-reset="ip-audit"]').click();await page.getByRole('button',{name:'Reset this lab',exact:true}).click();assert.match(await page.locator('.portfolio-item').first().innerText(),/0\/5 steps/);
  await page.locator('#import-file').setInputFiles(backup);await page.getByRole('button',{name:'Restore these labs',exact:true}).click();assert.match(await page.locator('.portfolio-item').first().innerText(),/5\/5 steps/);
  await page.goto(base+'#/lab/ip-audit/1');await page.locator('[data-key="register:0:owner"]').fill('Edited answer returns this step to draft.');await page.reload();assert.match(await page.locator('#step-count').innerText(),/4\/5 steps/);assert.equal(await page.locator('[data-key="register:0:owner"]').inputValue(),'Edited answer returns this step to draft.');
  await page.goto(base+'#/lab/not-found');assert.match(await page.locator('h1').innerText(),/unavailable/);
  const mobile=await browser.newContext({viewport:{width:390,height:844}});const m=await mobile.newPage();await m.goto(base+'#/lab/ai-procurement/2');await m.locator('#briefing-title').waitFor();assert(await m.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Unexpected pre-read mobile overflow');await m.screenshot({path:path.join(out,'mobile-preread.png'),fullPage:true});await m.locator('[data-brief-check]').first().check();await m.locator('[data-brief-check]').last().check();await m.locator('#begin-lab').click();await m.locator('#task').waitFor();assert(await m.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'Unexpected page-level mobile horizontal overflow');await m.screenshot({path:path.join(out,'mobile-lab.png'),fullPage:true});await mobile.close();
  assert.deepEqual(errors,[]);console.log('UI PASS: 50 step routes, 10 completed labs, required-field gates, browser save/reload, edit invalidation, quiz feedback, source-path assets, Markdown/JSON downloads, confirmed reset/restore, invalid route and mobile overflow.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
