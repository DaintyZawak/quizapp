const preamble = {
    timeLimit: 20 * 60,
    timer: null,

    updateTimerDisplay: () => {
        const timeElement = document.getElementById("time");
        const minutes = Math.floor(quiz.timeLimit / 60);
        const seconds = quiz.timeLimit % 60;
        timeElement.textContent = `Time remaining: ${minutes}m ${seconds}s`;
    },

    setTimer: () => {
        preamble.timer = setInterval(() => {
            preamble.timeLimit--;
            preamble.updateTimerDisplay();

            if (preamble.timeLimit <= 0) {
                clearInterval(preamble.timer);
                timer.endQuiz()
            }
        }, 1000);
  },
};


endQuiz: () => {
    const timeElement = document.getElementById("time");
    timeElement.textContent = "";
} 


const startQuiz = document.getElementById("startBtn");
const overallWrap = document.getElementsByClassName("overallWrapper");
const quizWrap = document.getElementById("quizWrapper"); 
const preambler = document.querySelector("#preamble");

const start = () => {
    quizWrap.style.display = "block";
    preambler.style.display = "none";
}

const btnClick = () => {
    start();
    preamble.setTimer();
}

overallWrap.addEventListener( "click", (e) => {
    e.preventDefault();
    e.stopPropagation();
})

startQuiz.addEventListener("click", btnClick);

