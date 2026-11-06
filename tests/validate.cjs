'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const sandbox = {window:{}};
vm.createContext(sandbox);
for (const file of ['course-data.js','briefings.js','core.js']) vm.runInContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),sandbox,{filename:file});
const {COURSE:c, LabCore:core}=sandbox.window;
assert.equal(c.labs.length,10);
const ids=new Set();
for(const lab of c.labs){
  assert(!ids.has(lab.id),'Duplicate lab ID');ids.add(lab.id);
  assert.equal(lab.steps.length,5);
  assert.equal(lab.steps.reduce((n,s)=>n+s.minutes,0),lab.minutes,'Step timing must match lab time');
  assert.equal(lab.checks.length,3);
  assert(lab.documents.length>=2);
  assert(lab.sources.every(key=>c.references[key]));
  assert(lab.briefing && lab.briefing.background.length>=3,'Missing scenario pre-read for '+lab.id);
  for(const key of ['role','challenge','connection'])assert(lab.briefing[key],'Missing briefing '+key);
  for(const key of ['facts','uncertainties','outputs','terms'])assert(lab.briefing[key].length>=2,'Incomplete briefing '+key);
  const keys=core.allSpecs(lab).map(s=>s.key);
  assert.equal(new Set(keys).size,keys.length,'Duplicate answer keys in '+lab.id);
  for(const q of lab.checks)assert(q.correct>=0&&q.correct<q.choices.length);
  for(const st of lab.steps){assert(st.instructions.length);assert(st.outcome);assert(st.fields.length);}
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const target=match[1].split('?')[0];if(!/^(?:https?:|data:)/.test(target))assert(fs.existsSync(path.join(root,target)),'Missing asset '+target);
}
for(const file of ['assets/app.js','assets/core.js','assets/course-data.js','assets/briefings.js']) new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
for(const file of ['docs/LEARNER_GUIDE.md','docs/FACILITATOR_GUIDE.md','docs/LAB4_REVIEW.md','docs/SOURCES.md'])assert(fs.existsSync(path.join(root,file)),'Missing linked resource '+file);
console.log('Validated 10 labs, 50 steps, 30 questions, unique answer keys, timing, source references, local assets and JavaScript syntax.');
