/**
 * api接口统一管理
 */
import { get, post } from './http'

export const apiLogin = p => post('/api/user/nc/login.do', p);
export const apiQueryTraceList = p => post('/api/goods/nc/queryTraceList.do', p);
