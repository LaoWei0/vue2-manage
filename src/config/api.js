/**
 * api接口统一管理
 */
import { get, post ,postArray,post2} from './http'

export const apiLogin = p => post('/api/user/nc/login.do', p);
export const apiQueryTraceList = p => post('/api/goods/queryPcTraceList.do', p);
export const apiDeleteTrace = p => post('/api/goods/deleteTrace.do', p);
export const apiqueryTraceDetail = p => post('/api/goods/queryTraceDetail.do', p);
export const apidownloadFile = p => post2('/api/goods/downloadFile.do', p);
export const apiupdatePassword = p => post('/api/user/updatePassword.do', p);
