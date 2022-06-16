// Submit Button Event Handling
let btnRef = document.querySelector("#validatedSend");
btnRef.addEventListener("click", validateSend);

// Form References
let r_Form = document.querySelector("form");
let i_Name = document.querySelector("#inp-Name");
let i_Email = document.querySelector("#inp-Email");
let i_WA = document.querySelector("#inp-WhatsApp");
let i_Edu = document.querySelector("#inp-Education");
let e1 = document.querySelector("#e1");
let e2 = document.querySelector("#e2");
let e3 = document.querySelector("#e3");
let e4 = document.querySelector("#e4");
let e5 = document.querySelector("#e5");
let cb_Referral = document.querySelectorAll(`[name="entry.1591602500"]`);
let cb_L1_dataTrigger = cb_Referral.item(2);
let cb_L1_dataDeliverer = document.querySelector(`[name="entry.1591602500.other_option_response"]`);
let cb_L1_data = document.querySelector("#inp-Lainnya1");
let r_Msg = document.querySelector("#submitMsg");
let r_MsgBox = document.querySelector("#msg-box");

// Process Functions
function validateSend(submitEvent) {
    submitEvent.preventDefault();

    r_MsgBox.style.display = "none";
    r_Msg.innerHTML = "";
    e1.innerHTML, e2.innerHTML, e3.innerHTML, e4.innerHTML, e5.innerHTML = "", "", "", "", "";

    i_Name.value = i_Name.value.trim();
    i_Email.value = i_Email.value.trim();
    i_WA.value = i_WA.value.trim();
    i_Edu.value = i_Edu.value.trim();
    
    cb_L1_dataDeliverer.value = cb_L1_data.value;


    c1 = (/^[A-Za-z ]+$/.test(i_Name.value));
    c2 = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(i_Email.value));
    c3 = (/^(\+)?([ 0-9]){6,20}$/.test(i_WA.value));
    c4 = (/^[()-\w\s]+$/.test(i_Edu.value));
    c5 = (cb_Referral.item(0).checked) || (cb_Referral.item(1).checked) || (cb_L1_dataTrigger.checked && cb_L1_dataDeliverer.value != "")

    if (!cb_L1_dataTrigger.checked) {
        cb_L1_dataDeliverer.disabled = true;
    } else {
        cb_L1_dataDeliverer.disabled = false;
    }

    if (c1 && c2 && c3 && c4 && c5) {
        fetch("https://api.nitrous.dev:23450/cf2022/send-conf", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                "email": i_Email.value,
                "fname": i_Name.value.split(" ")[0]
            })
          }).then(res => {
            res.json().then((resData) => {
                if (resData.status == 0) {
                    r_MsgBox.style.display = "block";
                    r_Msg.innerHTML = 
                    `<div style="color: red; margin-bottom: 0.5em; font-weight: 600; font-size: 1.35em;">
                        Pendaftaran Gagal! 
                    </div>
                    <div style="text-align: justify">
                        <p class="px-0">Anda sudah selesai melakukan registrasi dengan email yang diketik.</p>
                    </div>`;
                } else if (resData.status == 1) {
                    r_Form.submit();
                    
                    r_MsgBox.style.display = "block";
                    r_Msg.innerHTML = (
                        `<div style="color: green; margin-bottom: 0.5em; font-weight: 600; font-size: 1.35em;">
                        Pendaftaran Berhasil!
                        </div>
                        <div style="text-align: justify">
                            <p class="px-0">Terima kasih sudah melakukan registrasi untuk Career Fair by PPITSZ. Mohon untuk memerika email Anda secara berkala untuk pengumuman-pengumuman terbaru!</p>
                            
                            <img src="https://ppitshenzhen.org/career-fair/assets/whatsapp.png" alt="WhatsApp Logo" width="180px" style="margin-left:1px" tabindex="0" class="mb-2">
                            <p class="px-0 mb-2">Jangan lupa juga untuk bergabung ke group WhatsApp Career Fair agar tidak terlewat pengumuman-pengumuman penting seputar acara ya!</p>
                            <p class="px-0 mb-2" style="font-weight: 700">QR Code Group</p>
                            <img src="https://ppitshenzhen.org/career-fair/assets/whatsapp-qr.png" alt="WhatsApp Logo" width="250px" style="margin-left:1px" tabindex="0" class="mb-2">
                        </div>`
                    );
                }
            });
          });

    } else {
        if (!c1) e1.innerHTML = `Mohon pastikan bahwa nama lengkap yang telah diketik adalah nama lengkap yang valid.`;
        if (!c2) e2.innerHTML = `Mohon pastikan bahwa email yang telah diketik adalah alamat email yang valid.`;
        if (!c3) e3.innerHTML = `Mohon pastikan bahwa nomor telepon yang telah diketik adalah nomor telepon yang valid.`;
        if (!c4) e4.innerHTML = `Mohon pastikan bahwa institusi pendidikan yang telah diketik adalah nama institusi pendidikan yang valid.`;
        if (!c5) e5.innerHTML = `Mohon pastikan bahwa minimal satu sumber pengetahuan acara telah dipilih.`;

        r_Form.scrollIntoView();
    };
};
