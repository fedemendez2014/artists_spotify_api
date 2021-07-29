import db from "../libs/db";
import Log from "../models/Log";

export const saveLog = async (ip: string, url: string) => {
    try {
        await db.authenticate();
        Log.create({
            ip: ip.replace('::ffff:', ''),
            date: new Date(),
            url: decodeURI(url)
        });
    } catch (error) {
        throw error;
    }
}
