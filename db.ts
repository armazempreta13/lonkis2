import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';

const dbPath = path.join(process.cwd(), 'database.db');
const db = new sqlite3.Database(dbPath);

// Promisify db methods
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Enable foreign keys
dbRun('PRAGMA foreign_keys = ON');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      colors TEXT, -- JSON string
      badge TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      device_model TEXT NOT NULL,
      service_name TEXT NOT NULL,
      price TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      messages TEXT, -- JSON string
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS repair_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      device_model TEXT NOT NULL,
      issue_description TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      estimated_cost REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users (id)
    )
  `);

  // Insert initial products if not exist
  db.get('SELECT COUNT(*) as count FROM products', (err, row: any) => {
    if (!err && row.count === 0) {
      const products = [
        { name: 'iPhone 16', category: 'iPhone Novos', price: 5999, image: 'https://picsum.photos/seed/iphone16/300/300', colors: JSON.stringify(['#FFC0CB', '#FFD700', '#000000']), badge: 'Lacrado' },
        { name: 'iPhone 16 Pro', category: 'iPhone Novos', price: 7999, image: 'https://picsum.photos/seed/iphone16pro/300/300', colors: JSON.stringify(['#FFFFFF', '#000000']), badge: 'Lacrado' },
        { name: 'iPhone 16 Pro Max', category: 'iPhone Novos', price: 8999, image: 'https://picsum.photos/seed/iphone16promax/300/300', colors: JSON.stringify(['#FFFFFF', '#000000']), badge: 'Lacrado' },
        { name: 'PS5 Slim Mídia Digital', category: 'Video Game', price: 3800, image: 'https://picsum.photos/seed/ps5slim/300/300', colors: JSON.stringify(['#FFFFFF']), badge: 'Novo' },
        { name: 'PS5 Slim Mídia Física', category: 'Video Game', price: 4200, image: 'https://picsum.photos/seed/ps5slimf/300/300', colors: JSON.stringify(['#FFFFFF']), badge: 'Novo' },
        { name: 'XBOX Séries S 512GB', category: 'Video Game', price: 2500, image: 'https://picsum.photos/seed/xboxs/300/300', colors: JSON.stringify(['#FFFFFF']), badge: 'Novo' },
        { name: 'AirPods Pro', category: 'AirPods', price: 1200, image: 'https://picsum.photos/seed/airpodspro/300/300', colors: JSON.stringify(['#FFFFFF']), badge: 'Novo' },
        { name: 'Apple Watch Series 9', category: 'Apple Watch', price: 3000, image: 'https://picsum.photos/seed/watch9/300/300', colors: JSON.stringify(['#000000', '#FFFFFF']), badge: 'Novo' },
        { name: 'JBL Flip 6', category: 'JBL', price: 600, image: 'https://picsum.photos/seed/jblflip/300/300', colors: JSON.stringify(['#000000', '#FF0000']), badge: 'Novo' }
      ];

      const stmt = db.prepare('INSERT INTO products (name, category, price, image, colors, badge) VALUES (?, ?, ?, ?, ?, ?)');

      for (const product of products) {
        stmt.run(product.name, product.category, product.price, product.image, product.colors, product.badge);
      }

      stmt.finalize();
    }
  });
});

export { dbRun, dbGet, dbAll };
export default db;