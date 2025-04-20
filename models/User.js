import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(id, password, name, mobileNo, policeStaitionId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const result = await pool.query(
      'INSERT INTO users (unique_id, password, name, mobileno, policestaitionid) VALUES ($1, $2, $3, $4, $5) RETURNING unique_id',
      [id, hashedPassword, name, mobileNo, policeStaitionId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE unique_id = $1', [id]);
    return result.rows[0];
  }

  static async insertChat(unique_id, date, messages, name, caseNumber) {
    await pool.query(
      'INSERT INTO chats (unique_id, date, messages, name, case_no) VALUES ($1, $2, $3, $4, $5)',
      [unique_id, date, messages, name, caseNumber]
    );
  }


  static async findChatbyIdDateCaseNo(unique_id, date, caseNumber) {
    const result = await pool.query(
      'SELECT * FROM chats WHERE unique_id = $1 AND date = $2 AND case_no = $3',
      [unique_id, date, caseNumber]
    );
    return result.rows[0];
  }

  static async findChatmessagesbyIdDate(unique_id, date) {
    const result = await pool.query('SELECT messages FROM chats WHERE unique_id = $1 AND date = $2', [unique_id, date]);
    return result.rows;
  }

  static async findChatbyIdCaseNo(unique_id, caseNumber) {
    const result = await pool.query(
      'SELECT messages FROM chats WHERE unique_id = $1 AND case_no = $2',
      [unique_id, caseNumber]
    );
    return result.rows;
  }

  static async fetchCasesFromDB(unique_id){
    const query = `
      SELECT date, name, case_no
      FROM chats
      WHERE unique_id = $1
      ORDER BY to_date(date, 'Dy Mon DD YYYY') DESC;
    `;
    const result = await pool.query(query, [unique_id]);
    return result.rows;
  };

  static async verifyUser(unique_id) {
    const result = await pool.query('SELECT * FROM collection WHERE unique_id = $1', [unique_id]);
    return result.rows[0];
  }
}



export default User;
