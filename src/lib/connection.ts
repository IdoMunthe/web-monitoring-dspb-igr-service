import dotenv from "dotenv";
import axios from "axios";
import xml2js from "xml2js";
import crypto from "crypto";
import { EncryptedConnection, DecryptedConnection } from "./definitions";

dotenv.config();

const key: string = process.env.ENCRYPTION_KEY as string;
const iv: string = process.env.ENCRYPTION_IV as string;
const server = process.env.SERVER;

function decrypt(text: string) {
  // Convert the key and iv from base64 to buffers
  const keyBuffer: unknown = Buffer.from(key, "utf-8");
  const ivBuffer: unknown = Buffer.from(iv, "utf-8");

  // Create the decipher object
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    keyBuffer as crypto.CipherKey,
    ivBuffer as crypto.BinaryLike
  );
  decipher.setAutoPadding(false);

  // Update the decipher with the encrypted data
  let decryptedData = decipher.update(text, "base64", "utf8");
  // Finalize the decipher
  decryptedData += decipher.final("utf8");

  return decryptedData;
}

export default async function getConnectionDetails(branch: string) {
  let connection: DecryptedConnection = {
    ORA_IP: "",
    ORA_SERVICENAME: "",
    ORA_USER: "",
    ORA_PWD: "",
    ORA_KODEIGR: "",
  };
  let url = "";

  url =
    "http://172.31.16.32/ORAWS/OracleWebService.asmx/GetConnectionPGDetail" +
    "?KodeIGR=" +
    branch +
    "&Server=" +
    server;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/xml",
      },
      responseType: "text",
    });

    xml2js.parseString(
      response.data,
      { explicitArray: false },
      (err: Error | null, result: EncryptedConnection) => {
        if (err) {
          throw err;
        }

        connection = {
          ORA_IP: decrypt(result.ORA.CONNECTION.ORA_IP).trim(),
          ORA_SERVICENAME: decrypt(
            result.ORA.CONNECTION.ORA_SERVICENAME
          ).trim(),
          ORA_USER: decrypt(result.ORA.CONNECTION.ORA_USER).trim(),
          ORA_PWD: decrypt(result.ORA.CONNECTION.ORA_PWD).trim(),
          ORA_KODEIGR: result.ORA.CONNECTION.ORA_KODEIGR.trim(),
        };
      }
    );

    return connection;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
