import {request} from '../../services/request';
import {AuthDto} from './auth.dto';

export const login = async (payload: AuthDto) => {
  return await request.post('/auth/signin', payload);
};

export const register = async (payload: AuthDto) => {
  return await request.post('/auth/signup', payload);
};
