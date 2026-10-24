/* The twenty landscape-PDF questions, kept in their original worksheet order. */
const LC_DIFFERENTIATION_WORKSHEET = (() => {
  const terms = {
    power:['power rule','d/dx of x<sup>n</sup> is nx<sup>n-1</sup>','multiply by the power, then reduce it by one'],
    sum:['sum and difference rules','differentiate a sum or difference term by term','keep the sign of every term'],
    reciprocal:['negative power','a reciprocal expressed as a power with a negative exponent','1/x is x<sup>-1</sup>'],
    root:['fractional power','a power representing a root','a square root is a power of one half'],
    limit:['first principles','the derivative defined as a limit of a difference quotient','simplify before letting h tend to zero'],
    difference:['difference quotient','[f(x+h) - f(x)]/h, with h non-zero','change in output divided by change in input'],
    product:['product rule',"(uv)' = u'v + uv'",'differentiate one factor at a time'],
    quotient:['quotient rule',"(u/v)' = (u'v - uv')/v<sup>2</sup>, for v non-zero",'keep the subtraction order and square the denominator'],
    chain:['chain rule / composition','differentiate the outer function, then multiply by the inner derivative','one function inside another'],
  };
  const limitFormula = "<br>$f'(x) = lim<sub>h &rarr; 0</sub> [(f(x+h) - f(x))/h]$.";
  const make = (number,title,difficulty,rules,prompt,answer,theory,example) => ({
    id:`lc-diff-pdf-${String(number).padStart(2,'0')}`,
    worksheetNumber:number,source:'landscape-20',rules,
    task:`Leaving Cert · PDF ${String(number).padStart(2,'0')} · ${title} · ${difficulty[0].toUpperCase()+difficulty.slice(1)}`,
    tense:'calc',difficulty,prompt,answer,theory,example,
    terms:rules.map(rule=>{const [w,d,ua]=terms[rule];return {w,d,ua};})
  });
  return [
    make(1,'Powers and sums','easy',['sum','power'],
      "Find $f'(x)$ for $f(x) = 4x<sup>3</sup> - 5x<sup>2</sup> + 6x - 9$.",
      "Differentiate each term separately: $f'(x) = 4(3x<sup>2</sup>) - 5(2x) + 6 - 0 = 12x<sup>2</sup> - 10x + 6$.",
      "Use the sum and difference rules term by term. For ax<sup>n</sup>, the derivative is anx<sup>n-1</sup>. A constant has derivative zero.",
      "If g(x) = 2x<sup>3</sup> + x<sup>2</sup> - 4x + 5, then g'(x) = 6x<sup>2</sup> + 2x - 4."),

    make(2,'Negative powers (HL)','easy',['power','reciprocal'],
      "Find $f'(x)$ for $f(x) = 2x<sup>4</sup> - 9/x$, where $x &ne; 0$.",
      "Rewrite $f(x) = 2x<sup>4</sup> - 9x<sup>-1</sup>$. Thus $f'(x) = 8x<sup>3</sup> + 9x<sup>-2</sup> = 8x<sup>3</sup> + 9/x<sup>2</sup>$, for $x &ne; 0$.",
      "Rewrite a reciprocal using a negative power before applying the power rule. The derivative of -9x<sup>-1</sup> is positive because the two negative factors multiply to a positive.",
      "For g(x) = 3/x<sup>2</sup> = 3x<sup>-2</sup>, g'(x) = -6/x<sup>3</sup>, for x &ne; 0."),

    make(3,'Square roots (HL)','easy',['power','root'],
      "Find $f'(x)$ for $f(x) = 8&radic;x - 3x + 2$, where $x &gt; 0$.",
      "Write $8&radic;x = 8x<sup>1/2</sup>$. Then $f'(x) = 4x<sup>-1/2</sup> - 3 = 4/&radic;x - 3$, for $x &gt; 0$.",
      "A square root is a power of one half. After differentiating, the new power is minus one half, which means the reciprocal of the square root.",
      "If g(x) = 6&radic;x + x, then g'(x) = 3/&radic;x + 1, for x &gt; 0."),

    make(4,'First principles (HL)','easy',['limit','difference'],
      "From first principles, find $f'(x)$ for $f(x) = 3x - 2$. Use the limit definition, not a shortcut rule."+limitFormula,
      "$f(x+h) = 3(x+h) - 2 = 3x + 3h - 2$. Subtracting $f(x)$ gives $3h$.<br>For $h &ne; 0$, $[f(x+h) - f(x)]/h = 3h/h = 3$.<br>Taking the limit as $h &rarr; 0$, $f'(x) = 3$.",
      "Substitute x+h into the entire function, subtract f(x), and divide by h while h is non-zero. Only then take the limit as h tends to zero.",
      "For g(x) = 2x + 1, g(x+h) - g(x) = 2h. The difference quotient is 2h/h = 2 for h &ne; 0, so g'(x) = 2."),

    make(5,'First principles (HL)','medium',['limit','difference'],
      "From first principles, find $f'(x)$ for $f(x) = x<sup>2</sup> + 3x$. Evaluate the limit explicitly."+limitFormula,
      "$f(x+h) = x<sup>2</sup> + 2xh + h<sup>2</sup> + 3x + 3h$. Therefore $f(x+h) - f(x) = 2xh + h<sup>2</sup> + 3h$.<br>For $h &ne; 0$, $[f(x+h) - f(x)]/h = 2x + h + 3$.<br>As $h &rarr; 0$, $f'(x) = 2x + 3$.",
      "Expand (x+h)<sup>2</sup> before subtracting f(x). Every term left in the numerator should contain h, allowing cancellation before taking the limit.",
      "For g(x) = x<sup>2</sup>, the difference quotient is (2xh + h<sup>2</sup>)/h = 2x + h for h &ne; 0. Its limit is g'(x) = 2x."),

    make(6,'First principles (HL)','medium',['limit','difference'],
      "From first principles, find $f'(x)$ for $f(x) = 2x<sup>2</sup> - 5x + 4$. Evaluate the limit explicitly."+limitFormula,
      "$f(x+h) = 2x<sup>2</sup> + 4xh + 2h<sup>2</sup> - 5x - 5h + 4$. Subtracting $f(x)$ leaves $4xh + 2h<sup>2</sup> - 5h$.<br>For $h &ne; 0$, $[f(x+h) - f(x)]/h = 4x + 2h - 5$.<br>As $h &rarr; 0$, $f'(x) = 4x - 5$.",
      "Keep the coefficient 2 when expanding the square, and subtract the whole of f(x), including its minus signs. Cancel h before taking the limit.",
      "For g(x) = 3x<sup>2</sup> - x, the difference quotient simplifies to 6x + 3h - 1 for h &ne; 0. Hence g'(x) = 6x - 1."),

    make(7,'Product rule (HL)','medium',['product'],
      "Use the product rule to find $f'(x)$ for $f(x) = (x<sup>2</sup> + 2)(3x - 4)$.",
      "Let $u = x<sup>2</sup> + 2$ and $v = 3x - 4$, so $u' = 2x$ and $v' = 3$.<br>The product rule gives $f'(x) = 2x(3x - 4) + 3(x<sup>2</sup> + 2) = 9x<sup>2</sup> - 8x + 6$.",
      "For f = uv, use f' = u'v + uv'. Keep one factor unchanged in each term; multiplying u' and v' is not the product rule.",
      "For g(x) = (x<sup>2</sup> + 1)(x + 2), g'(x) = 2x(x + 2) + (x<sup>2</sup> + 1) = 3x<sup>2</sup> + 4x + 1."),

    make(8,'Chain rule (HL)','medium',['chain'],
      "Use the chain rule to find $f'(x)$ for $f(x) = (3x - 2)<sup>4</sup>$.",
      "The outer function is a fourth power and the inner function is $3x - 2$, whose derivative is $3$.<br>Thus $f'(x) = 4(3x - 2)<sup>3</sup>(3) = 12(3x - 2)<sup>3</sup>$.",
      "Composition means one function applied inside another. Differentiate the outer power, leave the inner expression in place, and multiply by the inner derivative.",
      "If g(x) = (2x + 3)<sup>3</sup>, then g'(x) = 3(2x + 3)<sup>2</sup>(2) = 6(2x + 3)<sup>2</sup>."),

    make(9,'Quotient rule (HL)','medium',['quotient'],
      "Use the quotient rule to find $f'(x)$ for $f(x) = (2x + 1)/(x - 3)$, where $x &ne; 3$.",
      "Let $u = 2x + 1$ and $v = x - 3$, so $u' = 2$ and $v' = 1$.<br>By the quotient rule, $f'(x) = [2(x - 3) - (2x + 1)]/(x - 3)<sup>2</sup> = -7/(x - 3)<sup>2</sup>$, for $x &ne; 3$.",
      "Use (u'v - uv')/v<sup>2</sup>. Put brackets around the entire subtracted term and square the whole denominator.",
      "For g(x) = x/(x + 1), g'(x) = [(x + 1) - x]/(x + 1)<sup>2</sup> = 1/(x + 1)<sup>2</sup>, for x &ne; -1."),

    make(10,'Product rule (HL)','medium',['product'],
      "Use the product rule to find $f'(x)$ for $f(x) = (x<sup>2</sup> - 4)(x<sup>3</sup> + 2x)$.",
      "Take $u = x<sup>2</sup> - 4$ and $v = x<sup>3</sup> + 2x$. Then $u' = 2x$ and $v' = 3x<sup>2</sup> + 2$.<br>The product rule gives $f'(x) = 2x(x<sup>3</sup> + 2x) + (x<sup>2</sup> - 4)(3x<sup>2</sup> + 2)$.<br>Expanding and collecting terms gives $f'(x) = 5x<sup>4</sup> - 6x<sup>2</sup> - 8$.",
      "Both factors are polynomials, but the product rule still has only two terms. Differentiate each factor, form u'v + uv', then simplify.",
      "For g(x) = (x<sup>2</sup> - 1)(x<sup>2</sup> + 2), g'(x) = 2x(x<sup>2</sup> + 2) + 2x(x<sup>2</sup> - 1) = 4x<sup>3</sup> + 2x."),

    make(11,'Composite root (HL)','medium',['chain','root'],
      "Find $f'(x)$ for $f(x) = &radic;(2x<sup>2</sup> + 5)$.",
      "Write $f(x) = (2x<sup>2</sup> + 5)<sup>1/2</sup>$. Its inner derivative is $4x$.<br>The chain rule gives $f'(x) = (1/2)(2x<sup>2</sup> + 5)<sup>-1/2</sup>(4x) = 2x/&radic;(2x<sup>2</sup> + 5)$.",
      "A square root of an expression requires both the fractional power rule and the chain rule. Keep the entire inner expression under the square root in the final denominator.",
      "If g(x) = &radic;(3x<sup>2</sup> + 1), then g'(x) = 3x/&radic;(3x<sup>2</sup> + 1)."),

    make(12,'Quotient rule (HL)','medium',['quotient'],
      "Use the quotient rule to find $f'(x)$ for $f(x) = (x<sup>2</sup> + 3)/(2x - 1)$, where $x &ne; 1/2$.",
      "Let $u = x<sup>2</sup> + 3$ and $v = 2x - 1$, so $u' = 2x$ and $v' = 2$.<br>Then $f'(x) = [2x(2x - 1) - 2(x<sup>2</sup> + 3)]/(2x - 1)<sup>2</sup> = (2x<sup>2</sup> - 2x - 6)/(2x - 1)<sup>2</sup>$, for $x &ne; 1/2$.",
      "The derivative of the denominator is 2, not 1. Include it in the second numerator term and keep brackets around that whole term.",
      "For g(x) = (x<sup>2</sup> + 1)/(x + 1), g'(x) = (x<sup>2</sup> + 2x - 1)/(x + 1)<sup>2</sup>, for x &ne; -1."),

    make(13,'Sum + chain (HL)','medium',['sum','chain'],
      "Find $f'(x)$ for $f(x) = (x<sup>2</sup> + 1)<sup>3</sup> - 2(3x - 4)<sup>2</sup>$.",
      "Differentiate the two terms separately using the chain rule.<br>The first gives $3(x<sup>2</sup> + 1)<sup>2</sup>(2x) = 6x(x<sup>2</sup> + 1)<sup>2</sup>$. The second gives $-2[2(3x - 4)(3)] = -12(3x - 4)$.<br>Therefore $f'(x) = 6x(x<sup>2</sup> + 1)<sup>2</sup> - 12(3x - 4)$.",
      "A sum or difference is not a product: differentiate the terms independently. Each powered bracket still needs its own inner derivative, and constant multiples stay outside.",
      "For g(x) = (x<sup>2</sup> + 2)<sup>2</sup> + (2x + 1)<sup>3</sup>, g'(x) = 4x(x<sup>2</sup> + 2) + 6(2x + 1)<sup>2</sup>."),

    make(14,'Product + chain (HL)','medium',['product','chain'],
      "Find $f'(x)$ for $f(x) = (2x + 1)<sup>3</sup>(x<sup>2</sup> - 4)$. Use the product and chain rules.",
      "By the chain rule, the first factor has derivative $6(2x + 1)<sup>2</sup>$. The second has derivative $2x$.<br>The product rule gives $f'(x) = 6(2x + 1)<sup>2</sup>(x<sup>2</sup> - 4) + 2x(2x + 1)<sup>3</sup>$.<br>Factorising gives $f'(x) = 2(2x + 1)<sup>2</sup>(5x<sup>2</sup> + x - 12)$.",
      "Apply the product rule to the two factors, using the chain rule for the cubic bracket. Factor out the common square before simplifying the remaining polynomial.",
      "For g(x) = x<sup>2</sup>(x + 1)<sup>3</sup>, g'(x) = 2x(x + 1)<sup>3</sup> + 3x<sup>2</sup>(x + 1)<sup>2</sup> = x(x + 1)<sup>2</sup>(5x + 2)."),

    make(15,'Negative chain (HL)','medium',['chain','reciprocal'],
      "Find $f'(x)$ for $f(x) = (x<sup>2</sup> - 3x + 5)<sup>-2</sup>$.",
      "The inner derivative is $2x - 3$. Applying the chain rule gives $f'(x) = -2(x<sup>2</sup> - 3x + 5)<sup>-3</sup>(2x - 3)$.<br>As a fraction, $f'(x) = -2(2x - 3)/(x<sup>2</sup> - 3x + 5)<sup>3</sup>$.",
      "The outer power is negative: subtracting 1 from -2 gives -3. Keep the minus sign and multiply by the derivative of the whole inner quadratic. Here the quadratic is always positive, so no real x-values are excluded.",
      "For g(x) = (2x + 1)<sup>-3</sup>, g'(x) = -6(2x + 1)<sup>-4</sup> = -6/(2x + 1)<sup>4</sup>, for x &ne; -1/2."),

    make(16,'Quotient + chain (HL)','medium',['quotient','chain'],
      "Find $f'(x)$ for $f(x) = (x<sup>2</sup> + 1)<sup>2</sup>/(x + 2)$, where $x &ne; -2$.",
      "Let $u = (x<sup>2</sup> + 1)<sup>2</sup>$ and $v = x + 2$. The chain rule gives $u' = 4x(x<sup>2</sup> + 1)$, while $v' = 1$.<br>The quotient rule gives $f'(x) = [4x(x<sup>2</sup> + 1)(x + 2) - (x<sup>2</sup> + 1)<sup>2</sup>]/(x + 2)<sup>2</sup>$.<br>Factorising the numerator gives $f'(x) = (x<sup>2</sup> + 1)(3x<sup>2</sup> + 8x - 1)/(x + 2)<sup>2</sup>$, for $x &ne; -2$.",
      "Use the quotient rule for the overall fraction and the chain rule inside the numerator derivative. Factor out x<sup>2</sup> + 1 before expanding the smaller remaining bracket.",
      "For g(x) = (x + 1)<sup>2</sup>/(x + 3), g'(x) = (x + 1)(x + 5)/(x + 3)<sup>2</sup>, for x &ne; -3."),

    make(17,'Two composites (HL)','hard',['product','chain'],
      "Find $f'(x)$ for $f(x) = (2x - 1)<sup>3</sup>(x<sup>2</sup> + 4)<sup>2</sup>$. Give a factorised answer.",
      "The chain rule gives the factor derivatives $6(2x - 1)<sup>2</sup>$ and $4x(x<sup>2</sup> + 4)$.<br>The product rule gives $f'(x) = 6(2x - 1)<sup>2</sup>(x<sup>2</sup> + 4)<sup>2</sup> + 4x(2x - 1)<sup>3</sup>(x<sup>2</sup> + 4)$.<br>Take out $2(2x - 1)<sup>2</sup>(x<sup>2</sup> + 4)$ and simplify the remaining bracket to obtain $f'(x) = 2(2x - 1)<sup>2</sup>(x<sup>2</sup> + 4)(7x<sup>2</sup> - 2x + 12)$.",
      "Use the product rule with a chain rule for each factor. Extract the smaller power of each common bracket before expanding; this avoids a high-degree polynomial expansion.",
      "For g(x) = (x + 1)<sup>2</sup>(x<sup>2</sup> + 2)<sup>3</sup>, g'(x) = 2(x + 1)(x<sup>2</sup> + 2)<sup>2</sup>(4x<sup>2</sup> + 3x + 2)."),

    make(18,'Quotient + chains (HL)','hard',['quotient','chain'],
      "Find $f'(x)$ for $f(x) = (3x + 1)<sup>4</sup>/(x<sup>2</sup> + 2)$. Give a factorised numerator.",
      "Let $u = (3x + 1)<sup>4</sup>$ and $v = x<sup>2</sup> + 2$. The chain rule gives $u' = 12(3x + 1)<sup>3</sup>$, and $v' = 2x$.<br>The quotient rule gives $f'(x) = [12(3x + 1)<sup>3</sup>(x<sup>2</sup> + 2) - 2x(3x + 1)<sup>4</sup>]/(x<sup>2</sup> + 2)<sup>2</sup>$.<br>Factorising gives $f'(x) = 2(3x + 1)<sup>3</sup>(3x<sup>2</sup> - x + 12)/(x<sup>2</sup> + 2)<sup>2</sup>$.",
      "Apply the quotient rule to the whole function. The powered numerator needs the chain rule; the denominator uses the power and sum rules. Take out a common cubic bracket before simplifying the numerator.",
      "For g(x) = (x + 1)<sup>3</sup>/(x<sup>2</sup> + 1), g'(x) = (x + 1)<sup>2</sup>(x<sup>2</sup> - 2x + 3)/(x<sup>2</sup> + 1)<sup>2</sup>."),

    make(19,'Composite quotient (HL)','hard',['chain','quotient'],
      "Find $f'(x)$ for $f(x) = [(x<sup>2</sup> + 1)/(x - 2)]<sup>3</sup>$, where $x &ne; 2$.",
      "Let $g(x) = (x<sup>2</sup> + 1)/(x - 2)$. The quotient rule gives $g'(x) = [2x(x - 2) - (x<sup>2</sup> + 1)]/(x - 2)<sup>2</sup> = (x<sup>2</sup> - 4x - 1)/(x - 2)<sup>2</sup>$.<br>Now apply the chain rule to the outer cube: $f'(x) = 3[g(x)]<sup>2</sup>g'(x)$.<br>Thus $f'(x) = 3(x<sup>2</sup> + 1)<sup>2</sup>(x<sup>2</sup> - 4x - 1)/(x - 2)<sup>4</sup>$, for $x &ne; 2$.",
      "The outermost operation is cubing a quotient. Differentiate that cube with the chain rule, then differentiate the inner quotient. The two squared denominators multiply to a fourth power.",
      "For g(x) = [(x + 1)/(x - 1)]<sup>2</sup>, the inner derivative is -2/(x - 1)<sup>2</sup>. Hence g'(x) = -4(x + 1)/(x - 1)<sup>3</sup>, for x &ne; 1."),

    make(20,'Mixed rules (HL)','hard',['product','quotient','chain'],
      "Find $f'(x)$ for $f(x) = [(x<sup>2</sup> + 1)<sup>2</sup>(2x - 3)<sup>3</sup>]/(x + 1)$, where $x &ne; -1$. Give a factorised numerator.",
      "Let $A = x<sup>2</sup> + 1$, $B = 2x - 3$, $u = A<sup>2</sup>B<sup>3</sup>$ and $v = x + 1$.<br>Using the product and chain rules, $u' = 4xAB<sup>3</sup> + 6A<sup>2</sup>B<sup>2</sup> = AB<sup>2</sup>(4xB + 6A)$; also $v' = 1$.<br>The quotient rule gives $f'(x) = AB<sup>2</sup>[(4xB + 6A)(x + 1) - AB]/(x + 1)<sup>2</sup>$.<br>The bracket simplifies to $12x<sup>3</sup> + 5x<sup>2</sup> - 8x + 9$. Hence $f'(x) = (x<sup>2</sup> + 1)(2x - 3)<sup>2</sup>(12x<sup>3</sup> + 5x<sup>2</sup> - 8x + 9)/(x + 1)<sup>2</sup>$, for $x &ne; -1$.",
      "Start with the quotient rule. Its numerator derivative is itself a product, and both factors in that product need the chain rule. Naming repeated brackets A and B keeps the algebra manageable. Factor before expanding the final small bracket.",
      "For g(x) = x<sup>2</sup>(x + 2)<sup>3</sup>/(x + 1), the same rules give g'(x) = x(x + 2)<sup>2</sup>(4x<sup>2</sup> + 7x + 4)/(x + 1)<sup>2</sup>, for x &ne; -1."),
  ];
})();
