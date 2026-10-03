export const derivativeQuiz = [
  {
    "topic": "slope",
    "correct": 0,
    "options": [
      "6",
      "9",
      "3"
    ],
    "question": [
      "f(x) = x² için x = 3 noktasındaki teğet eğimi nedir?",
      "What is the tangent slope of f(x) = x² at x = 3?"
    ],
    "solution": [
      "f′(x) = 2x, dolayısıyla f′(3) = 6.",
      "f′(x) = 2x, so f′(3) = 6."
    ],
    "feedback": [
      [
        "Doğru: eğim türev değeridir.",
        "9 noktanın yüksekliği f(3)’tür; eğim değildir.",
        "3, x koordinatıdır; eğimi bulmak için türevde yerine yazılır."
      ],
      [
        "Correct: the slope is the derivative value.",
        "9 is the height f(3), not the slope.",
        "3 is the x coordinate; substitute it into the derivative to get the slope."
      ]
    ]
  },
  {
    "topic": "tangent",
    "correct": 1,
    "options": [
      "y = 2x + 1",
      "y = 2x − 1",
      "y = x + 1"
    ],
    "question": [
      "f(x) = x² eğrisinin x = 1 noktasındaki teğeti hangisidir?",
      "Which line is tangent to f(x) = x² at x = 1?"
    ],
    "solution": [
      "Nokta (1,1), eğim 2: y − 1 = 2(x − 1).",
      "The point is (1,1) and the slope is 2: y − 1 = 2(x − 1)."
    ],
    "feedback": [
      [
        "Bu doğru (1,1) noktasından geçmez; sabit terimin işaretini kontrol edin.",
        "Doğru: hem nokta hem eğim koşulu sağlanır.",
        "Eğim 1 değil, f′(1) = 2 olmalıdır."
      ],
      [
        "This line does not pass through (1,1); check the sign of the constant.",
        "Correct: both the point and slope conditions hold.",
        "The slope must be f′(1) = 2, not 1."
      ]
    ]
  },
  {
    "topic": "normal",
    "correct": 2,
    "options": [
      "4",
      "−4",
      "−1/4"
    ],
    "question": [
      "f(x) = x² için x = 2 noktasındaki normalin eğimi nedir?",
      "What is the normal slope of f(x) = x² at x = 2?"
    ],
    "solution": [
      "Teğet eğimi 4’tür; dik normalin eğimi −1/4 olur.",
      "The tangent slope is 4; the perpendicular normal slope is −1/4."
    ],
    "feedback": [
      [
        "4 teğetin eğimidir, normalin değil.",
        "Yalnızca işareti değiştirmek yetmez; negatif tersini alın.",
        "Doğru: 4 · (−1/4) = −1."
      ],
      [
        "4 is the tangent slope, not the normal slope.",
        "Changing the sign is not enough; take the negative reciprocal.",
        "Correct: 4 · (−1/4) = −1."
      ]
    ]
  },
  {
    "topic": "normal",
    "correct": 0,
    "options": [
      "x = 0",
      "y = 0",
      "y = x"
    ],
    "question": [
      "f(x) = x² eğrisinin x = 0 noktasındaki normali hangisidir?",
      "Which line is normal to f(x) = x² at x = 0?"
    ],
    "solution": [
      "Teğet y = 0 yataydır; normal x = 0 düşeydir.",
      "The tangent y = 0 is horizontal; the normal x = 0 is vertical."
    ],
    "feedback": [
      [
        "Doğru: yatay teğetin normali düşeydir.",
        "y = 0 teğettir; normal ona dik olmalıdır.",
        "y = x yatay teğete dik değildir."
      ],
      [
        "Correct: the normal to a horizontal tangent is vertical.",
        "y = 0 is the tangent; the normal must be perpendicular to it.",
        "y = x is not perpendicular to the horizontal tangent."
      ]
    ]
  },
  {
    "topic": "parallel",
    "correct": 1,
    "options": [
      "a = 3",
      "a = 2",
      "a = 4"
    ],
    "question": [
      "f(x) = x² teğeti y = 4x + 3 doğrusuna paralelse teğme noktasının x koordinatı kaçtır?",
      "If a tangent to f(x) = x² is parallel to y = 4x + 3, what is its x coordinate?"
    ],
    "solution": [
      "Paralellik için 2a = 4 gerekir; a = 2.",
      "Parallel slopes require 2a = 4, so a = 2."
    ],
    "feedback": [
      [
        "3 sabit terimdir; paralellik eğimle belirlenir.",
        "Doğru: f′(2) = 4.",
        "4 istenen eğimdir; x koordinatı değildir."
      ],
      [
        "3 is the constant term; parallelism depends on the slope.",
        "Correct: f′(2) = 4.",
        "4 is the required slope, not the x coordinate."
      ]
    ]
  },
  {
    "topic": "extremum",
    "correct": 2,
    "options": [
      "Yerel maksimum / Local maximum",
      "Yerel minimum / Local minimum",
      "Ekstremum değil / Neither"
    ],
    "question": [
      "f(x) = x³ için x = 0 noktası nasıl sınıflandırılır?",
      "How is x = 0 classified for f(x) = x³?"
    ],
    "solution": [
      "f′(x) = 3x² her iki tarafta pozitiftir; sıfırda ekstremum yoktur.",
      "f′(x) = 3x² is positive on both sides; there is no extremum at zero."
    ],
    "feedback": [
      [
        "Maksimum için artıştan azalışa geçiş gerekirdi.",
        "Minimum için azalıştan artışa geçiş gerekirdi.",
        "Doğru: yatay teğet tek başına ekstremum kanıtlamaz."
      ],
      [
        "A maximum would require a change from increasing to decreasing.",
        "A minimum would require a change from decreasing to increasing.",
        "Correct: a horizontal tangent alone does not prove an extremum."
      ]
    ]
  },
  {
    "topic": "tangent",
    "correct": 0,
    "options": [
      "y = 2x",
      "y = 2x + 2",
      "y = x + 1"
    ],
    "question": [
      "f(x) = x² + 1 için x = 1 noktasındaki teğet hangisidir?",
      "Which line is tangent to f(x) = x² + 1 at x = 1?"
    ],
    "solution": [
      "Nokta (1,2), eğim 2: y − 2 = 2(x − 1), yani y = 2x.",
      "The point is (1,2), slope 2: y − 2 = 2(x − 1), so y = 2x."
    ],
    "feedback": [
      [
        "Doğru: doğru (1,2) noktasından geçer ve eğimi 2’dir.",
        "Eğim doğru, fakat bu doğru (1,2) noktasından geçmez.",
        "Noktadan geçse de eğimi 1’dir; gerekli eğim 2."
      ],
      [
        "Correct: the line passes through (1,2) and has slope 2.",
        "The slope is right, but this line does not pass through (1,2).",
        "It passes through the point, but its slope is 1 instead of 2."
      ]
    ]
  },
  {
    "topic": "tangent",
    "correct": 1,
    "options": [
      "1",
      "2",
      "0"
    ],
    "question": [
      "x² eğrisine (0,−1) noktasından geçen kaç farklı teğet çizilir?",
      "How many tangents to y = x² pass through (0,−1)?"
    ],
    "solution": [
      "y = 2ax − a² denkleminde noktayı yazınca a² = 1; a = ±1.",
      "Substitute the point into y = 2ax − a²: a² = 1, so a = ±1."
    ],
    "feedback": [
      [
        "a² = 1 denkleminin hem +1 hem −1 kökünü kullanın.",
        "Doğru: y = 2x − 1 ve y = −2x − 1.",
        "Noktanın eğri dışında olması teğet çizilemeyeceği anlamına gelmez."
      ],
      [
        "Use both roots of a² = 1: +1 and −1.",
        "Correct: y = 2x − 1 and y = −2x − 1.",
        "A point outside the curve can still lie on a tangent line."
      ]
    ]
  }
];
