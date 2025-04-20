import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const BaseUrl = process.env.BASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const saveBase64File = (base64String, fileName) => {
    const buffer = Buffer.from(base64String, "base64");
    const filePath = path.join(__dirname, "../public", fileName);
    fs.writeFileSync(filePath, buffer);
    return filePath;
};

function formatLegalSections(sections) {
    return sections.map(section => {
      return `BNS: ${section.BNS}
  IPC: ${section.IPC}
  Description: ${section.Description}
  Offence: ${section.Offence}
  Cognizability: ${section.Cognizability}`;
    }).join('\n\n');
}

const textRes = async (text, token) => {
    console.log(BaseUrl)
    const result = await axios.post(`${BaseUrl}api/text`, { "message": text }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }});
    const response = formatLegalSections(result.data.output);
    // const finalOut = `${response}`;
    // console.log(finalOut);
    return result.data.output;
};

const imageRes = async (uri, token) => {
    // const img = fs.readFileSync(path.join(__dirname, "../public/image.png"));
    // const prompt = "Exract the text from this image";
    // const imageBuffer = Buffer.from(uri, 'base64');
    // const image = sharp(imageBuffer); // Load the image with sharp
    // const result = await model.generateContent([image ,prompt]);
    const result = await axios.post(`${BaseUrl}api/image`, { "image": uri},{
        headers: {
          'Authorization': `Bearer ${token}`
        }});
    return result.data.ans;
};

const audioRes = async (uri, token) => {
    const result = await axios.post(`${BaseUrl}api/audio`, { "audio": uri},{
        headers: {
          'Authorization': `Bearer ${token}`
        }});
    return result.data.ans;
};

export const getRes = async (req, res) => {
    try {
        const { uri, text, sender, type } = req.body.data[0];
        const id = req.body.data[1];

        if (sender === "user") {
            if (type === "text") {
                const response = await textRes(text, id);
                // const inputString = `BNS: 186(4)/nIPC: 263A/nDescription: The term 'Government' in reference to stamps for postage includes persons authorized to administer executive Government in any part of India or a foreign country./nOffence: Extended definition of 'Government' in context of postage stamps/nCognizability: Cognizable`;
                // const correctedText = inputString.replace(/\\n/g, '\n');
                // console.log(correctedText);
                res.status(200).send(response);
            } else if (type === "image") {
                const response = await imageRes(req.body.data[0].uri, id);
                res.status(200).send(response);
            } else if (type === "audio") {
                const response = await audioRes(req.body.data[0].uri, id);
                res.status(200).send(response);
            } else {
                res.status(400).send({ error: "Unsupported type" });
            }
        } else {
            res.status(400).send({ error: "Invalid sender" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
