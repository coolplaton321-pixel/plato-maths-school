import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import test from 'node:test';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const inline=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const angles=readFileSync(new URL('../junior-angles.js',import.meta.url),'utf8');
const worksheet=readFileSync(new URL('../leaving-differentiation-worksheet.js',import.meta.url),'utf8');
const bankCode=angles+'\n'+worksheet+'\n'+inline.slice(inline.indexOf('const QUESTION_BANKS'),inline.indexOf('/* Default explanations'));

test('all fifteen existing differentiation questions are preserved byte-for-byte in the expanded 35-question bank',()=>{
  const context=vm.createContext({});
  vm.runInContext(bankCode,context);
  const bank=JSON.parse(vm.runInContext('JSON.stringify(QUESTION_BANKS.differentiation)',context));
  assert.equal(bank.length,35);
  const questions=bank.slice(0,15);
  assert.equal(createHash('sha256').update(JSON.stringify(questions)).digest('hex'),'8aa025fc0288af76a90427b6c112989d0254cb4213c9f4421faad90fe131a0cb');
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

test('all twenty PDF questions retain their equations, answers, worksheet order and rule coverage',()=>{
  const context=vm.createContext({});
  vm.runInContext(bankCode,context);
  const questions=JSON.parse(vm.runInContext('JSON.stringify(QUESTION_BANKS.differentiation.slice(15))',context));
  assert.equal(questions.length,20);
  assert.deepEqual(questions.map(q=>q.worksheetNumber),Array.from({length:20},(_,i)=>i+1));
  assert.equal(new Set(questions.map(q=>q.id)).size,20);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,20);
  assert.deepEqual(questions.map(q=>q.difficulty),[...Array(4).fill('easy'),...Array(12).fill('medium'),...Array(4).fill('hard')]);
  assert.deepEqual([...new Set(questions.flatMap(q=>q.rules))].sort(),['chain','difference','limit','power','product','quotient','reciprocal','root','sum']);
  assert.ok(questions.every(q=>q.tense==='calc' && q.source==='landscape-20' && q.theory && q.example && q.terms.length===q.rules.length));
  assert.ok(questions.every(q=>q.task.includes(`PDF ${String(q.worksheetNumber).padStart(2,'0')}`)));
  const limits=questions.filter(q=>q.rules.includes('limit'));
  assert.deepEqual(limits.map(q=>q.worksheetNumber),[4,5,6]);
  assert.ok(limits.every(q=>q.prompt.includes('lim<sub>h &rarr; 0</sub>') && q.answer.includes('For $h &ne; 0$')));
  assert.ok(limits[1].answer.includes('2x + h + 3') && limits[2].answer.includes('4x + 2h - 5'));
  const cases=[
    ['4x<sup>3</sup> - 5x<sup>2</sup> + 6x - 9','12x<sup>2</sup> - 10x + 6',x=>4*x**3-5*x*x+6*x-9,x=>12*x*x-10*x+6],
    ['2x<sup>4</sup> - 9/x','8x<sup>3</sup> + 9/x<sup>2</sup>',x=>2*x**4-9/x,x=>8*x**3+9/x**2],
    ['8&radic;x - 3x + 2','4/&radic;x - 3',x=>8*Math.sqrt(x)-3*x+2,x=>4/Math.sqrt(x)-3],
    ['3x - 2',"f'(x) = 3",x=>3*x-2,x=>3],
    ['x<sup>2</sup> + 3x',"f'(x) = 2x + 3",x=>x*x+3*x,x=>2*x+3],
    ['2x<sup>2</sup> - 5x + 4',"f'(x) = 4x - 5",x=>2*x*x-5*x+4,x=>4*x-5],
    ['(x<sup>2</sup> + 2)(3x - 4)','9x<sup>2</sup> - 8x + 6',x=>(x*x+2)*(3*x-4),x=>9*x*x-8*x+6],
    ['(3x - 2)<sup>4</sup>','12(3x - 2)<sup>3</sup>',x=>(3*x-2)**4,x=>12*(3*x-2)**3],
    ['(2x + 1)/(x - 3)','-7/(x - 3)<sup>2</sup>',x=>(2*x+1)/(x-3),x=>-7/(x-3)**2],
    ['(x<sup>2</sup> - 4)(x<sup>3</sup> + 2x)','5x<sup>4</sup> - 6x<sup>2</sup> - 8',x=>(x*x-4)*(x**3+2*x),x=>5*x**4-6*x*x-8],
    ['&radic;(2x<sup>2</sup> + 5)','2x/&radic;(2x<sup>2</sup> + 5)',x=>Math.sqrt(2*x*x+5),x=>2*x/Math.sqrt(2*x*x+5)],
    ['(x<sup>2</sup> + 3)/(2x - 1)','(2x<sup>2</sup> - 2x - 6)/(2x - 1)<sup>2</sup>',x=>(x*x+3)/(2*x-1),x=>(2*x*x-2*x-6)/(2*x-1)**2],
    ['(x<sup>2</sup> + 1)<sup>3</sup> - 2(3x - 4)<sup>2</sup>','6x(x<sup>2</sup> + 1)<sup>2</sup> - 12(3x - 4)',x=>(x*x+1)**3-2*(3*x-4)**2,x=>6*x*(x*x+1)**2-12*(3*x-4)],
    ['(2x + 1)<sup>3</sup>(x<sup>2</sup> - 4)','2(2x + 1)<sup>2</sup>(5x<sup>2</sup> + x - 12)',x=>(2*x+1)**3*(x*x-4),x=>2*(2*x+1)**2*(5*x*x+x-12)],
    ['(x<sup>2</sup> - 3x + 5)<sup>-2</sup>','-2(2x - 3)/(x<sup>2</sup> - 3x + 5)<sup>3</sup>',x=>(x*x-3*x+5)**-2,x=>-2*(2*x-3)/(x*x-3*x+5)**3],
    ['(x<sup>2</sup> + 1)<sup>2</sup>/(x + 2)','(x<sup>2</sup> + 1)(3x<sup>2</sup> + 8x - 1)/(x + 2)<sup>2</sup>',x=>(x*x+1)**2/(x+2),x=>(x*x+1)*(3*x*x+8*x-1)/(x+2)**2],
    ['(2x - 1)<sup>3</sup>(x<sup>2</sup> + 4)<sup>2</sup>','2(2x - 1)<sup>2</sup>(x<sup>2</sup> + 4)(7x<sup>2</sup> - 2x + 12)',x=>(2*x-1)**3*(x*x+4)**2,x=>2*(2*x-1)**2*(x*x+4)*(7*x*x-2*x+12)],
    ['(3x + 1)<sup>4</sup>/(x<sup>2</sup> + 2)','2(3x + 1)<sup>3</sup>(3x<sup>2</sup> - x + 12)/(x<sup>2</sup> + 2)<sup>2</sup>',x=>(3*x+1)**4/(x*x+2),x=>2*(3*x+1)**3*(3*x*x-x+12)/(x*x+2)**2],
    ['[(x<sup>2</sup> + 1)/(x - 2)]<sup>3</sup>','3(x<sup>2</sup> + 1)<sup>2</sup>(x<sup>2</sup> - 4x - 1)/(x - 2)<sup>4</sup>',x=>((x*x+1)/(x-2))**3,x=>3*(x*x+1)**2*(x*x-4*x-1)/(x-2)**4],
    ['[(x<sup>2</sup> + 1)<sup>2</sup>(2x - 3)<sup>3</sup>]/(x + 1)','(x<sup>2</sup> + 1)(2x - 3)<sup>2</sup>(12x<sup>3</sup> + 5x<sup>2</sup> - 8x + 9)/(x + 1)<sup>2</sup>',x=>(x*x+1)**2*(2*x-3)**3/(x+1),x=>(x*x+1)*(2*x-3)**2*(12*x**3+5*x*x-8*x+9)/(x+1)**2]
  ];
  cases.forEach(([equation,answer,f,df],i)=>{
    const q=questions[i];
    assert.ok(q.prompt.includes(equation),`PDF ${i+1}: exact function`);
    assert.ok(q.answer.includes(answer),`PDF ${i+1}: exact final derivative`);
    for(const field of ['prompt','answer']) assert.equal((q[field].match(/\$/g)||[]).length%2,0,`PDF ${i+1}: balanced maths`);
    for(const x of [.25,.8,1.25,1.8,2.6,3.4]){
      const h=1e-5;
      const numerical=(f(x+h)-f(x-h))/(2*h);
      assert.ok(Math.abs(numerical-df(x))<1e-6*Math.max(1,Math.abs(df(x))),`PDF ${i+1}: derivative at ${x}`);
    }
  });
  for(const [index,domain] of [[1,'x &ne; 0'],[2,'x &gt; 0'],[8,'x &ne; 3'],[11,'x &ne; 1/2'],[15,'x &ne; -2'],[18,'x &ne; 2'],[19,'x &ne; -1']]){
    assert.ok(questions[index].prompt.includes(domain) && questions[index].answer.includes(domain),`PDF ${index+1}: domain preserved`);
  }
});

test('all twenty worksheet help examples have correct derivatives',()=>{
  const cases=[
    [x=>2*x**3+x*x-4*x+5,x=>6*x*x+2*x-4],
    [x=>3/x**2,x=>-6/x**3],
    [x=>6*Math.sqrt(x)+x,x=>3/Math.sqrt(x)+1],
    [x=>2*x+1,x=>2],
    [x=>x*x,x=>2*x],
    [x=>3*x*x-x,x=>6*x-1],
    [x=>(x*x+1)*(x+2),x=>3*x*x+4*x+1],
    [x=>(2*x+3)**3,x=>6*(2*x+3)**2],
    [x=>x/(x+1),x=>1/(x+1)**2],
    [x=>(x*x-1)*(x*x+2),x=>4*x**3+2*x],
    [x=>Math.sqrt(3*x*x+1),x=>3*x/Math.sqrt(3*x*x+1)],
    [x=>(x*x+1)/(x+1),x=>(x*x+2*x-1)/(x+1)**2],
    [x=>(x*x+2)**2+(2*x+1)**3,x=>4*x*(x*x+2)+6*(2*x+1)**2],
    [x=>x*x*(x+1)**3,x=>x*(x+1)**2*(5*x+2)],
    [x=>(2*x+1)**-3,x=>-6/(2*x+1)**4],
    [x=>(x+1)**2/(x+3),x=>(x+1)*(x+5)/(x+3)**2],
    [x=>(x+1)**2*(x*x+2)**3,x=>2*(x+1)*(x*x+2)**2*(4*x*x+3*x+2)],
    [x=>(x+1)**3/(x*x+1),x=>(x+1)**2*(x*x-2*x+3)/(x*x+1)**2],
    [x=>((x+1)/(x-1))**2,x=>-4*(x+1)/(x-1)**3],
    [x=>x*x*(x+2)**3/(x+1),x=>x*(x+2)**2*(4*x*x+7*x+4)/(x+1)**2]
  ];
  for(const [i,[f,df]] of cases.entries()){
    for(const x of [.25,.7,1.3,2.2]){
      const h=1e-5;
      assert.ok(Math.abs((f(x+h)-f(x-h))/(2*h)-df(x))<1e-6*Math.max(1,Math.abs(df(x))),`PDF example ${i+1} at ${x}`);
    }
  }
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
  assert.equal(elements.get('anglesButton').hidden,true);
  assert.equal(elements.get('appliedButton').hidden,true);
  assert.equal(elements.get('testCount').textContent,'15 questions');
  elements.get('differentiationButton').click();
  assert.equal(run('activeBank'),'differentiation');
  assert.equal(run('QUESTIONS.length'),35);
  assert.equal(elements.get('differentiationCount').textContent,'35 questions');
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
  assert.equal(elements.get('anglesButton').hidden,false);
  assert.equal(elements.get('anglesCount').textContent,'20 questions');
  elements.get('anglesButton').click();
  assert.equal(run('activeBank'),'angles');
  assert.equal(run('QUESTIONS.length'),20);
  assert.equal(elements.get('anglesButton').attributes['aria-pressed'],'true');
  assert.equal(elements.get('appliedButton').attributes['aria-pressed'],'false');
  assert.equal(elements.get('testCount').textContent,'10 questions');
  assert.ok(modes[0].classes.has('on'));
  elements.get('testButton').click();
  assert.equal(run('activeBank'),'junior');
  elements.get('appliedButton').click();
  assert.equal(run('QUESTIONS.length'),30);
  elements.get('testButton').click();
  assert.equal(run('activeBank'),'junior');
  assert.equal(run('QUESTIONS.length'),10);
  assert.equal(elements.get('testCount').textContent,'10 questions');
});

test('both angle sets have complete cards and preserve every original answer',()=>{
  const context=vm.createContext({});
  vm.runInContext(bankCode,context);
  const questions=JSON.parse(vm.runInContext('JSON.stringify(QUESTION_BANKS.angles)',context));
  assert.equal(questions.length,20);
  assert.equal(new Set(questions.map(q=>q.id)).size,20);
  assert.deepEqual(questions.map(q=>q.diagram),Array.from({length:20},(_,i)=>i+1));
  assert.equal(questions.filter(q=>q.practiceSet==='foundation').length,10);
  assert.equal(questions.filter(q=>q.practiceSet==='harder').length,10);
  assert.ok(questions.every(q=>q.tense==='geo' && q.prompt && q.answer && q.theory && q.example && q.terms.length===2 && q.description));
  assert.deepEqual(questions.map(q=>q.answerValues),[
    {x:112},{x:165},{x:47},{x:58},{x:63},{x:74},{x:64},{x:70},{x:71},{x:121},
    {x:25},{x:30},{x:20,y:95},{x:18,y:130},{x:26},{x:30},{x:24,y:53},{x:35},{x:104},{x:82}
  ]);
  for(const q of questions){
    const svg=vm.runInContext(`renderJuniorAngleDiagram(${q.diagram})`,context);
    assert.match(svg,/^<svg/);assert.match(svg,/viewBox="0 0 320 275"/);assert.match(svg,/role="img"/);assert.match(svg,/aria-label=/);
    assert.match(svg,/class="geometry"/);assert.match(svg,/<text\b[^>]*>[^<]*x[^<]*<\/text>/);
    assert.ok(!svg.includes('NaN') && !svg.includes('undefined') && !svg.includes('<script'));
    for(const field of ['prompt','answer']) assert.equal((q[field].match(/\$/g)||[]).length%2,0);
    for(const [variable,value] of Object.entries(q.answerValues)){
      assert.ok(q.answer.includes(`${variable} =`),`${q.id}: identifies ${variable}`);
      assert.ok(q.answer.includes(`${value}°`) || q.answer.includes(`${variable} = ${value}`),`${q.id}: final value ${value}`);
    }
  }
  assert.equal(vm.runInContext('renderJuniorAngleDiagram(99)',context),'');
});

test('angle equations independently reproduce all harder answers',()=>{
  assert.equal((180-10+5-50)/5,25);
  assert.equal((360-20-10-150)/6,30);
  assert.equal((25+15)/(5-3),20);assert.equal(180-(5*20-15),95);
  assert.equal((14+40)/(5-2),18);assert.equal(180-(2*18+14),130);
  assert.equal((180-8-16)/6,26);
  assert.equal(180/6,30);
  assert.equal((180-2*5-2)/7,24);assert.equal(2*24+5,53);
  assert.equal((50+70-15)/3,35);
  assert.equal(180-2*38,104);
  assert.equal(180-40-(180-122),82);
});
