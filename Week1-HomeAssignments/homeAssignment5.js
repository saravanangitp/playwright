//Program with switch(true)
function getScoreGrades(score)
{
    switch(true)
    {
        case score>=90 && score<100:
            return "A";
        case score>=80 && score<90:
            return "B";
        case score>=70 && score<80:
            return "C";
        case score>=60 && score<70:
            return "D";
        case score>=50 && score<60:
            return "E";
        case score<50:
            return "F";
    }
}

console.log("Grade for the score 90 is '" + getScoreGrades(90));
console.log("Grade for the score 89 is '" + getScoreGrades(89));
console.log("Grade for the score 73 is '" + getScoreGrades(73));
console.log("Grade for the score 65 is '" + getScoreGrades(65));
console.log("Grade for the score 51 is '" + getScoreGrades(51));
console.log("Grade for the score 45 is '" + getScoreGrades(45));