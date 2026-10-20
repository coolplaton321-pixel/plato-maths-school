/* Original worksheet questions, followed by the ten harder in-chat questions. */
const JUNIOR_ANGLE_QUESTIONS = (() => {
  const make = (number,title,prompt,answer,theory,example,terms,answerValues,description) => ({
    id:`jc-angles-${String(number).padStart(2,'0')}`,
    task:`Junior Cycle · ${number > 10 ? 'Harder angles' : 'Lines and angles'} · ${title}`,
    tense:'geo',difficulty:number > 10 ? 'hard' : number > 4 ? 'medium' : 'easy',
    practiceSet:number > 10 ? 'harder' : 'foundation',diagram:number,
    prompt,answer,theory,example,
    terms:terms.map(([w,d])=>({w,d,ua:d})),answerValues,description
  });
  return [
    make(1,'Straight line','Find $x$ on the straight line.',
      'Angles on a straight line total $180°$. So $x + 68 = 180$, giving $x = 112°$.',
      'Adjacent angles forming a straight angle add to 180°. Subtract the known angle from 180°.',
      'If one of two adjacent angles on a straight line is 73°, the other is 180° - 73° = 107°.',
      [['straight angle','an angle measuring 180°'],['adjacent angles','angles sharing a vertex and an arm']],{x:112},
      'A straight line is divided by a ray into angles x and 68 degrees.'),
    make(2,'Around a point','Find $x$ around the point.',
      'Angles around a point total $360°$. Therefore $x = 360 - 110 - 85 = 165°$.',
      'A full turn is 360°. Add the known angles, then subtract their sum from 360°.',
      'Angles of 90°, 120° and z around one point give z = 360° - 210° = 150°.',
      [['full turn','one complete rotation of 360°'],['vertex','the point where the arms of an angle meet']],{x:165},
      'Three angles around a point are 110 degrees, 85 degrees and x.'),
    make(3,'Opposite angles','Find $x$ where the two straight lines cross.',
      'Vertically opposite angles are equal, so $x = 47°$.',
      'At the intersection of two straight lines, each pair of opposite angles is equal.',
      'If one angle at an intersection is 62°, its vertically opposite angle is also 62°.',
      [['vertically opposite','angles directly opposite at an intersection'],['intersection','where two lines meet']],{x:47},
      'Two straight lines intersect. Opposite acute angles are labelled 47 degrees and x.'),
    make(4,'Right angle','The marked angle is a right angle. Find $x$.',
      'A right angle is $90°$. Thus $x + 32 = 90$, so $x = 58°$.',
      'The small square marks a right angle. Its two parts add to 90°.',
      'If a right angle is split into 27° and z, then z = 90° - 27° = 63°.',
      [['right angle','an angle measuring 90°'],['complementary','two angles whose sum is 90°']],{x:58},
      'A right angle marked by a square is divided into 32 degrees and x.'),
    make(5,'Corresponding angles','The marked lines are parallel. Find $x$.',
      'The $63°$ angle and $x$ are corresponding angles on parallel lines. Therefore $x = 63°$.',
      'Corresponding angles occupy the same relative position at the two intersections and are equal when the lines are parallel.',
      'If corresponding angles on parallel lines are z and 56°, then z = 56°.',
      [['corresponding','angles in matching positions at two intersections'],['transversal','a line crossing two other lines']],{x:63},
      'Parallel lines are crossed by a transversal. Corresponding acute angles are labelled 63 degrees and x.'),
    make(6,'Alternate angles','The marked lines are parallel. Find $x$.',
      'Alternate interior angles on parallel lines are equal. Hence $x = 74°$.',
      'Alternate interior angles lie between the parallel lines and on opposite sides of the transversal.',
      'Alternate interior angles z and 68° on parallel lines give z = 68°.',
      [['alternate interior','angles between the lines on opposite sides of a transversal'],['parallel lines','coplanar lines that do not meet']],{x:74},
      'A transversal crosses parallel lines. Alternate interior angles are 74 degrees and x.'),
    make(7,'Co-interior angles','The marked lines are parallel. Find $x$.',
      'Co-interior angles on parallel lines total $180°$. So $x + 116 = 180$, giving $x = 64°$.',
      'Angles between parallel lines on the same side of a transversal are supplementary, not generally equal.',
      'Co-interior angles of 109° and z give z = 180° - 109° = 71°.',
      [['co-interior','interior angles on the same side of a transversal'],['supplementary','two angles whose sum is 180°']],{x:64},
      'A transversal crosses parallel lines. Interior angles on the same side are 116 degrees and x.'),
    make(8,'Triangle angle sum','Find $x$ in the triangle.',
      'The interior angles of a triangle total $180°$. Therefore $x = 180 - 50 - 60 = 70°$.',
      'Add the two known interior angles and subtract from 180°.',
      'A triangle with angles 45° and 75° has third angle 180° - 120° = 60°.',
      [['interior angle','an angle inside a shape'],['triangle angle sum','the three interior angles total 180°']],{x:70},
      'A triangle has interior angles of 50 degrees, 60 degrees and x.'),
    make(9,'Isosceles triangle','The two marked sides are equal. Find $x$.',
      'The equal sides make the base angles equal. After removing the $38°$ vertex angle, $142°$ remains. Thus $2x = 142$ and $x = 71°$.',
      'Angles opposite equal sides are equal. Subtract the vertex angle from 180°, then divide equally between the base angles.',
      'An isosceles triangle with vertex angle 44° has each base angle (180° - 44°)/2 = 68°.',
      [['isosceles','a triangle with two equal sides'],['base angles','the equal angles opposite the equal sides']],{x:71},
      'An isosceles triangle has two equally marked sides, a vertex angle of 38 degrees and one base angle x.'),
    make(10,'Exterior angle','The base is extended. Find the exterior angle $x$.',
      'An exterior angle of a triangle equals the sum of the two opposite interior angles. Hence $x = 43 + 78 = 121°$.',
      'Use the two interior angles not adjacent to the exterior angle. Alternatively find the third interior angle, then subtract it from 180°.',
      'If the opposite interior angles are 35° and 80°, the exterior angle is 115°.',
      [['exterior angle','an angle between a side and an extended neighbouring side'],['opposite interior angles','the two interior angles not adjacent to that exterior angle']],{x:121},
      'A triangle has interior angles 43 degrees and 78 degrees. The exterior angle at the remaining vertex is x.'),
    make(11,'Three angles on a line','Find $x$. The three marked angles form a straight angle.',
      '$(2x + 10) + (3x - 5) + 50 = 180$. Collect terms: $5x + 55 = 180$. So $5x = 125$ and $x = 25$. The angles are $60°$, $70°$ and $50°$.',
      'Build an equation using the 180° straight-line total. Collect the x terms and the constants separately, then solve.',
      'If 2z, z + 15 and 45 are adjacent angles on a line, then 3z + 60 = 180, so z = 40.',
      [['angle equation','an equation formed from an angle relationship'],['like terms','terms with the same variable and power']],{x:25},
      'Three adjacent angles on a straight line are 2x plus 10 degrees, 3x minus 5 degrees and 50 degrees.'),
    make(12,'Algebra around a point','Find $x$ using the angles around the point.',
      '$(4x + 20) + (2x + 10) + 150 = 360$. So $6x + 180 = 360$, giving $6x = 180$ and $x = 30$. The angles are $140°$, $70°$ and $150°$.',
      'Use the full-turn total of 360°, not the straight-line total of 180°.',
      'If angles around a point are 3z + 10, z + 30 and 120, then 4z + 160 = 360 and z = 50.',
      [['full turn','all the angles around a point total 360°'],['collect terms','combine variable terms and numerical terms']],{x:30},
      'Angles around a point are 4x plus 20 degrees, 2x plus 10 degrees and 150 degrees.'),
    make(13,'Intersecting-line algebra','Find $x$ and $y$ at the intersection.',
      'Vertically opposite angles are equal: $5x - 15 = 3x + 25$. Thus $2x = 40$ and $x = 20$. That angle is $5(20) - 15 = 85°$. Since $y$ is adjacent on a straight line, $y = 180 - 85 = 95°$.',
      'First equate the vertically opposite expressions. Substitute the solved x-value to find an angle, then use the straight-line total for y.',
      'Opposite angles 4z - 10 and 2z + 30 give z = 20. Their angle is 70°, so an adjacent angle is 110°.',
      [['vertically opposite','opposite angles at an intersection are equal'],['substitution','put the solved value into the angle expression']],{x:20,y:95},
      'Opposite angles at an intersection are 5x minus 15 degrees and 3x plus 25 degrees. An adjacent angle is y.'),
    make(14,'Parallel-line algebra','The marked lines are parallel. Find $x$ and $y$.',
      'Corresponding angles are equal, so $2x + 14 = 5x - 40$. Rearranging gives $54 = 3x$, hence $x = 18$. The acute angle is $2(18) + 14 = 50°$. Therefore $y = 180 - 50 = 130°$.',
      'Identify corresponding angles before forming the equation. Then use an adjacent straight-line pair to find the remaining angle.',
      'Corresponding angles z + 20 and 3z - 40 give z = 30. Their angle is 50°, and an adjacent angle is 130°.',
      [['corresponding angles','matching positions on a transversal of parallel lines'],['adjacent supplementary angles','neighbouring angles that form a straight angle']],{x:18,y:130},
      'Corresponding angles on parallel lines are 2x plus 14 degrees and 5x minus 40 degrees. The angle adjacent to the latter is y.'),
    make(15,'Co-interior algebra','The marked lines are parallel. Find $x$.',
      'These are co-interior angles, so $(4x + 8) + (2x + 16) = 180$. Therefore $6x + 24 = 180$, $6x = 156$ and $x = 26$. The angles are $112°$ and $68°$.',
      'Co-interior angles add to 180°. Do not set their expressions equal.',
      'Co-interior angles 3z + 5 and 2z + 25 give 5z + 30 = 180, so z = 30.',
      [['co-interior angles','interior angles on the same side of a transversal'],['supplementary','the two angles sum to 180°']],{x:26},
      'Co-interior angles on marked parallel lines are 4x plus 8 degrees and 2x plus 16 degrees.'),
    make(16,'Triangle algebra','Find $x$ using the three interior angles.',
      '$(x + 10) + 2x + (3x - 10) = 180$. The constants cancel, leaving $6x = 180$, so $x = 30$. The angles are $40°$, $60°$ and $80°$.',
      'Add all three interior-angle expressions and equate their sum to 180°. Keep signs attached to constants.',
      'A triangle with angles z + 10, 2z and 50 gives 3z + 60 = 180, so z = 40.',
      [['interior-angle sum','the three angles in a triangle total 180°'],['cancelling constants','equal positive and negative constants add to zero']],{x:30},
      'A triangle has angles x plus 10 degrees, 2x degrees and 3x minus 10 degrees.'),
    make(17,'Isosceles algebra','The two tick-marked sides are equal. Find $x$ and $y$.',
      'The base angles are equal, so $y = 2x + 5$. Thus $2(2x + 5) + (3x + 2) = 180$. Expanding gives $7x + 12 = 180$, so $x = 24$. Therefore $y = 2(24) + 5 = 53°$; the vertex angle is $74°$.',
      'Use the equal-side marks to identify equal base angles. Include the base-angle expression twice in the triangle-sum equation.',
      'An isosceles triangle with base angle z + 10 and vertex angle 2z gives 2(z + 10) + 2z = 180, so z = 40.',
      [['equal-side ticks','matching ticks indicate equal lengths'],['base-angle theorem','angles opposite equal sides of a triangle are equal']],{x:24,y:53},
      'An isosceles triangle has vertex angle 3x plus 2 degrees and base angles 2x plus 5 degrees and y.'),
    make(18,'Exterior-angle algebra','Find $x$ from the marked exterior angle.',
      'The exterior angle equals $50 + 70 = 120°$. Therefore $3x + 15 = 120$, so $3x = 105$ and $x = 35$.',
      'Sum the two opposite interior angles, then equate that total to the exterior-angle expression.',
      'Opposite interior angles 40° and 65° give exterior angle 105°. If it is 2z + 5, then z = 50.',
      [['exterior-angle theorem','an exterior angle equals the sum of the opposite interior angles'],['opposite interior','inside the triangle, away from the exterior-angle vertex']],{x:35},
      'Two interior angles of a triangle are 50 degrees and 70 degrees. The exterior angle at the remaining vertex is 3x plus 15 degrees.'),
    make(19,'Parallel + isosceles','The marked lines are parallel and $AB = AC$. Find the vertex angle $x$.',
      'The $38°$ angle equals the interior angle at $B$ by alternate interior angles on parallel lines. Since $AB = AC$, the base angle at $C$ is also $38°$. Therefore $x = 180 - 38 - 38 = 104°$.',
      'Transfer the known angle using parallel lines, use the equal sides to obtain the second base angle, then use the triangle angle sum.',
      'If parallel-line reasoning gives a base angle of 42° in an isosceles triangle, its vertex angle is 180° - 2(42°) = 96°.',
      [['alternate interior angles','equal angles between parallel lines on opposite sides of a transversal'],['isosceles triangle','equal sides give equal opposite angles']],{x:104},
      'Triangle ABC has AB equal to AC. A line through A is parallel to BC. The angle between the leftward top line and AB is 38 degrees; the vertex angle at A is x.'),
    make(20,'Parallel segment in a triangle','In the diagram, $DE$ is parallel to $BC$. Find $x = ∠AED$.',
      'The interior angle at $B$ is $180 - 122 = 58°$. Hence the angle at $C$ is $180 - 40 - 58 = 82°$. Since $DE$ is parallel to $BC$, the corresponding angle $AED$ equals the angle at $C$. Thus $x = 82°$.',
      'Use the exterior angle to find the interior angle at B, then the triangle sum to find C. A parallel segment creates an equal corresponding angle at E.',
      'If the exterior angle at B is 115° and angle A is 45°, then angle C is 115° - 45° = 70°. A parallel segment gives the corresponding angle 70°.',
      [['corresponding angles','parallel lines create equal angles in matching positions'],['multi-step deduction','combine several angle facts in a justified order']],{x:82},
      'In triangle ABC, angle A is 40 degrees and the exterior angle at B is 122 degrees. D lies on AB, E on AC, and DE is parallel to BC. The angle AED is x.')
  ];
})();

