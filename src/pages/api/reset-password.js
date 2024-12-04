// pages/api/reset-password.js

import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, newPassword } = req.body;

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const db = new sqlite3.Database("./database/cityChase.db");

    db.run(
      `UPDATE users SET password = ? WHERE email = ?`,
      [hashedPassword, email],
      function (err) {
        if (err || this.changes === 0) {
          res.status(400).json({ error: "Failed to reset password!" });
        } else {
          res.status(200).json({ success: true });
        }
      }
    );

    db.close();
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
