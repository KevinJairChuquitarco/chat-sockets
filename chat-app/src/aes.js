let aes256 = require("aes256");

let secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

export const to_Encrypt = (text) => {
  let encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
export const to_Decrypt = (cipher, username) => {
  if (cipher.startsWith("Bienvenido")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  let decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};
