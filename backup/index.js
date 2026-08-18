const linkdin = document.querySelector('.linkdin');//(. use to target class )

linkdin.addEventListener('click', () => {
  window.open('https://www.linkedin.com/in/masud-hashemi-b4511b381/', '_blank');
});


const github = document.querySelector('.git');
github.addEventListener('click', () => {
  window.open('https://github.com/', '_blank');
});

const blurBack = document.querySelector('.blur_back');
const oneskill = document.querySelector('#oneskill');//(# use to target id )
const skilllink1 = document.querySelector('#skill_one');
const closebtn = document.querySelector('#skill_one .c_close');
const certificate = document.querySelector('.certificate');

// skill one popup

oneskill.onclick = function () {
  skilllink1.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn.onclick = function () {
  skilllink1.classList.remove('show');
  blurBack.classList.remove('blur');
}

certificate.addEventListener('click', () => {
  window.open('certificates/certificate-html-css-.jpg', '_blank');
});


const twoskill = document.querySelector('#twoskill');
const skilllink2 = document.querySelector('#skill_two');
const closebtn2 = document.querySelector('#skill_two .c_close');
twoskill.onclick = function () {
  skilllink2.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn2.onclick = function () {
  skilllink2.classList.remove('show');
  blurBack.classList.remove('blur');
}

const threeskill = document.querySelector('#threekill');
const skilllink3 = document.querySelector('#skill_three');
const closebtn3 = document.querySelector('#skill_three .c_close');
threeskill.onclick = function () {
  skilllink3.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn3.onclick = function () {
  skilllink3.classList.remove('show');
  blurBack.classList.remove('blur');
}

const fourskill = document.querySelector('#fourskill');
const skilllink4 = document.querySelector('#skill_four');
const closebtn4 = document.querySelector('#skill_four .c_close');
fourskill.onclick = function () {
  skilllink4.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn4.onclick = function () {
  skilllink4.classList.remove('show');
  blurBack.classList.remove('blur');
}


const fiveskill = document.querySelector('#fiveskill');
const skilllink5 = document.querySelector('#skill_five');
const closebtn5 = document.querySelector('#skill_five .c_close');
fiveskill.onclick = function () {
  skilllink5.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn5.onclick = function () {
  skilllink5.classList.remove('show');
  blurBack.classList.remove('blur');
}


const sixskill = document.querySelector('#sixskill');
const skilllink6 = document.querySelector('#skill_six');
const closebtn6 = document.querySelector('#skill_six .c_close');
sixskill.onclick = function () {
  skilllink6.classList.add('show');
  blurBack.classList.add('blur');
}
closebtn6.onclick = function () {
  skilllink6.classList.remove('show');
  blurBack.classList.remove('blur');
}

// project popup

// Project 1 popup
const projectOne = document.querySelector('#Project_1');
const linkToProject1 = document.querySelector('#linkToProject_1');
const closeProject1 = document.querySelector('#close1');

linkToProject1.onclick = function () {
  projectOne.classList.add('show');
  blurBack.classList.add('blur');
}

closeProject1.onclick = function () {
  projectOne.classList.remove('show');
  blurBack.classList.remove('blur');
}

// Project 2 popup
const projectTwo = document.querySelector('#Project_2');
const linkToProject2 = document.querySelector('#linkToProject_2');
const closeProject2 = document.querySelector('#close2');

linkToProject2.onclick = function () {
  projectTwo.classList.add('show');
  blurBack.classList.add('blur');
}

closeProject2.onclick = function () {
  projectTwo.classList.remove('show');
  blurBack.classList.remove('blur');
}

// Project 3 popup
const projectThree = document.querySelector('#Project_3');
const linkToProject3 = document.querySelector('#linkToProject_3');
const closeProject3 = document.querySelector('#close3');

linkToProject3.onclick = function () {
  projectThree.classList.add('show');
  blurBack.classList.add('blur');
}

closeProject3.onclick = function () {
  projectThree.classList.remove('show');
  blurBack.classList.remove('blur');
}

// Project 4 popup
const projectFour = document.querySelector('#Project_4');
const linkToProject4 = document.querySelector('#linkToProject_4');
const closeProject4 = document.querySelector('#close4');

linkToProject4.onclick = function () {
  projectFour.classList.add('show');
  blurBack.classList.add('blur');
}

closeProject4.onclick = function () {
  projectFour.classList.remove('show');
  blurBack.classList.remove('blur');
}
