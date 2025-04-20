import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();


export const saveData = async (req, res) => {
    try{
        const { unique_id, date, messages, name, caseNumber } = req.body.data;
        const messagesString = JSON.stringify(messages);
        const response = await User.findChatbyIdDateCaseNo(unique_id, date, caseNumber);
        if (response) {
            res.status(200).send({ message: "Chat already Exists" });
        } else {
            await User.insertChat(unique_id, date, messagesString, name, caseNumber);
            res.status(200).send({ message: "Chat saved successfully" });
        }
        console.log("saved...")
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export const getData = async (req, res) => {
    try{
        const { unique_id, date } = req.query;
        const response = await User.findChatbyIdDate(unique_id, date);
        res.status(200).send(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

export const getDataMessages = async (req, res) => {
    try{
        const { unique_id, caseNumber } = req.query;
        console.log(unique_id, caseNumber);
        const response = await User.findChatbyIdCaseNo(unique_id, caseNumber);
        const reply = JSON.parse(response[0].messages);
        res.status(200).send(reply);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

export const getFormattedCases = async (req, res) => {
    try {
      const { unique_id } = req.query;
  
      if (!unique_id) {
        return res.status(400).json({ error: 'unique_id is required' });
      }
  
      const rawData = await User.fetchCasesFromDB(unique_id);
  
      const formattedData = rawData.reduce((acc, row) => {
        const { date, case_no, name } = row;
  
        const today = new Date().toDateString();
  

        const displayDate = date === today ? 'Today' : date;
  
        const existingEntry = acc.find((entry) => entry.date === displayDate);
  
        if (existingEntry) {

          existingEntry.content.push(`${case_no}:${name}`);
        } else {

          acc.push({
            date: displayDate,
            content: [`${case_no}:${name}`],
          });
        }
  
        return acc;
      }, []);
  

      res.status(200).json(formattedData);
    } catch (error) {
      console.error('Error fetching cases data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const checkUser = async (req, res) => {
    try {
      console.log(req.query.unique_id);
      const unique_id = req.query.unique_id;
      const user = await User.verifyUser(unique_id);
      if (!user) {
        return res.status(200).json({ exists : false });
      }
      res.status(200).json({ exists : true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };