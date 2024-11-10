import { User } from './User.js';
import { Vinyl } from './Vinyl.js';
import { Role } from './Role.js';
import { Review } from './Review.js';
import { Order } from './Order.js';
import { TokenBlacklist } from './TokenBlacklist.js';

const entities = [User, Vinyl, Review, Role, Order, TokenBlacklist];

export { User, Vinyl, Review, Role, Order, TokenBlacklist };

export default entities;
