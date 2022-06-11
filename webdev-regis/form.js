let btnRef = document.querySelector("#validatedSend");
let formRef = document.querySelector("form")
let i_nameRef = document.querySelector("#inp-name")
let i_emailRef = document.querySelector("#inp-email")
let i_numRef = document.querySelector("#inp-number")
let msgRef = document.querySelector("#submitMsg")
let canSubmit = false;

btnRef.addEventListener("click", validateSend);

function dl_win() {
    window.open("https://ninite.com/chrome-vscode/ninite.exe", '_blank').focus();
};

function dl_macVSC() {
    window.open("https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal", '_blank').focus();   
};

function dl_macChrome() {
    window.open("https://www.google.com/chrome/", '_blank').focus();
};

function validateSend(submitEvent) {
    return
    msgRef.innerHTML = "";
    submitEvent.preventDefault();
    i_nameRef.value = i_nameRef.value.trim();
    i_emailRef.value = i_emailRef.value.trim();
    i_numRef.value = i_numRef.value.trim();
    val1 = (/^[A-Za-z ]+$/.test(i_nameRef.value))
    val2 = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(i_emailRef.value))
    val3 = (/^(\+)?([ 0-9]){6,20}$/.test(i_numRef.value))
    if (val1 && val2 && val3 && canSubmit) {
        formRef.submit();
        msgRef.innerHTML = (
            `<div style="color: green; margin-bottom: 0.5em; font-weight: 600;">
            Pendaftaran Berhasil!
            </div>
            <div style="text-align: justify">
            Terima kasih sudah melakukan registrasi untuk Web Dev Workshop PPIT Shenzhen.
            <strong>Mohon pastikan</strong> telah melakukan instali aplikasi yang diperlukan
            sesuai dengan sistem operasi perangkat Anda.
            </div>`
        );
        canSubmit = false;
    } else {
        let errorMessage = "";
        if (!val1) errorMessage += `<p class="mb-2">Mohon pastikan bahwa nama lengkap yang telah diketik adalah valid. </p>`;
        if (!val2) errorMessage += `<p class="mb-2">Mohon pastikan bahwa email yang telah diketik adalah valid. </p>`;
        if (!val3) errorMessage += `<p class="mb-2">Mohon pastikan bahwa nomor telepon yang telah diketik adalah valid. </p>`;
        if (!canSubmit) errorMessage += `<p class="mb-2">Anda sudah selesai melakukan registrasi! <p>`;

        msgRef.innerHTML = (
            `<div style="color: red; margin-bottom: 0.5em; font-weight: 600;">
            Pendaftaran Gagal!
            </div>
            <div style="text-align: justify;">
            ${errorMessage}
            </div>`
        )
    }
}