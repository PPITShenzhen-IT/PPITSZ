const btnRef = document.querySelector("#login-btn");
const pwRef = document.querySelector("#inp-pw");
const navbarRef = document.querySelector("nav");
const mainContentRef = document.querySelector("#resourcesContainer");
const footerRef = document.querySelector("footer");
const loginRef = document.querySelector("#form-box")
const loginMsgRef = document.querySelector("#loginMsg")
const copyHTMLBtns = document.querySelectorAll(".copyHTML");
const copyCSSBtns = document.querySelectorAll(".copyCSS");
const checkMarks = document.querySelectorAll("i.bi");

const PWHASH = "6eb8b7adae5e7155a5ac9ad440c00352956a6772ad03386ec0bea91f";

copyHTMLBtns.forEach((copyHTMLBtn) => {
    let parentRef = copyHTMLBtn.parentElement.id;

    copyHTMLBtn.addEventListener("click", (copyEvt) => {
        copyEvt.preventDefault();

        HTMLAreaRef = document.querySelector(`#${parentRef} .area_HTML`);
        checkRef = document.querySelector(`#${parentRef} i.checkHTML`);

        checkMarks.forEach((checkMark) => {
            if (!checkMark.classList.contains("d-none")) {
                checkMark.classList.add("d-none");
            }
        });

        try {
            HTMLAreaRef.select();
            document.execCommand("copy");
            checkRef.classList.remove("d-none");
        }
        catch (ex) {
            console.warn("Copy failed.", ex);
            return prompt("Automatic copy feature unavailable. Press Ctrl+C and Enter.", HTMLAreaRef.value);
        }
    });
});

copyCSSBtns.forEach((copyCSSBtn) => {
    let parentRef = copyCSSBtn.parentElement.id;

    copyCSSBtn.addEventListener("click", (copyEvt) => {
        copyEvt.preventDefault();

        CSSAreaRef = document.querySelector(`#${parentRef} .area_CSS`);
        checkRef = document.querySelector(`#${parentRef} i.checkCSS`);

        checkMarks.forEach((checkMark) => {
            if (!checkMark.classList.contains("d-none")) {
                checkMark.classList.add("d-none");
            }
        });

        try {
            CSSAreaRef.select();
            document.execCommand("copy");
            checkRef.classList.remove("d-none");
        }
        catch (ex) {
            console.warn("Copy failed.", ex);
            return prompt("Automatic copy feature unavailable. Press Ctrl+C and Enter.", CSSAreaRef.value);
        }
    });
});


btnRef.addEventListener("click", loginFunc);

function hashString(input) {
    return CryptoJS.SHA3(input, {outputLength: 224}).toString(CryptoJS.enc.Base64);
}

function loginFunc(clickEvt) {
    clickEvt.preventDefault();
    if (hashString(pwRef.value) == PWHASH) {
        navbarRef.classList.remove("d-none");
        mainContentRef.classList.remove("d-none");
        footerRef.classList.remove("d-none");
        loginRef.classList.add("d-none");
    } else {
        loginMsgRef.innerHTML = "Password Salah!";
        pwRef.value = "";
    }

}

