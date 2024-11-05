import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../common/constants/constants.js';
import { ensureErrorInstance } from '../utils/error.util.js';

export class PasswordUtil {
    static async hashPassword(password: string): Promise<string> {
        try {
            const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword: string = await bcrypt.hash(password, salt);

            return hashedPassword;
        } catch (err) {
            const error = ensureErrorInstance(err);
            throw new Error(`Could not hash password: ${error.message}`);
        }
    }

    static async validatePassword(
        password: string,
        hashedPassword: string | undefined
    ): Promise<boolean> {
        if (typeof hashedPassword === 'undefined') {
            return false;
        }
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch {
            return false;
        }
    }
}
