let question_number_element = document.getElementById("question-number");
        let question_txt_element = document.getElementById("question-txt");
        let option_1_element = document.getElementById("option1");
        let option_2_element = document.getElementById("option2");
        let option_3_element = document.getElementById("option3");
        let option_4_element = document.getElementById("option4");
        let next_button = document.getElementById("next-button");
        let time_element = document.getElementById("timer");
        let loader = document.querySelector(".loader");
        let question_container = document.querySelector(".container");

        let current_question_number = 0;
        let score = 0;
        let time;
        const total_time = 15;
        let sec = total_time;

        function timer() {
            time_element.innerHTML = sec;
            sec--;
            if (sec == 0) {
                sec = total_time;
                clearInterval(time);
                checkIfScore();
                current_question_number++;
                showQuestion();
            }
        }

        function checkIfScore() {
            let optionIdSelected = document.querySelector('input[name=opt]:checked');
            let correctOptionIndex = quizQuestions[current_question_number].correctOption.trim().charCodeAt(0) - 65;

            if (optionIdSelected != null) {
                let selectedOptionIndex = Array.from(document.querySelectorAll('input[name=opt]')).indexOf(optionIdSelected);
                if (selectedOptionIndex === correctOptionIndex) {
                    score++;
                }
            }
        }

        function showQuestion() {
            sec = total_time;
            clearInterval(time);
            timer();
            time = setInterval(timer, 1000);

            document.querySelectorAll("input[name=opt]").forEach(option => option.checked = false);

            if (current_question_number >= quizQuestions.length) {
                goToResultPage();
            } else {
                question_number_element.innerHTML = (current_question_number + 1) + ". ";
                question_txt_element.innerHTML = quizQuestions[current_question_number].question;
                option_1_element.innerHTML = quizQuestions[current_question_number].options[0];
                option_2_element.innerHTML = quizQuestions[current_question_number].options[1];
                option_3_element.innerHTML = quizQuestions[current_question_number].options[2];
                option_4_element.innerHTML = quizQuestions[current_question_number].options[3];
            }
        }

        next_button.addEventListener('click', () => {
            checkIfScore();
            current_question_number++;
            if (current_question_number >= quizQuestions.length) {
                goToResultPage();
            } else {
                showQuestion();
            }
        });

        function goToResultPage() {
            current_question_number = 0;
            localStorage.setItem("score", score);
            location.href = "./resultPage.html";
        }

        let quizQuestions = [];
        const URL = 'https://script.google.com/macros/s/AKfycbzqWQqqEyP7NSEDn08Z-VgPlJc9OVjmFctmHJWrSViHTQb2NIJafYSWxXIfvkc9kE52/exec';
        async function getData() {
            loader.style.display = 'flex';
            question_container.style.display = 'none';
            try {
                const response = await fetch(URL);
                const data = await response.json();
                quizQuestions = data;
                loader.style.display = 'none';
                question_container.style.display = 'block';
                showQuestion();
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        getData();
