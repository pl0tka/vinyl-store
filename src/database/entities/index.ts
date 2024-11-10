import { User } from './User.js';
import { Vinyl } from './Vinyl.js';
import { Role } from './Role.js';
import { Review } from './Review.js';
import { Order } from './Order.js';
import { TokenBlacklist } from './TokenBlacklist.js';
import { ChangeLog } from './ChangeLog.js';

const entities = [User, Vinyl, Review, Role, Order, TokenBlacklist, ChangeLog];

export { User, Vinyl, Review, Role, Order, TokenBlacklist, ChangeLog };

export default entities;
