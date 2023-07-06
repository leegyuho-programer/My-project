//랜덤번호 지정
//유저가 번호 입력 -> go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 Down!!
//랜덤번호 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultText = document.getElementById("result-text");
let resetButton = document.getElementById("reset-button");
let resultAreaImg = document.getElementById("first-img")
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
userInput.value = "";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value;

    if(userValue > 100 || userValue < 1){
        resultText.textContent = "1과 100사이 숫자를 입력해 주세요";
        return;
    }

    if(history.includes(userValue)){
        resultText.textContent = "이미 입력한 숫자입니다."
        return;
    }

    chances --;
    chanceArea.textContent=`남은 목숨: ${chances}개`;
    console.log("chance", chances);

    if(userValue < computerNum){
        resultAreaImg.src = "https://media0.giphy.com/media/3ov9jExd1Qbwecoqsg/200.gif";
        resultText.textContent = "UP!!!"
    }else if(userValue > computerNum){
        resultAreaImg.src = "https://media.giphy.com/media/r2puuhrnjG7vy/giphy.gif";
        resultText.textContent = "DOWN!!!"
    }else {
        resultAreaImg.src = "https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif";
        resultText.textContent = "맞췄습니다!!!"
        gameOver = true;
    }

    history.push(userValue);

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver){
        playButton.disabled = true;
    }
}

function reset(){
    userInput.value = "";
    pickRandomNum();
    resultText.textContent = "맞기 싫으면 맞춰라";
    chances = 5;
    gameOver = false;
    playButton.disabled = false;
    chanceArea.textContent=`남은 목숨: ${chances}개`;
    history = [];
}
pickRandomNum();