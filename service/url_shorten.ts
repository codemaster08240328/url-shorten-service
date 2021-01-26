import Hashids from 'hashids';
import config from 'config';

const hashids = new Hashids(config.get('hashids.salt'), config.get('hashids.length'));

const urlShorten = (count: number): string => hashids.encode(count);

export default urlShorten;
