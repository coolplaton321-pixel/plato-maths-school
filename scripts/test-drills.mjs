import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const inline=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const bankCode=inline.slice(inline.indexOf('const QUESTION_BANKS'),inline.indexOf('/* Default explanations'));

test('fifteen derivative questions retain the original ten and add three medium and two hard combined-rule problems',()=>{
  const context=vm.createContext({});
  vm.runInContext(bankCode,context);
  const questions=JSON.parse(vm.runInContext('JSON.stringify(QUESTION_BANKS.differentiation)',context));
  assert.equal(questions.length,15);
  assert.deepEqual(questions.map(q=>q.difficulty),['easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard']);
  assert.ok(questions.every(q=>q.tense==='calc' && q.prompt && q.answer && q.theory && q.example && q.terms.length));
  assert.equal(questions.filter(q=>q.prompt.includes('lim<sub>')).length,1);
  assert.ok(questions[6].prompt.includes('(f(x+h) - f(x))/h'));
  assert.ok(questions[6].answer.includes('For $h &ne; 0$'));
  assert.deepEqual(questions.slice(7,10).map(q=>q.task.split(' · ')[1]),['Product rule (HL)','Quotient rule (HL)','Chain rule (HL)']);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,15);
  const combined=questions.slice(10);
  assert.deepEqual(combined.map(q=>q.difficulty),['medium','medium','medium','hard','hard']);
  assert.ok(combined.every(q=>q.task.includes('Product + chain:') && q.task.includes('(HL)')));
  assert.ok(combined.every(q=>/product and chain rules/.test(q.prompt) && /chain rule/.test(q.answer) && /product rule/.test(q.answer)));
  assert.ok(combined.every(q=>q.terms.length===2 && q.context));
  assert.ok(combined[4].prompt.includes('x &ne; -2/3') && combined[4].answer.includes('x &ne; -2/3'));
  for(const q of questions){
    for(const field of ['prompt','answer']) assert.equal((q[field].match(/\$/g)||[]).length%2,0,`${q.task}: balanced math styling`);
  }
  assert.ok(!questions.some(q=>/integration|optimisation|logarithm|trigonometric/i.test(q.task)));
  assert.equal(vm.runInContext('QUESTION_BANKS.junior.length',context),10);
  assert.equal(vm.runInContext('QUESTION_BANKS.applied.length',context),30);
  assert.equal(vm.runInContext('QUESTION_BANKS.leaving.length',context),15);

  const cases=[
    ['7x - 4','f\'(x) = 7',x=>7*x-4,x=>7],
    ['3x<sup>2</sup> - 5x + 2','6x - 5',x=>3*x*x-5*x+2,x=>6*x-5],
    ['2x<sup>3</sup> - 3x<sup>2</sup> + 4x - 7','6x<sup>2</sup> - 6x + 4',x=>2*x**3-3*x*x+4*x-7,x=>6*x*x-6*x+4],
    ['x<sup>4</sup> - 6/x','4x<sup>3</sup> + 6/x<sup>2</sup>',x=>x**4-6/x,x=>4*x**3+6/(x*x)],
    ['4&radic;x + 3x','2/&radic;x + 3',x=>4*Math.sqrt(x)+3*x,x=>2/Math.sqrt(x)+3],
    ['x<sup>3</sup> - 2x<sup>2</sup> + x','12 - 8 + 1 = 5',x=>x**3-2*x*x+x,x=>3*x*x-4*x+1],
    ['x<sup>2</sup> + 3x','f\'(x) = 2x + 3',x=>x*x+3*x,x=>2*x+3],
    ['(x<sup>2</sup> + 1)(3x - 2)','9x<sup>2</sup> - 4x + 3',x=>(x*x+1)*(3*x-2),x=>9*x*x-4*x+3],
    ['(x<sup>2</sup> + 1)/(x + 2)','(x<sup>2</sup> + 4x - 1)/(x + 2)<sup>2</sup>',x=>(x*x+1)/(x+2),x=>(x*x+4*x-1)/(x+2)**2],
    ['(2x - 3)<sup>4</sup>','8(2x - 3)<sup>3</sup>',x=>(2*x-3)**4,x=>8*(2*x-3)**3],
    ['x<sup>2</sup>(3x + 1)<sup>4</sup>','2x(3x + 1)<sup>3</sup>(9x + 1)',x=>x*x*(3*x+1)**4,x=>2*x*(3*x+1)**3*(9*x+1)],
    ['(x<sup>2</sup> + 2)(2x - 1)<sup>3</sup>','2(2x - 1)<sup>2</sup>(5x<sup>2</sup> - x + 6)',x=>(x*x+2)*(2*x-1)**3,x=>2*(2*x-1)**2*(5*x*x-x+6)],
    ['(x + 1)(x<sup>2</sup> + 3)<sup>2</sup>','(x<sup>2</sup> + 3)(5x<sup>2</sup> + 4x + 3)',x=>(x+1)*(x*x+3)**2,x=>(x*x+3)*(5*x*x+4*x+3)],
    ['(2x - 1)<sup>3</sup>(x<sup>2</sup> + 1)<sup>4</sup>','2(2x - 1)<sup>2</sup>(x<sup>2</sup> + 1)<sup>3</sup>(11x<sup>2</sup> - 4x + 3)',x=>(2*x-1)**3*(x*x+1)**4,x=>2*(2*x-1)**2*(x*x+1)**3*(11*x*x-4*x+3)],
    ['(x<sup>2</sup> - 1)<sup>2</sup>(3x + 2)<sup>-3</sup>','(x<sup>2</sup> - 1)(3x<sup>2</sup> + 8x + 9)/(3x + 2)<sup>4</sup>',x=>(x*x-1)**2*(3*x+2)**-3,x=>(x*x-1)*(3*x*x+8*x+9)/(3*x+2)**4]
  ];
  cases.forEach(([prompt,answer,f,derivative],i)=>{
    assert.ok(questions[i].prompt.includes(prompt),`Question ${i+1} prompt`);
    assert.ok(questions[i].answer.includes(answer),`Question ${i+1} solution`);
    for(const x of i<10 ? [0.5,1,2,3] : [-1,-0.5,0,0.5,1,2,3]){
      const h=1e-5;
      const numerical=(f(x+h)-f(x-h))/(2*h);
      assert.ok(Math.abs(numerical-derivative(x))<1e-6*Math.max(1,Math.abs(derivative(x))),`Question ${i+1} derivative at ${x}`);
    }
  });
  assert.equal(cases[5][3](2),5);
});

