// import { getConnection } from "../db/connection";

// class Tracker {
//     id: number;
//     name: string;
//     description: string;
//     createdAt: Date;
//     updatedAt: Date;

//     constructor(id: number, name: string, description: string) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.createdAt = new Date();
//         this.updatedAt = new Date();
//     }

//     async save(): Promise<void> {
//         const connection = await getConnection();
//         await connection.query('INSERT INTO trackers (name, description, created_at, updated_at) VALUES ($1, $2, $3, $4)', 
//             [this.name, this.description, this.createdAt, this.updatedAt]);
//     }

//     static async findAll(): Promise<Tracker[]> {
//         const connection = await getConnection();
//         const result = await connection.query('SELECT * FROM trackers');
//         return result.rows.map((row: { id: number; name: string; description: string; }) => new Tracker(row.id, row.name, row.description));
//     }
// }

// export { Tracker };