import CryptoJS from "crypto-js";

// Encrypt function
// export const encryptData = (data) => {
//   const secretKey = "khush"; // Use a secure secret key
//   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   return encryptedData;
// };;

export const encryptData = (data) => {
  const secretKey = "khush"; // Use a secure secret key
  
  // Get current time and add 24 hours (in milliseconds)
  const currentTime = new Date().getTime();
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const expiryTime = currentTime + EXPIRATION_TIME;

  // Add expiryTime to the data before encrypting
  const dataWithExpiry = {
    ...data, // Spread original data
    expiryTime // Add the calculated expiryTime
  };

  // Encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dataWithExpiry), secretKey).toString();
  return encryptedData;
};


// Decrypt function
export const decryptData = (encryptedData) => {
  const secretKey = "khush"; // Use the same secret key used for encryption
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // Log decrypted data to inspect
  // console.log("Decrypted Data:", decryptedData);

  return decryptedData;
};