test('combined-rule help examples have correct derivatives',()=>{
  const examples=[
    [x=>x*(2*x+1)**2,x=>(2*x+1)*(6*x+1)],
    [x=>(x*x+1)*(x+2)**2,x=>2*x*(x+2)**2+2*(x*x+1)*(x+2)],
    [x=>(x-2)*(x*x+1)**3,x=>(x*x+1)**3+6*x*(x-2)*(x*x+1)**2],
    [x=>(x+1)**2*(x*x+2)**3,x=>2*(x+1)*(x*x+2)**2*(4*x*x+3*x+2)],
    [x=>(x+1)**2*(2*x-1)**-2,x=>-6*(x+1)/(2*x-1)**3]
  ];
  for(const [f,derivative] of examples){
    for(const x of [-1,0,1,2]){
      const h=1e-5;
      assert.ok(Math.abs((f(x+h)-f(x-h))/(2*h)-derivative(x))<1e-6*Math.max(1,Math.abs(derivative(x))));
    }
  }
});

test('Leaving Cert drill controls select, reset, return and remain separate from Junior Cycle',()=>{
  const elements=new Map();
  function element(){
    const classes=new Set();
    return {hidden:false,textContent:'',attributes:{},classes,
      classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name)},
      setAttribute(name,value){this.attributes[name]=value;},
      addEventListener(name,fn){this[name]=fn;}};
  }
  const modes=['junior','leaving'].map(bank=>({...element(),dataset:{bank}}));
  const context=vm.createContext({document:{
    getElementById(id){if(!elements.has(id)) elements.set(id,element());return elements.get(id);},
    querySelectorAll:()=>modes
  }});
  const run=code=>vm.runInContext(code,context);
  run(bankCode);
  run('let idx=4;const results=[{correct:true}];let locked=true;let topCard={};let rendered=0;function render(){rendered++;}');
  run(inline.slice(inline.indexOf('function examBankFor'),inline.indexOf('/* ---------------- working board')));
  run('selectBank("leaving")');
  assert.equal(elements.get('differentiationButton').hidden,false);
  assert.equal(elements.get('appliedButton').hidden,true);
  assert.equal(elements.get('testCount').textContent,'15 questions');
  elements.get('differentiationButton').click();
  assert.equal(run('activeBank'),'differentiation');
  assert.equal(run('QUESTIONS.length'),15);
  assert.equal(elements.get('differentiationCount').textContent,'15 questions');
  assert.equal(run('idx'),0);
  assert.equal(run('results.length'),0);
  assert.equal(run('locked'),false);
  assert.equal(elements.get('differentiationButton').attributes['aria-pressed'],'true');
  assert.equal(elements.get('testButton').attributes['aria-pressed'],'false');
  assert.ok(modes[1].classes.has('on'));
  assert.ok(!modes[0].classes.has('on'));
  elements.get('testButton').click();
  assert.equal(run('activeBank'),'leaving');
  modes[0].onclick();
  assert.equal(elements.get('differentiationButton').hidden,true);
  assert.equal(elements.get('appliedButton').hidden,false);
  elements.get('appliedButton').click();
  assert.equal(run('QUESTIONS.length'),30);
  elements.get('testButton').click();
  assert.equal(run('activeBank'),'junior');
  assert.equal(run('QUESTIONS.length'),10);
  assert.equal(elements.get('testCount').textContent,'10 questions');
});
