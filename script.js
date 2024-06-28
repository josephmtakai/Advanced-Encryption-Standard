// aes.js

const CryptoJS = require("crypto-js");

const AES = {
  encrypt: function (data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  },
  decrypt: function (encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};

module.exports = AES;
// script.js

document.getElementById('encrypt-button').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        setStatus('No file selected.');
        return;
    }

    try {
        const fileContents = await readFile(file);
        const encryptedData = encryptData(fileContents, 'your_secret_key');
        downloadFile(encryptedData, 'encrypted_file.txt');
        setStatus('File encrypted successfully.');
    } catch (error) {
        console.error('Encryption error:', error);
        setStatus('Encryption failed.');
    }
});

document.getElementById('decrypt-button').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        setStatus('No file selected.');
        return;
    }

    try {
        const fileContents = await readFile(file);
        const decryptedData = decryptData(fileContents, 'your_secret_key');
        downloadFile(decryptedData, 'decrypted_file.txt');
        setStatus('File decrypted successfully.');
    } catch (error) {
        console.error('Decryption error:', error);
        setStatus('Decryption failed.');
    }
});

function encryptData(data, key) {
    const encrypted = AES.encrypt(data, key);
    return encrypted;
}

function decryptData(encryptedData, key) {
    const decrypted = AES.decrypt(encryptedData, key);
    return decrypted;
}

function downloadFile(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.getElementById('download-link');
    a.href = url;
    a.style.display = 'block';
    a.download = filename;
}

function setStatus(message) {
    document.getElementById('status').textContent = message;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
