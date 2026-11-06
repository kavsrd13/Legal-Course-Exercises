(function (root) {
  'use strict';
  const criteria = ['Legal fit', 'Security', 'Privacy', 'Integration', 'Usability', 'Exit / portability', 'Cost / value'];
  function specs(field) {
    if (field.type === 'table') return field.rows.flatMap((row, i) => field.columns.filter(c => c.type !== 'fixed').map(c => ({ key: field.id + ':' + i + ':' + c.key, label: field.label + ' / row ' + (i + 1) + ' / ' + c.label, type: c.type, choices: c.type === 'score' ? ['1','2','3','4','5'] : c.choices })));
    if (field.type === 'vendors') return criteria.flatMap((name, i) => [
      {key: field.id + ':' + i + ':weight', label: name + ' weight', type: 'weight'},
      ...['A','B','C'].map(v => ({key: field.id + ':' + i + ':' + v, label: name + ' / vendor ' + v, type: 'score', choices: ['1','2','3','4','5']})),
      {key: field.id + ':' + i + ':note', label: name + ' evidence / uncertainty', type: 'text'}
    ]).concat(['A','B','C'].flatMap(v => [
      {key: field.id + ':gate:' + v, label: 'Vendor ' + v + ' approval gate', type:'select', choices:['Pass — evidence confirmed','Conditional — evidence outstanding','Fail — blocker']},
      {key: field.id + ':reason:' + v, label: 'Vendor ' + v + ' gate evidence', type:'text'}
    ]));
    return [{key: field.id, label: field.label, type:field.type, choices:field.choices}];
  }
  function allSpecs(lab) {
    return lab.steps.flatMap(s => s.fields.flatMap(specs)).concat(lab.checks.map((q, i) => ({key:'quiz:' + i, label:q.q, type:'select', choices:q.choices.map((_, n) => String(n))})));
  }
  function valid(spec, value) {
    if (typeof value !== 'string' || !value.trim() || value.length > 30000) return false;
    if (spec.type === 'weight') return /^\d{1,3}$/.test(value) && Number(value) <= 100;
    return !spec.choices || spec.choices.includes(value);
  }
  function blank(lab) { return {answers:{}, attested:lab.steps.map(() => false), updatedAt:null, briefedAt:null}; }
  function cleanLab(lab, raw) {
    const result = blank(lab);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result;
    for (const spec of allSpecs(lab)) if (valid(spec, raw.answers?.[spec.key])) result.answers[spec.key] = raw.answers[spec.key];
    result.attested = lab.steps.map((_, i) => raw.attested?.[i] === true);
    result.updatedAt = typeof raw.updatedAt === 'string' && !Number.isNaN(Date.parse(raw.updatedAt)) ? raw.updatedAt : null;
    result.briefedAt = typeof raw.briefedAt === 'string' && !Number.isNaN(Date.parse(raw.briefedAt)) ? raw.briefedAt : null;
    return result;
  }
  function vendorTotals(answers, id = 'vendors') {
    const weights = criteria.map((_, i) => answers[id + ':' + i + ':weight']);
    const weightValid = weights.every(w => valid({type:'weight'}, w));
    const sum = weights.reduce((s, w) => s + (Number(w) || 0), 0);
    const result = {sum, valid:weightValid && sum === 100, scores:{}};
    for (const vendor of ['A','B','C']) {
      const complete = criteria.every((_, i) => valid({type:'score', choices:['1','2','3','4','5']}, answers[id + ':' + i + ':' + vendor]));
      result.scores[vendor] = result.valid && complete ? criteria.reduce((s, _, i) => s + Number(weights[i]) * Number(answers[id + ':' + i + ':' + vendor]), 0) / 100 : null;
    }
    return result;
  }
  function missing(lab, state, stepIndex) {
    const step = lab.steps[stepIndex];
    const errors = step.fields.flatMap(specs).filter(s => !valid(s, state.answers[s.key])).map(s => s.label);
    for (const f of step.fields) if (f.type === 'vendors' && !vendorTotals(state.answers, f.id).valid) errors.push('Vendor weights must be whole numbers totalling 100');
    if (stepIndex === lab.steps.length - 1) lab.checks.forEach((q, i) => { if (!valid({choices:q.choices.map((_, n) => String(n))}, state.answers['quiz:' + i])) errors.push('Knowledge check ' + (i + 1)); });
    return errors;
  }
  function completed(lab, state, i) { return state.attested[i] === true && missing(lab, state, i).length === 0; }
  function progress(lab, state) { return lab.steps.filter((_, i) => completed(lab, state, i)).length; }
  function quizScore(lab, state) { return lab.checks.filter((q, i) => state.answers['quiz:' + i] === String(q.correct)).length; }
  function exportPacket(course, states, ids, alias = '') {
    return {format:'legal-learning-portfolio', version:1, courseId:course.id, courseTitle:course.title, exportedAt:new Date().toISOString(), learnerAlias:alias, labs:Object.fromEntries(ids.map(id => {
      const lab = course.labs.find(l => l.id === id); return [id, cleanLab(lab, states[id])];
    }))};
  }
  function parseImport(course, raw) {
    if (!raw || raw.format !== 'legal-learning-portfolio' || raw.version !== 1 || raw.courseId !== course.id || !raw.labs || typeof raw.labs !== 'object' || Array.isArray(raw.labs)) throw new Error('Choose a version 1 JSON portfolio exported from this course.');
    const labs = {};
    for (const lab of course.labs) if (Object.hasOwn(raw.labs, lab.id)) {
      const source = raw.labs[lab.id];
      if (!source || typeof source !== 'object' || !source.answers || typeof source.answers !== 'object' || Array.isArray(source.answers)) throw new Error('The portfolio contains an invalid lab record.');
      labs[lab.id] = cleanLab(lab, source);
    }
    if (!Object.keys(labs).length) throw new Error('No matching course labs were found.');
    return {labs, alias:typeof raw.learnerAlias === 'string' ? raw.learnerAlias.slice(0,80) : ''};
  }
  function markdown(course, states, ids, alias = '') {
    const lines = ['# ' + course.title, '', 'Learner alias: ' + (alias || 'Not specified'), 'Exported: ' + new Date().toISOString(), '', 'Completion records field population and learner review, not professional competence. No online submission has been made.', ''];
    for (const id of ids) {
      const lab = course.labs.find(l => l.id === id), state = cleanLab(lab, states[id]);
      lines.push('## Lab ' + lab.number + ': ' + lab.title, '', 'Day ' + lab.day + ' · Module ' + lab.module, 'Pre-read acknowledged: ' + (state.briefedAt || 'Not yet recorded'), 'Reviewed steps: ' + progress(lab,state) + '/' + lab.steps.length, 'Knowledge check: ' + quizScore(lab,state) + '/' + lab.checks.length, '');
      lab.steps.forEach((step, i) => {
        lines.push('### ' + (i + 1) + '. ' + step.title, '', 'Status: ' + (completed(lab,state,i) ? 'Learner reviewed' : 'Draft / incomplete'), '');
        for (const f of step.fields) {
          lines.push('#### ' + f.label, '');
          if (f.type === 'table') f.rows.forEach((row, r) => {
            lines.push('Row ' + (r + 1));
            f.columns.forEach(c => lines.push('- ' + c.label + ': ' + (c.type === 'fixed' ? row[c.key] : state.answers[f.id + ':' + r + ':' + c.key] || '[not entered]')));
            lines.push('');
          });
          else specs(f).forEach(s => lines.push(s.label + ': ' + (state.answers[s.key] || '[not entered]'), ''));
        }
      });
      lines.push('### Knowledge check', '');
      lab.checks.forEach((q, i) => { const a=state.answers['quiz:' + i]; lines.push('- ' + q.q + '\n  Response: ' + (a === undefined ? '[not answered]' : q.choices[Number(a)]), ''); });
      lines.push('### Self-review rubric', '', ...lab.rubric.map(r => '- ' + r), '');
    }
    return lines.join('\n');
  }
  root.LabCore = {criteria, specs, allSpecs, valid, blank, cleanLab, vendorTotals, missing, completed, progress, quizScore, exportPacket, parseImport, markdown};
}(typeof window !== 'undefined' ? window : globalThis));