/* Pure vector renderer: no network, canvas, dependencies or student data. */
function renderJuniorAngleDiagram(number){
  const question=JUNIOR_ANGLE_QUESTIONS.find(q=>q.diagram===number);
  if(!question) return '';
  const escape=text=>String(text).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const parts=[];
  const radians=a=>a*Math.PI/180;
  const polar=(p,a,r)=>[p[0]+r*Math.cos(radians(a)),p[1]+r*Math.sin(radians(a))];
  const direction=(p,q)=>(Math.atan2(q[1]-p[1],q[0]-p[0])*180/Math.PI+360)%360;
  const xy=p=>[160+p[0],137-p[1]];
  const n=value=>Number(value.toFixed(3));
  function line(a,b){const p=xy(a),q=xy(b);parts.push(`<line class="geometry" x1="${n(p[0])}" y1="${n(p[1])}" x2="${n(q[0])}" y2="${n(q[1])}"/>`);}
  function ray(p,a,r){line(p,polar(p,a,r));}
  function text(value,p){const q=xy(p);parts.push(`<text class="angle-label${value==='x'||value==='y'?' unknown':''}" x="${n(q[0])}" y="${n(q[1])}">${escape(value)}</text>`);}
  function angle(p,start,extent,value,r=22,distance=50,position){
    const a=xy(polar(p,start,r)),b=xy(polar(p,start+extent,r));
    parts.push(`<path class="angle-arc" d="M ${n(a[0])} ${n(a[1])} A ${r} ${r} 0 ${extent>180?1:0} 0 ${n(b[0])} ${n(b[1])}"/>`);
    text(value,position||polar(p,start+extent/2,distance));
  }
  function arrow(x,y){line([x-5,y-4],[x,y]);line([x,y],[x-5,y+4]);}
  function tick(a,b){const size=Math.hypot(b[0]-a[0],b[1]-a[1]),mid=[(a[0]+b[0])/2,(a[1]+b[1])/2],dx=-(b[1]-a[1])/size*6,dy=(b[0]-a[0])/size*6;line([mid[0]-dx,mid[1]-dy],[mid[0]+dx,mid[1]+dy]);}
  function parallels(theta){const l=[0,-24],u=[48/Math.tan(radians(theta)),24];line([-135,24],[135,24]);line([-135,-24],[135,-24]);line(polar(l,theta+180,42),polar(u,theta,50));arrow(-95,24);arrow(-95,-24);return [u,l];}
  function vertices(left,right,base,start,bottom){const h=base/(1/Math.tan(radians(left))+1/Math.tan(radians(right)));return [[start,bottom],[start+base,bottom],[start+h/Math.tan(radians(left)),bottom+h]];}
  function triangle([a,b,c]){line(a,b);line(b,c);line(c,a);}
  function interior(p,a,b,value,distance=42,position,r=22){let start=direction(p,a),end=direction(p,b),extent=(end-start+360)%360;if(extent>180){start=end;extent=360-extent;}angle(p,start,extent,value,r,distance,position);}
  const o=[0,0];
  switch(number){
    case 1: line([-120,0],[120,0]);ray(o,68,88);angle(o,0,68,'68°',23,55);angle(o,68,112,'x',27,56);break;
    case 2: [0,110,195].forEach(a=>ray(o,a,85));angle(o,0,110,'110°',24,54);angle(o,110,85,'85°',24,57);angle(o,195,165,'x',24,56);break;
    case 3: line([-120,0],[120,0]);line(polar(o,227,95),polar(o,47,95));angle(o,0,47,'47°',24,58);angle(o,180,47,'x',24,58);break;
    case 4: {const p=[-30,-30];ray(p,0,130);ray(p,90,100);ray(p,32,115);line([-30,-17],[-17,-17]);line([-17,-17],[-17,-30]);angle(p,0,32,'32°',28,50,[46,-14]);angle(p,32,58,'x',37,63);break;}
    case 5: {const [u,l]=parallels(63);angle(u,0,63,'63°',19,47);angle(l,0,63,'x',19,47);break;}
    case 6: {const [u,l]=parallels(74);angle(u,180,74,'74°',20,45);angle(l,0,74,'x',20,45);break;}
    case 7: {const [u,l]=parallels(64);angle(u,244,116,'116°',22,50,[84,10]);angle(l,0,64,'x',20,44,[38,-7]);break;}
    case 8: {const [a,b,c]=vertices(50,60,200,-100,-60);triangle([a,b,c]);interior(a,b,c,'50°',43);interior(b,c,a,'60°',43);interior(c,a,b,'x',38);break;}
    case 9: {const [a,b,c]=vertices(71,71,88,-44,-70);triangle([a,b,c]);tick(a,c);tick(b,c);interior(c,a,b,'38°',46,undefined,29);interior(a,b,c,'x',34);break;}
    case 10: {const [a,b,c]=vertices(43,59,170,-105,-55);triangle([a,b,c]);line(b,[140,-55]);interior(a,b,c,'43°',43);interior(c,a,b,'78°',40);angle(b,0,121,'x',25,46);break;}
    case 11: {const p=[0,-20];line([-125,-20],[125,-20]);ray(p,50,105);ray(p,120,105);angle(p,0,50,'50°',23,65);angle(p,50,70,'(3x − 5)°',28,82);angle(p,120,60,'(2x + 10)°',23,82);break;}
    case 12: [0,140,210].forEach(a=>ray(o,a,108));angle(o,0,140,'(4x + 20)°',23,76);angle(o,140,70,'(2x + 10)°',23,83);angle(o,210,150,'150°',23,67);break;
    case 13: line(polar(o,15,115),polar(o,195,115));line(polar(o,100,105),polar(o,280,105));angle(o,15,85,'(5x − 15)°',24,78);angle(o,195,85,'(3x + 25)°',24,78);angle(o,100,95,'y',28,64);break;
    case 14: {const [u,l]=parallels(50);angle(u,0,50,'(2x + 14)°',18,51,[108,36]);angle(l,0,50,'(5x − 40)°',18,52,[90,-9]);angle(l,50,130,'y',23,35);break;}
    case 15: {const [u,l]=parallels(68);angle(u,248,112,'(4x + 8)°',22,50,[91,11]);angle(l,0,68,'(2x + 16)°',20,50,[75,-9]);break;}
    case 16: {const [a,b,c]=vertices(40,60,225,-115,-65);triangle([a,b,c]);interior(a,b,c,'(x + 10)°',53,[-48,-54]);interior(b,c,a,'2x°',46);interior(c,a,b,'(3x − 10)°',55,[18,4]);break;}
    case 17: {const [a,b,c]=vertices(53,53,240,-120,-75);triangle([a,b,c]);tick(a,c);tick(b,c);interior(a,b,c,'(2x + 5)°',58,[-53,-55]);interior(b,c,a,'y',47,[76,-48]);interior(c,a,b,'(3x + 2)°',50,[0,25]);break;}
    case 18: {const [a,b,c]=vertices(50,60,180,-105,-55);triangle([a,b,c]);line(b,[145,-55]);interior(a,b,c,'50°',39);interior(c,a,b,'70°',39);angle(b,0,120,'(3x + 15)°',25,60,[110,-12]);break;}
    case 19: {const a=[0,-35+110*Math.tan(radians(38))],b=[-110,-35],c=[110,-35];triangle([a,b,c]);tick(a,b);tick(a,c);line([-140,a[1]],[140,a[1]]);line([-140,-35],[140,-35]);arrow(-128,a[1]);arrow(-128,-35);angle(a,180,38,'38°',23,53);interior(a,b,c,'x',38);text('A',[10,a[1]+16]);text('B',[-119,-51]);text('C',[119,-51]);break;}
    case 20: {const [b,c,a]=vertices(58,82,145,-80,-95);const d=[(a[0]+b[0])/2,(a[1]+b[1])/2],e=[(a[0]+c[0])/2,(a[1]+c[1])/2];triangle([a,b,c]);line(d,e);line(b,[-145,b[1]]);arrow(0,d[1]);arrow(0,b[1]);interior(a,b,c,'40°',46);angle(b,58,122,'122°',23,46);interior(e,a,d,'x',32);text('A',[a[0]+10,a[1]+14]);text('B',[b[0]-2,b[1]-17]);text('C',[c[0]+9,c[1]-15]);text('D',[d[0]-13,d[1]+9]);text('E',[e[0]+14,e[1]+7]);break;}
  }
  return `<svg viewBox="0 0 320 275" role="img" aria-label="${escape(question.description)}">${parts.join('')}</svg>`;
}