const quiz = {
    // 1. PROPERTIES
    // 1a. QUESTIONS & ANSWERS

    serialQs: [
        {
            question: "What is Computer Coding?",
            option: [
                "List of Functions",
                "TV show",
                "Tells a computer what to do",
                "radio show",
            ],
            answer: 2, // arrays start with 0, so answer is "Tells a computer what to do"
        },
        {
            question: "Which of these is not a Programming Language?",
            option: ["Ruby", "Python", "Banana", "Java"],
            answer: 2,
        },
        {
            question:
                "What is the primary purpose of forking a repository in a collaborative development workflow?",
            option: [
                "Create a backup copy of the repository",
                "Contribute changes to someone else's project without directly modifying the original",
                "Automatically synchronize changes between repositories",
                "Archive a repository and make it read-only",
            ],
            answer: 1,
        },
        {
            question: "Which of the following defines an Algorithm?",
            option: [
                "It is a symbolic representation",
                "It is the documentation of Program Logic",
                "It is a list of sequence of steps require to solve a problem",
                "It is the actual Program code",
            ],
            answer: 2,
        },

        {
            question: "People who writes code are called what?",
            option: ["Professors", "Programmers", "Cryptographers", "Manufacturers"],
            answer: 1,
        },
        {
            question:
                "Which property is used to set the background color of an element in CSS?",
            option: ["background-color", "color", "text-color", "bgcolor"],
            answer: 0,
        },
        {
            question: "Which of this does NOT run using a computer program?",
            option: ["Bicycles", "Rockets", "Trains", "Cars"],
            answer: 0,
        },
        {
            question: "The Programming Process is what?",
            option: [
                "System-development Process",
                "Coding Process",
                "Testing Process",
                "Problem solving Process",
            ],
            answer: 3,
        },

        {
            question: "What does the '=== ' operator in JavaScript compare?",
            option: [
                "Values and data types",
                "Only values",
                "Only data types",
                "References to objects",
            ],
            answer: 0,
        },
        {
            question:
                "What is the purpose of version control systems (e.g., Git) in software development?",
            option: [
                "To write unit tests for code",
                "To optimize database queries",
                "To track changes in code and collaborate with others",
                "To design user interfaces",
            ],
            answer: 2,
        },
        {
            question: "What does incrementing mean?",
            option: [
                "Squaring",
                "Adding One",
                "Subtracting One",
                "Setting initial value",
            ],
            answer: 1,
        },
        {
            question: "What does the term 'API' stand for?",
            option: [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Application Process Integration",
                "Automated Programming Interface",
            ],
            answer: 0,
        },
        {
            question: "What is a SQL injection attack?",
            option: [
                "A method to optimize SQL queries",
                "A way to inject malicious code into a database by manipulating SQL queries",
                "A type of database indexing technique",
                "A method to create new database tables",
            ],
            answer: 1,
        },
        {
            question: "In HTML, what is the purpose of the 'dl' element?",
            option: [
                "To create a numbered list",
                "To define a description list",
                "To display a block of code",
                "To represent a division or section of a document",
            ],
            answer: 1,
        },

        {
            question: "What is the purpose of a 'git clone' command in Git?",
            option: [
                "To create a new Git repository",
                "To create a copy of a remote repository on your local machine",
                "To create a branch in a Git repository",
                "To undo the last commit in a repository",
            ],
            answer: 1,
        },
        {
            question: "What is the purpose of the 'let' keyword in JavaScript?",
            option: [
                "To declare a constant variable",
                "To declare a block-scoped variable",
                "To declare a global variable",
                "To declare a function",
            ],
            answer: 2,
        },
        {
            question: "What does 'HTML' stands for?",
            option: [
                "Home Tool Markup Language",
                "HyperLink and Textual Markup Language",
                "High-level Text Management Language",
                "HyperText Markup Language",
            ],
            answer: 3,
        },

        {
            question: "What is the purpose of 'break' statement in a loop?",
            option: [
                "To end the loop and transfer control to the next statement outside the loop",
                "To restart the loop from the beginning",
                "To skip the current iteration and move to the next one",
                "To signal an error and terminate the program",
            ],
            answer: 0,
        },
        {
            question:
                "Which CSS property is used to add rounded corners to an element?",
            option: [
                "border-round",
                "corner-radius",
                "border-radius",
                "rounded-corners",
            ],
            answer: 2,
        },
        {
            question: "Which HTML tag is used to create an hyperlink?",
            option: ["<link>", "<a>", "<hlink>", "<url>"],
            answer: 1,
        },
    ],

    // 2. HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // 3. GAME FLAGS
    now: 0,
    score: 0,

    // INIT QUIZ HTML
    init: () => {
        // 3a. QUESTIONS & ANSWERS WRAPPER
        quiz.hWrap = document.getElementById("quizWrapper");

        // 3b. QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // 3c. ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // 3d. GO!
        quiz.draw();
    },

    // 4. DRAW QUESTION
    draw: () => {
        // 4a. QUESTION

        quiz.hQn.innerHTML = quiz.serialQs[quiz.now].question;

        // 4b. OPTIONS
        quiz.hAns.innerHTML = "";

        for (let i in quiz.serialQs[quiz.now].option) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizoption" + i;
            quiz.hAns.appendChild(radio);

            let label = document.createElement("label");
            label.innerHTML = quiz.serialQs[quiz.now].option[i];
            label.setAttribute("for", "quizoption" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => {
                quiz.select(label);
            });
            quiz.hAns.appendChild(label);
        }
    },

    // 4c. OPTION SELECTED
    select: (option) => {
        //4d. DETACH ALL ONCLICK

        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // 5. FACT-CHECK
        const feedback = document.getElementById("feedback");
        feedback.textContent = "";

        let correct = option.dataset.idx == quiz.serialQs[quiz.now].answer;
        if (correct) {
            option.classList.add("correct");
            feedback.textContent = "That's correct!";

            quiz.score++;
        } else {
            option.classList.add("wrong");
            feedback.textContent = `That's incorrect! The correct answer is: ${quiz.serialQs[quiz.now].option[quiz.serialQs[quiz.now].answer]
                }.`;
        }

        // 5a. NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(() => {
            if (quiz.now < quiz.serialQs.length) {
                quiz.draw();
            } else {
                quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.serialQs.length} correctly.`;
                quiz.hAns.innerHTML = "";
            }
        }, 2000);
    },

    // 5b. RESTART QUIZ

    reset: () => {
        quiz.now = 0;
        quiz.score = 0;
        quiz.draw();
    },
};

window.addEventListener("load", quiz.init);
