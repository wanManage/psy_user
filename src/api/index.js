// axios封装
import { getRequest, postRequest,putRequest,deleteRequest} from '@/api/request'

//admin
export const getNurseAll = data => getRequest('/nurse/all', data)
export const addNurse = data => postRequest('/nurse/', data)
export const getNurse = id => getRequest('/nurse/'+id)
export const putNurse = (id,data) => putRequest('/nurse/'+id,data)
export const deleteNurse = id => deleteRequest('/nurse/'+id)
export const freeNurse = data => getRequest('/nurse/freeAll',data)
export const adminLogin = data => postRequest('/admin/login', data)

//admin
export const getNotice = id => getRequest('/notice/'+id)
export const putNotice = (id,data) => putRequest('/notice/'+id,data)

//user
export const getUserAll = data => getRequest('/user/all', data)
export const addUser = data => postRequest('/user/', data)
export const getUser = id => getRequest('/user/'+id)
export const putUser = (id,data) => putRequest('/user/'+id,data)
export const deleteUser = id => deleteRequest('/user/'+id)
export const freeUser = data => getRequest('/user/freeAll',data)
export const UserLogin = data => postRequest('/user/login', data)

//Article
export const getArticleAll = data => getRequest('/article/all', data)
export const addArticle = data => postRequest('/article/', data)
export const getArticle = id => getRequest('/article/'+id)
export const putArticle = (id,data) => putRequest('/article/'+id,data)
export const deleteArticle = id => deleteRequest('/article/'+id)
export const freeArticle = data => getRequest('/article/freeAll',data)

//psychTest
export const getpsychTesteAll = data => getRequest('/psychTest/all', data)
export const addpsychTest= data => postRequest('/psychTest/', data)
export const getpsychTest = id => getRequest('/psychTest/'+id)
export const putpsychTest = (id,data) => putRequest('/psychTest/'+id,data)
export const deletepsychTest = id => deleteRequest('/psychTest/'+id)
export const freepsychTest = data => getRequest('/psychTest/freeAll',data)

//testResult
export const getTestResultAll = data => getRequest('/testResult/all', data)
export const addTestResult= data => postRequest('/testResult/', data)
export const getTestResult = id => getRequest('/testResult/'+id)
export const putTestResult = (id,data) => putRequest('/testResult/'+id,data)
export const deleteTestResult = id => deleteRequest('/testResult/'+id)
export const freeTestResult = data => getRequest('/testResult/freeAll',data)

//user
export const getConsultantAll = data => getRequest('/consultant/all', data)
export const addConsultant = data => postRequest('/consultant/', data)
export const getConsultant = id => getRequest('/consultant/'+id)
export const putConsultant = (id,data) => putRequest('/consultant/'+id,data)
export const deleteConsultant = id => deleteRequest('/consultant/'+id)
export const freeConsultant = data => getRequest('/consultant/freeAll',data)
export const consultantLogin = data => postRequest('/consultant/login', data)


//ChatMsg
export const getChatMsgAll = data => getRequest('/ChatMsg/all', data)
export const addChatMsg = data => postRequest('/ChatMsg/', data)
export const getChatMsg = id => getRequest('/ChatMsg/'+id)
export const putChatMsg= (id,data) => putRequest('/ChatMsg/'+id,data)
export const deleteChatMsg = id => deleteRequest('/ChatMsg/'+id)
export const freeChatMsg = data => getRequest('/ChatMsg/freeAll',data)

export const ChatMsgUser = id => getRequest('/ChatMsg/users/'+id)


export const exportUpVm = "/protal/upmessage/exportList" //上行内容导出



